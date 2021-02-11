$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});

theme = {
    taskbarText: "#ffffff",
    taskbarBg: "#0c0c0ca2",
    taskbarHeading: "#111111"
}

function setup() {
    displayTimeAndDate();
    loadLangFile();

    let dateTimeContainers = document.getElementsByClassName("date-time-container");
    for (let i = 0; i < dateTimeContainers.length; i++) dateTimeContainers[i].addEventListener("click", calendarPopup)
}

function displayTimeAndDate() {
    let date = new Date();
    let x = document.getElementsByClassName("time");
    for (let i = 0; i < x.length; i++) x[i].textContent = `${date.getHours()}:${date.getMinutes().toString().length == 2 ? date.getMinutes() : `0${date.getMinutes()}`}`;
    x = document.getElementsByClassName("date");
    for (let i = 0; i < x.length; i++) x[i].textContent = `${date.getDate()}/${(date.getMonth() + 1).toString().length == 2 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}/${date.getFullYear()}`
    setTimeout(displayTimeAndDate, 10000);
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
    if (!file) file = "settings/lang/en_GB.json"
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
    calendarPopup.style.borderRadius = "20px";
    calendarPopup.style.height = "500px";
    calendarPopup.style.width = "300px";
    calendarPopup.style.overflow = "hidden";
    calendarPopup.style.position = "absolute";
    calendarPopup.style.right = "10px";
    calendarPopup.style.bottom = "68px";
    calendarPopup.style.animation = "fade-in 0.5s"

    let heading = document.createElement("div");
    heading.style.fontSize = "30px";
    heading.appendChild(document.createTextNode("To Do"));
    heading.style.padding = "10px"
    heading.style.backgroundColor = theme.taskbarHeading;

    calendarPopup.appendChild(heading);

    let content = document.createElement("div");
    content.style.padding = "10px"
    content.style.height = "fit-content"
    content.style.width = "fit-content"
    content.appendChild(document.createTextNode("this is just temporary, stuff will be here in the future"))

    calendarPopup.appendChild(content)

    document.body.appendChild(calendarPopup);
}

function whichAnimationEvent(){
    var t,
        el = document.createElement("fakeelement");
  
    var animations = {
      "animation"      : "animationend",
      "OAnimation"     : "oAnimationEnd",
      "MozAnimation"   : "animationend",
      "WebkitAnimation": "webkitAnimationEnd"
    }
  
    for (t in animations){
      if (el.style[t] !== undefined){
        return animations[t];
      }
    }
  }