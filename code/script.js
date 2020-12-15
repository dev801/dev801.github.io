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
                    <span style="max-width: 100%;">${postsJSON[i].content}</span>
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