function setup() {
    displayTimeAndDate();
    loadLangFile();
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