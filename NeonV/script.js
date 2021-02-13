class AppHandler {
    constructor() {
        this.apps = [];
    }

    register(app) {
        this.apps.push(app);
        return this;
    }

    unregister(app) {
        this.apps = this.apps.filter(x => x != app);
        return this;
    }

    getAppFromObject(object) {
        return this.apps.find(x => x.windowObject == object || x.iframe == object);
    }

    getAppFromUUID(_uuid) {
        return this.apps.find(x => x.uuid == _uuid);
    }

    stopApp(_uuid) {
        return this.apps.find(x => x.uuid == _uuid).stop();
    }
}

globalAppHandler = new AppHandler();

theme = {
    taskbarText: "#ffffff",
    taskbarBg: "#0c0c0cb3",
    taskbarHeading: "#111111",
    taskbarSelected: "#0085a1",
    windowHeaderBg: "#111111",
    windowBg: "#0c0c0cb3",
    windowTitle: "#ffffff"
}

settings = {
    lang: "settings/lang/en_GB.json",
    theme: "settings/theme/default.json"
}

apps = []

function setup() {
    displayTimeAndDate();
    loadLangFile();
    loadTheme();
    loadApps();
}

$(window).on("load", () => {
    setup();
    // ACTIVATE SEARCH POPOUT
    $(".taskbar-search").focusin(_.debounce(() => { if ($(".search-popup").length == 0) { searchPopup(); }}, 200))
    // SEARCH STUFF
    $(".search").on("input propertychange paste", _.debounce(() => {
        let val = $(".search").val();
        val = val.trim();
        if (!val || val == "") {
            $(".search-placeholder").remove();
            $(".search-popup").append(generateSearchPlaceholder());
            return;
        }
        let appsToDisplay = apps.filter(x => {
            if (x.name.indexOf(val) != -1) return true;
            if (val.split(" ").some(y => x.keywords.filter(f => f != "").some(z => z.toLowerCase().indexOf(y.toLowerCase()) != -1))) return true;
            return false;
        })

        

        // TODO
        // DISPLAY APPS
        // ALLOW THEM TO OPEN
        // NEONVAPP#START()
        // AUTO REGISTERS
    }, 200));
})

async function loadApps() {
    let data = undefined;
    await $.getJSON("programs/meta.json", (json) => data = json);
    data.forEach(async x => {
        apps.push(await $.getJSON(`programs/${x}`, (json) => {
            json.metaPath = `programs/${x}`;
            return json;
        }));
    });
}

function displayTimeAndDate() {
    let date = new Date();
    let x = document.getElementsByClassName("time");
    for (let i = 0; i < x.length; i++) x[i].textContent = `${date.getHours()}:${date.getMinutes().toString().length == 2 ? date.getMinutes() : `0${date.getMinutes()}`}`;
    x = document.getElementsByClassName("time-seconds");
    for (let i = 0; i < x.length; i++) x[i].textContent = `${date.getHours()}:${date.getMinutes().toString().length == 2 ? date.getMinutes() : `0${date.getMinutes()}`}:${date.getSeconds().toString().length == 2 ? date.getSeconds() : `0${date.getSeconds()}`}`
    x = document.getElementsByClassName("date");
    for (let i = 0; i < x.length; i++) x[i].textContent = `${date.getDate()}/${(date.getMonth() + 1).toString().length == 2 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}/${date.getFullYear()}`
    setTimeout(displayTimeAndDate, 1000);
}

async function loadTheme(file) {
    let data = undefined;
    if (!file) file = settings.theme;
    await $.getJSON(file, (json) => data = json)
    Object.keys(data).forEach(x => {if (data[x] != "") theme[x] = data[x]})
}

function setLangFile(file) {
    if (file) settings.lang = file;
}

async function loadLangFile(file) {
    let data = undefined;
    if (!file) file = settings.lang;
    await $.getJSON(file, (json) => data = json)
    let elements = document.querySelectorAll("[data-language-code]");
    elements.forEach(x => {
        let path = x.dataset.languageCode.split("-");
        let object = data;
        try {
            path.forEach(y => {object = object[y]});
        } catch {
            console.log(`Couldn't find data in ${file} for ${path.join("/")}`)
        }
        Object.keys(object).forEach(z => {
            x[z] = object[z]
        })
    })
}

async function getLangObject(path) {
    let data = undefined;
    await $.getJSON(settings.lang, (json) => {
        data = json;
    })
    path = path.split("-");
    let object = data;
    try {
        path.forEach(y => {object = object[y]});
        if (!object) {
            object = "unset"
            throw "yeah no";
        }
    } catch {
        console.log(`Couldn't find data in ${settings.lang} for ${path.join("/")}`)
    }
    return object;
}

