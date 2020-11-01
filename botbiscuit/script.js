colourMode = false;
oof = false;

async function loadContent() {
    callColourSwitch = false;
    if (Boolean(localStorage.getItem("colourMode"))) {
        callColourSwitch = true;
    }

    select = document.getElementById("langSelect");
    language = select.options[select.selectedIndex].value
    if (language == undefined) {
        language = "en"
    }
    dataJSON = undefined;
    await $.getJSON("content.json", function(json) {
        dataJSON = json[language];
    }).catch((err) => {
        console.error("Error loading page contents.")
        document.getElementsByTagName("body")[0].innerHTML = "Eh? I can't load the contents of this page for some reason...";
    })

    toReplace = document.getElementsByClassName("jsonReplace");
    
    for (i = 0; i < toReplace.length; i++) {
        try {
            jsonPath = toReplace[i].id.split("-")
            nextThing = dataJSON;
            for (x = 0; x < jsonPath.length; x++) {
                nextThing = nextThing[jsonPath[x]];
            }

            if (nextThing == undefined) {
                console.error(`Could not find data at ${jsonPath.join("/")} in contents.json`)
                toReplace[i].innerHTML = "aaaaaaaa"
                continue;
            }
        } catch {
            console.error(`Could not find data at ${jsonPath.join("/")}.`)
            toReplace[i].innerHTML = "aaaaaaaa"
            continue;
        }

        try {
            if (toReplace[i].nodeName.toLowerCase() == "img") {
                if (nextThing != "") {
                    toReplace[i].src = nextThing;
                }
            } else if (jsonPath[jsonPath.length - 1] == "bg" && jsonPath[jsonPath.length - 1] != "") {
                toReplace[i].style.backgroundColor = nextThing;
            } else if (toReplace[i].nodeName.toLowerCase() == "a") {
                if (nextThing != "") {
                    toReplace[i].href = nextThing
                }
            } else {
                toReplace[i].innerHTML = nextThing;
            }
        } catch {
            console.error(`Could not change the content of ${toReplace[i]}`)
            continue;
        }
    }

    if (callColourSwitch) {
        switchColourMode(true);
        document.getElementById("dukeBtn").checked = true;
    }
}

function switchColourMode(passThing) {
    console.log("Called")
    // I hope you're happy now duke

    // anti-oof protection 'cause browsers are weird
    if (!passThing) {
        if (oof == false) {
            return oof = !oof;
        }
        oof = false;
    }

    colourMode = !colourMode;
    localStorage.setItem("colourMode", colourMode);
    if (colourMode == true) {
        document.body.className = "dark";
        document.getElementsByTagName("nav")[0].className += " dark";
        document.getElementById("logoText").className = "dark";

        for (i = 0; i < document.getElementsByClassName("nav-link").length; i++) {
            document.getElementsByClassName("nav-link")[i].className += " dark";
        }

        document.getElementById("footerBack").className += " dark";
        document.getElementById("topBack").className += " dark";
    } else {
        document.body.className = "";
        document.getElementsByTagName("nav")[0].className = document.getElementsByTagName("nav")[0].className.replace(" dark", "");
        document.getElementById("logoText").className = "";
    
        for (i = 0; i < document.getElementsByClassName("nav-link").length; i++) {
            document.getElementsByClassName("nav-link")[i].className = document.getElementsByClassName("nav-link")[i].className.replace("dark", "");
        }

        document.getElementById("footerBack").className = document.getElementById("footerBack").className.replace(" dark", "");
        document.getElementById("topBack").className = document.getElementById("topBack").className.replace(" dark", "");
    }
    
}