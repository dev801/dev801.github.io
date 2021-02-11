theme = {
    taskbarText: "#ffffff",
    taskbarBg: "#0c0c0cb3",
    taskbarHeading: "#111111"
}

settings = {
    lang: "settings/lang/en_GB.json"
}

function setup() {
    displayTimeAndDate();
    loadLangFile();
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
    if (!file) file = "settings/theme/default.json";
    await $.getJSON(file, (json) => {
        data = json;
    })
}

async function loadLangFile(file) {
    let data = undefined;
    if (!file) file = settings.lang;
    await $.getJSON(file, (json) => {
        data = json;
    })
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
    } catch {
        console.log(`Couldn't find data in ${file} for ${path.join("/")}`)
    }
    return object;
}


// CALENDAR POPOUT
$(window).on("click", async (event) => {
    if ($(".calendar-popup").length && !$(event.target).parents(".calendar-popup").length) {
        let animationEvent = whichAnimationEvent();
        for (let i = 0; i < document.getElementsByClassName("calendar-popup").length; i++) {
            document.getElementsByClassName("calendar-popup")[i].style.animation = "fade-out 0.5s"
        }
        await $(".calendar-popup").one(animationEvent, (event) => $(".calendar-popup").remove())
    }
    if ($(event.target).parents(".date-time-container").length || $(event.target).is(".date-time-container")) {
        calendarPopup();
    }
})

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
    //heading.classList.add("time-seconds")
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