// ADD STUFF HERE TO ENSURE IT GETS CLOSED
$(window).on("click", async (event) => {
    // CLOSE CALENDAR
    if ($(".calendar-popup").length && !$(event.target).parents(".calendar-popup").length && !$(event.target).is(".language-popup")) {
        let animationEvent = whichAnimationEvent();
        for (let i = 0; i < document.getElementsByClassName("calendar-popup").length; i++) {
            document.getElementsByClassName("calendar-popup")[i].style.animation = "fade-out 0.5s"
        }
        await $(".calendar-popup").one(animationEvent, (event) => $(".calendar-popup").remove())
    }
    // OPEN CALENDAR
    if ($(event.target).parents(".date-time-container").length || $(event.target).is(".date-time-container")) {
        calendarPopup();
    }
    // CLOSE LANGUAGE POPUP
    if ($(".language-popup").length && !$(event.target).parents(".language-popup").length && !$(event.target).is(".language-popup")) {
        let animationEvent = whichAnimationEvent()
        for (let i = 0; i < document.getElementsByClassName("language-popup").length; i++) {
            document.getElementsByClassName("language-popup")[i].style.animation = "fade-out 0.5s";
        }
        await $(".language-popup").one(animationEvent, (event) => $(".language-popup").remove())
    }
    // OPEN LANGUAGE POPUP
    if ($(event.target).parents(".language-container").length || $(event.target).is(".language-container")) {
        languagePopup()
    }
    // CLOSE SEARCH POPUP
    if ($(".search-popup").length && !$(event.target).parents(".search-popup").length && !$(event.target).is(".search-popup") && !$(event.target).is(".taskbar-search")) {
        let animationEvent = whichAnimationEvent()
        for (let i = 0; i < document.getElementsByClassName("search-popup").length; i++) {
            document.getElementsByClassName("search-popup")[i].style.animation = "fade-out 0.5s";
        }
        await $(".search-popup").one(animationEvent, (event) => $(".search-popup").remove())
    }

    if ($(event.target).parents(".neonapp").length || $(event.target).is(".neonapp")) {
        $(event.target).parents(".neonapp").css("z-index", 80);
        $(event.target).parents(".neonapp").siblings(".neonapp").css("z-index", 30);
    }
})

// CALENDAR POPOUT
async function calendarPopup() {
    if (document.getElementsByClassName("calendar-popup").length != 0) {
        let animationEvent = whichAnimationEvent();
        for (let i = 0; i < document.getElementsByClassName("calendar-popup").length; i++) {
            document.getElementsByClassName("calendar-popup")[i].style.animation = "fade-out 0.5s"
        }
        await $(".calendar-popup").one(animationEvent, (event) => $(".calendar-popup").remove())
        return;
    }
    let calendarPopup = document.createElement("div");
    calendarPopup.classList.add("calendar-popup");
    calendarPopup.style.zIndex = "101"
    calendarPopup.style.color = theme.taskbarText;
    calendarPopup.style.backgroundColor = theme.taskbarBg;
    calendarPopup.style.borderRadius = "10px";
    calendarPopup.style.height = "550px";
    calendarPopup.style.width = "300px";
    calendarPopup.style.overflow = "hidden";
    calendarPopup.style.position = "absolute";
    calendarPopup.style.right = "10px";
    calendarPopup.style.bottom = "68px";
    calendarPopup.style.animation = "fade-in 0.5s"
    calendarPopup.style.backdropFilter = "blur(60px) saturate(4)"

    let heading = document.createElement("div");
    heading.style.fontSize = "30px";
    heading.classList.add("d-flex", "flex-column")
    let date = new Date()
    let timeHeading = document.createElement("div")
    timeHeading.classList.add("time-seconds");
    timeHeading.appendChild(document.createTextNode(`${date.getHours()}:${date.getMinutes().toString().length == 2 ? date.getMinutes() : `0${date.getMinutes()}`}:${date.getSeconds().toString().length == 2 ? date.getSeconds() : `0${date.getSeconds()}`}`))
    heading.appendChild(timeHeading);
    let displayDate = document.createElement("small")
    displayDate.appendChild(document.createTextNode(""))
    displayDate.classList.add("date");
    displayDate.style.fontWeight = "100";
    displayDate.style.fontSize = "50%";
    displayDate.style.paddingBottom = "5px";
    heading.appendChild(displayDate)
    heading.style.padding = "10px"
    heading.style.paddingLeft = "20px"
    heading.style.backgroundColor = theme.taskbarHeading;

    calendarPopup.appendChild(heading);

    let content = document.createElement("div");
    content.style.padding = "10px"
    content.style.paddingLeft = "20px"
    content.style.paddingRight = "20px"
    content.style.height = "100%"
    content.style.width = "100%"
    content.classList.add("d-flex", "flex-column");
    let headerObject = await getLangObject("taskbar-calendar-days")
    let headers = []
    Object.keys(headerObject).forEach(x => {
        headers.push(headerObject[x]["short"])
    })
    let headerRow = document.createElement("div")
    headerRow.classList.add("d-flex", "justify-content-around")
    for (let i = 0; i < 7; i++) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(headers[i]));
        headerRow.appendChild(div);
    }
    content.appendChild(headerRow);
    for (let w = 0; w < 6; w++) {
        let row = document.createElement("div");
        row.classList.add("d-flex", "justify-content-around");
        for (let d = 0; d < 7; d++) {
            let div = document.createElement("div");
            div.appendChild(document.createTextNode(`${w}-${d}`))
            row.appendChild(div);
        }
        content.appendChild(row);
    }
    calendarPopup.appendChild(content)

    document.body.appendChild(calendarPopup);

    loadLangFile()
}

