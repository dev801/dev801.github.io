async function loadContents() {
    contentsJSON = undefined;
    await $.getJSON("pageData.json", function(json) {
        contentsJSON = json;
    });

    document.getElementById("mainTitle").innerText = contentsJSON.mainTitle;
    document.getElementById("headerText").innerHTML = contentsJSON.headerText;
    if (contentsJSON.headerImg != "") {
        document.getElementById("headerImg").src = contentsJSON.headerImg;
    }
    document.getElementById("description").innerHTML = contentsJSON.description;
    document.getElementById("knwnBgs").innerHTML = contentsJSON.knwnBgs;
    document.getElementById("dwldBtn").innerHTML = `
<button type="button" onclick="document.location='${contentsJSON.dlLink}'" style="background-color: #3ce000; margin: 5px; width: 100%;" class="btn" id="dwldBtn">DOWNLOAD</button>
    `
}