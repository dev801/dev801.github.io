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
}