// LANGUAGE POPOUT
async function languagePopup() {
    if (document.getElementsByClassName("language-popup").length != 0) {
        let animationEvent = whichAnimationEvent();
        for (let i = 0; i < document.getElementsByClassName("language-popup").length; i++) {
            document.getElementsByClassName("language-popup")[i].style.animation = "fade-out 0.5s"
        }
        await $(".language-popup").one(animationEvent, (event) => $(".language-popup").remove())
        return;
    }
    let languagePopup = document.createElement("div");
    languagePopup.classList.add("language-popup");
    languagePopup.style.zIndex = "101"
    languagePopup.style.color = theme.taskbarText;
    languagePopup.style.backgroundColor = theme.taskbarBg;
    languagePopup.style.borderRadius = "10px";
    languagePopup.style.maxHeight = "550px";
    languagePopup.style.width = "250px";
    languagePopup.style.overflow = "hidden";
    languagePopup.style.position = "absolute";
    languagePopup.style.right = "88px";
    languagePopup.style.bottom = "68px";
    languagePopup.style.animation = "fade-in 0.5s"
    languagePopup.style.backdropFilter = "blur(60px) saturate(4)";

    let heading = document.createElement("div");
    heading.style.fontSize = "30px";
    heading.classList.add("d-flex", "flex-column")
    let timeHeading = document.createElement("div")
    timeHeading.appendChild(document.createTextNode(await getLangObject("taskbar-language-heading")))
    heading.appendChild(timeHeading);
    heading.style.padding = "10px"
    heading.style.paddingLeft = "20px"
    heading.style.backgroundColor = theme.taskbarHeading;

    languagePopup.appendChild(heading);

    let contents = document.createElement("div")
    contents.classList.add("d-flex", "flex-column")
    contents.style.overflowY = "scroll"
    contents.style.maxHeight = "400px"
    let meta = undefined;
    await $.getJSON("settings/lang/meta.json", (json) => meta = json);
    let langMetas = [];
    for (let i = 0; i < meta.length; i++) await $.getJSON(`settings/lang/${meta[i]}`, (json) => langMetas.push(json["meta"]))
    langMetas.forEach(x => {
        let div = document.createElement("div")
        if (settings.lang == `settings/lang/${meta[langMetas.indexOf(x)]}`) div.style.backgroundColor = theme.taskbarSelected
        else {
            div.classList.add("taskbar-element")
            div.onclick = () => { setLangFile(`settings/lang/${meta[langMetas.indexOf(x)]}`);loadLangFile();alsoLanguagePopup(); }
        }
        div.style.textAlign = "center"
        div.style.padding = "10px";
        div.style.paddingLeft = "20px"
        div.style.paddingRight = "20px"
        div.classList.add("d-flex");
        let lDiv = document.createElement("div")
        lDiv.classList.add("d-flex", "flex-column")
        let tlDiv = document.createElement("div");
        tlDiv.appendChild(document.createTextNode(x["languageAbbr"]))
        tlDiv.style.fontWeight = "700"
        let blDiv = document.createElement("div");
        blDiv.appendChild(document.createTextNode(x["regionAbbr"]))
        blDiv.style.fontWeight = "100"
        lDiv.appendChild(tlDiv);
        lDiv.appendChild(blDiv);
        div.appendChild(lDiv);

        let rDiv = document.createElement("div");
        rDiv.classList.add("d-flex", "flex-column", "ml-auto")
        let trDiv = document.createElement("div");
        trDiv.appendChild(document.createTextNode(x["language"]));
        let brDiv = document.createElement("div");
        brDiv.appendChild(document.createTextNode(x["region"]))
        rDiv.appendChild(trDiv);
        rDiv.appendChild(brDiv);
        div.appendChild(rDiv)

        contents.appendChild(div)
    })

    languagePopup.appendChild(contents)

    document.body.appendChild(languagePopup)
}

