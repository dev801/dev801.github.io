pageDataPrefix = "";

async function loadSidebar() {
    sidebarJSONURL = "https://dev801.github.io/botbiscuit/manual/sidebar.json"
    sidebarJSON = undefined;

    select = document.getElementById("langSelect");
    language = select.options[select.selectedIndex].value
    if (language == undefined) {
        language = "English"
    }
    await $.getJSON(sidebarJSONURL, function(json) {
        sidebarJSON = json[language]
    });

    document.getElementById("sidebarHeader").innerHTML = sidebarJSON.title;

    sidebarContent = document.getElementById("sidebarContent");
    sidebarContent.innerHTML = "";

    replaceSidebar = "";
    sidebarContents = sidebarJSON.contents;
    for (i = 0; i < sidebarContents.length; i++) {
        if (sidebarContents[i].heading) {
            replaceSidebar += `<p>${sidebarContents[i].name}</p>`
            continue;
        }
        if (sidebarContents[i].contents == undefined) {
            replaceSidebar += `<li><a href="${sidebarContents[i].link}">${sidebarContents[i].name}</a></li>`;
            continue;
        }
        dropdownContent = ""
        for (x = 0; x < sidebarContents[i].contents.length; x++) {
            dropdownContent += `<li><a href="${sidebarContents[i].contents[x].link}">${sidebarContents[i].contents[x].name}</a></li>`;
        }
        replaceSidebar += `<li><a href="#${sidebarContents[i].name.replace(" ", "")}Submenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">${sidebarContents[i].name}</a><ul class="collapse list-unstyled" id="${sidebarContents[i].name.replace(" ", "")}Submenu">${dropdownContent}</ul></li>`
    }

    sidebarContent.innerHTML = replaceSidebar;
}

async function loadPageData() {
    try {
        manualJSONURL = "https://dev801.github.io/botbiscuit/manual/manual.json";
        manualJSON = undefined;

        select = document.getElementById("langSelect");
        language = select.options[select.selectedIndex].value
        if (language == undefined) {
            language = "English"
        }
        await $.getJSON(manualJSONURL, function(json) {
            pageDataPrefix = json["prefix"]
            //pageDataPrefix = "http://localhost/dev801-dev-3/botbiscuit/manual/"
            manualJSON = json[language][getManualPath()]
        });

        document.getElementById("pgTitle").innerHTML = manualJSON.title;
        document.getElementById("pgContent").innerHTML = manualJSON.content;
    } catch (e) {
        document.getElementById("pgContent").innerHTML = `Something went horribly wrong with loading the page content - this is most likely because i messed up a JSON file somewhere.<br><kbd>${e.stack}</kbd>`
    }
}

function getManualPath() {
    return window.location.href.slice(pageDataPrefix.length).substring(0, window.location.href.slice(pageDataPrefix.length).indexOf("#"));
}