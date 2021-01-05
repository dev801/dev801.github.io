function calculateCarrots() {
    let output = document.getElementById("result");
    if (document.getElementById("miles").value == "") return output.innerHTML = "You haven't provided a number of miles!";
    if (document.getElementById("mpg").value == "") return output.innerHTML = "You haven't provided the vehicle's fuel consumption rate!";
    let USorUK = document.querySelector('input[name="mpgunit"]:checked').value;
    let conversionConstant = 3.785
    if (USorUK == "ukmpg") conversionConstant = 4.546
    let litresOfFuel = (parseInt(document.getElementById("miles").value) / parseInt(document.getElementById("mpg").value)) * conversionConstant;
    let kgCarrots = (litresOfFuel / 97.18) * 1000
    let numCarrots = Math.ceil((kgCarrots * 1000) / 61)
    output.style.fontSize = "80px"
    return output.innerHTML = `${numCarrots} carrots`;
}

async function loadPosts() {
    postsJSON = undefined;
    await $.getJSON("posts.json", function(json) {
        postsJSON = json.posts;
    });

    postHTMLs = [];
    for (i = 0; i < postsJSON.length; i++) {
        postHTML = `
        <div class="col-lg col-md post">
            <div class="d-none d-md-none d-lg-block">
                <div class="row">
                    <div class="col-lg-7"><h3>${postsJSON[i].title} <small>${postsJSON[i].number}</small></h3></div>
                    <div class="col-lg-5" style="text-align: right;"><small>${postsJSON[i].date}</small></div>
                </div>
            </div>
            <div class="d-md-block d-lg-none">
                <div class="container">
                    <div class="row">
                        <div class="col=lg"><h3>${postsJSON[i].title}<small>${postsJSON[i].number}</small></h3></div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <span>${postsJSON[i].content}</span>
                </div>
            </div>
        </div>
        `
        postHTMLs.push(postHTML);
    }

    document.getElementsByClassName("rwPosts")[0].innerHTML = postHTMLs.join("\n");
    document.getElementsByClassName("rwPosts")[1].innerHTML = postHTMLs.join("\n");
}

async function loadProjectList() {
    projectsJSON = undefined;
    await $.getJSON("meta/list.json", function(json) {
        projectsJSON = json;
    });
    //console.log(projectsJSON);

    rwHTML = ""
    for (i = 0; i < projectsJSON.list.length; i++) {
        rwHTML += `
<button type="button" onclick="document.location='${projectsJSON.list[i].link}'" class="btn btn-default bg-light"><a href="${projectsJSON.list[i].link}">${projectsJSON.list[i].name} <span class="badge badge-dark">${projectsJSON.list[i].state}</span></a></button>
        `
    }

    listssss = document.getElementsByClassName("projList");
    //console.log(listssss);
    for (i = 0; i < listssss.length; i++) {
        listssss[i].innerHTML = rwHTML;
    }
}