// SEARCH POPOUT
async function searchPopup() {
    if (document.getElementsByClassName("search-popup").length != 0) {
        let animationEvent = whichAnimationEvent();
        for (let i = 0; i < document.getElementsByClassName("search-popup").length; i++) {
            document.getElementsByClassName("search-popup")[i].style.animation = "fade-out 0.5s"
        }
        await $(".search-popup").one(animationEvent, (event) => $(".search-popup").remove())
        return;
    }
    let searchPopup = document.createElement("div");
    searchPopup.classList.add("search-popup");
    searchPopup.style.zIndex = "101"
    searchPopup.style.color = theme.taskbarText;
    searchPopup.style.backgroundColor = theme.taskbarBg;
    searchPopup.style.borderRadius = "10px";
    searchPopup.style.maxHeight = "550px";
    searchPopup.style.width = "400px";
    searchPopup.style.overflow = "hidden";
    searchPopup.style.position = "absolute";
    searchPopup.style.left = "53px";
    searchPopup.style.bottom = "68px";
    searchPopup.style.animation = "fade-in 0.5s"
    searchPopup.style.backdropFilter = "blur(60px) saturate(4)";

    let heading = document.createElement("div");
    heading.style.fontSize = "30px";
    heading.classList.add("d-flex", "flex-column")
    let timeHeading = document.createElement("div")
    timeHeading.appendChild(document.createTextNode(await getLangObject("taskbar-search-heading")))
    heading.appendChild(timeHeading);
    heading.style.padding = "10px"
    heading.style.paddingLeft = "20px"
    heading.style.backgroundColor = theme.taskbarHeading;

    searchPopup.appendChild(heading);

    searchPopup.appendChild(generateSearchPlaceholder());

    document.body.appendChild(searchPopup);
}

function generateSearchStuff(appsToDisplay) {
    return document.createTextNode("hi there")
}

function generateSearchPlaceholder() {
    let container = document.createElement("div");
    container.classList.add("d-flex", "flex-column", "search-placeholder");
    let horizApps = document.createElement("div");
    horizApps.classList.add("d-flex");
    horizApps.style.overflowX = "scroll";
    horizApps.style.padding = "10px";
    for (let i = 0; i < Math.min(apps.length, 8); i++) {
        let divContainer = document.createElement("div");
        divContainer.classList.add("d-inline-flex", "justify-content-around")
        let div = document.createElement("div")
        div.classList.add("d-flex", "flex-column", "justify-content-around");
        div.style.backgroundColor = theme.taskbarHeading;
        div.style.borderRadius = "10px";
        div.style.overflow = "hidden";

        let iconHolder = document.createElement("div");
        iconHolder.style.padding = "20px";
        iconHolder.style.paddingBottom = "0";
        let icon = document.createElement("img");
        icon.src = apps[i].icon || "https://dev801.github.io/navLg.png";
        icon.style.width = "40px"
        iconHolder.appendChild(icon);
        div.appendChild(iconHolder);

        let nameHolder = document.createElement("div");
        nameHolder.classList.add("text-center")
        nameHolder.style.padding = "5px";
        nameHolder.style.fontWeight = "200";
        nameHolder.appendChild(document.createTextNode(apps[i].name));
        div.appendChild(nameHolder);

        divContainer.appendChild(div)
        $(divContainer).on("click", async () => {
            $(".taskbar").click();
            if (apps[i].format.toLowerCase() == "neonv") {
                let app = new NeonVApp();
                await app.setMeta(apps[i].metaPath);
                app.start();
            }
        })
        divContainer.style.marginRight = "10px"
        horizApps.appendChild(divContainer)
    }
    container.appendChild(horizApps);

    return container;
}

function alsoLanguagePopup() {
    languagePopup();
}

function whichAnimationEvent(){
    var t, el = document.createElement("fakeelement");
  
    var animations = {
      "animation": "animationend",
      "OAnimation": "oAnimationEnd",
      "MozAnimation": "animationend",
      "WebkitAnimation": "webkitAnimationEnd"
    }
  
    for (t in animations){
        if (el.style[t] !== undefined){
            return animations[t];
        }
    }
}

function uuidv4() {
    return 'Nxxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}