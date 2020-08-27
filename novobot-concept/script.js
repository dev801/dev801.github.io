async function loadModCommands() {
    links = document.getElementsByTagName("a");
    for (x = 0; x < links.length; x++) {
        links[x].style.fontWeight = "normal"
    }
    gradient = document.getElementsByClassName("gradient")[0]
    gradient.classList.remove("gradient")
    links[0].classList.add("gradient")
    links[0].style.fontWeight = "bold"

    dataJSON = undefined;
    await $.getJSON("./commands.json", function(json) {
        dataJSON = json["moderation"];
    })
    htmlT = ""
    for (i = 0; i < dataJSON.length; i++) {
        htmlT += generateCommandHTML(dataJSON[i].name, dataJSON[i].desc, dataJSON[i].activated, dataJSON[i].usage, (i % 2) + 1)
    }
    document.getElementById("rwCommands").innerHTML = htmlT
}

async function loadMiscCommands() {
    links = document.getElementsByTagName("a");
    for (x = 0; x < links.length; x++) {
        links[x].style.fontWeight = "normal"
    }
    gradient = document.getElementsByClassName("gradient")[0]
    gradient.classList.remove("gradient")
    links[5].classList.add("gradient")
    links[5].style.fontWeight = "bold"

    dataJSON = undefined;
    await $.getJSON("./commands.json", function(json) {
        dataJSON = json["misc"];
    })
    htmlT = ""
    for (i = 0; i < dataJSON.length; i++) {
        htmlT += generateCommandHTML(dataJSON[i].name, dataJSON[i].desc, dataJSON[i].activated, dataJSON[i].usage, (i % 2) + 1)
    }
    document.getElementById("rwCommands").innerHTML = htmlT
}

async function loadMinigameCommands() {
    links = document.getElementsByTagName("a");
    for (x = 0; x < links.length; x++) {
        links[x].style.fontWeight = "normal"
    }
    gradient = document.getElementsByClassName("gradient")[0]
    gradient.classList.remove("gradient")
    links[4].classList.add("gradient")
    links[4].style.fontWeight = "bold"

    dataJSON = undefined;
    await $.getJSON("./commands.json", function(json) {
        dataJSON = json["minigames"];
    })
    htmlT = ""
    for (i = 0; i < dataJSON.length; i++) {
        htmlT += generateCommandHTML(dataJSON[i].name, dataJSON[i].desc, dataJSON[i].activated, dataJSON[i].usage, (i % 2) + 1)
    }
    document.getElementById("rwCommands").innerHTML = htmlT
}

async function loadCurrencyCommands() {
    links = document.getElementsByTagName("a");
    for (x = 0; x < links.length; x++) {
        links[x].style.fontWeight = "normal"
    }
    gradient = document.getElementsByClassName("gradient")[0]
    gradient.classList.remove("gradient")
    links[3].classList.add("gradient")
    links[3].style.fontWeight = "bold"

    dataJSON = undefined;
    await $.getJSON("./commands.json", function(json) {
        dataJSON = json["currency"];
    })
    htmlT = ""
    for (i = 0; i < dataJSON.length; i++) {
        htmlT += generateCommandHTML(dataJSON[i].name, dataJSON[i].desc, dataJSON[i].activated, dataJSON[i].usage, (i % 2) + 1)
    }
    document.getElementById("rwCommands").innerHTML = htmlT
}

async function loadFunCommands() {
    links = document.getElementsByTagName("a");
    for (x = 0; x < links.length; x++) {
        links[x].style.fontWeight = "normal"
    }
    gradient = document.getElementsByClassName("gradient")[0]
    gradient.classList.remove("gradient")
    links[2].classList.add("gradient")
    links[2].style.fontWeight = "bold"

    dataJSON = undefined;
    await $.getJSON("./commands.json", function(json) {
        dataJSON = json["fun"];
    })
    htmlT = ""
    for (i = 0; i < dataJSON.length; i++) {
        htmlT += generateCommandHTML(dataJSON[i].name, dataJSON[i].desc, dataJSON[i].activated, dataJSON[i].usage, (i % 2) + 1)
    }
    document.getElementById("rwCommands").innerHTML = htmlT
}

async function loadInfoCommands() {
    links = document.getElementsByTagName("a");
    for (x = 0; x < links.length; x++) {
        links[x].style.fontWeight = "normal"
    }
    gradient = document.getElementsByClassName("gradient")[0]
    gradient.classList.remove("gradient")
    links[1].classList.add("gradient")
    links[1].style.fontWeight = "bold"
    dataJSON = undefined;
    await $.getJSON("./commands.json", function(json) {
        dataJSON = json["info"];
    })
    //console.log(dataJSON)
    htmlT = ""
    for (i = 0; i < dataJSON.length; i++) {
        htmlT += generateCommandHTML(dataJSON[i].name, dataJSON[i].desc, dataJSON[i].activated, dataJSON[i].usage, (i % 2) + 1)
    }
    document.getElementById("rwCommands").innerHTML = htmlT
}

function generateCommandHTML(name, desc, activated, usage, start) {
    let html = `<div style="background-color: #404040; border-radius: 10px; grid-column: ${start} / ${start + 1}; margin: 2px; padding: 20px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">`

    html += "\n";
    html += `
<h3>
    ${name}
    <label class="switch">
        <input type="checkbox"
    `
    if (activated) {
        html += `checked >
        <span class="slider round"></span>
    </label>
</h3>
        `
    } else {
        html += `>
            <span class="slider round"></span>
        </label>
    </h3>
        `
    }

    html += `<p>${desc}</p>\n`
    html += `<p style="margin-bottom: 0;">Usage:&nbsp;<kbd>${usage}</kbd></p>\n</div>`
    return html;
}

/*
<div style="background-color: #404040; border-radius: 10px; grid-column: 2 / 3; margin: 2px; padding: 20px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
<h3>
    Ban
    <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
    </label>
</h3>
<p>Bans a user.</p>
<p style="margin-bottom: 0;">Usage: <kbd>n!ban &lt;user&gt; &lt;reason&gt; &lt;time&gt;</kbd></p>
</div>
*/