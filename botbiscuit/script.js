async function loadContent() {
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
}