async function loadContents() {
    contentsJSON = undefined;
    await $.getJSON("contents.json", function(json) {
        contentsJSON = json;
    });
    
    document.getElementById("mainTitle").innerText = contentsJSON.mainTitle;
    document.getElementById("headerText").innerText = contentsJSON.headerText;

    loadPosts();
    loadProjectList();
}

async function loadPosts() {
    postsJSON = undefined;
    await $.getJSON("posts.json", function(json) {
        postsJSON = json;
    });

    postsDiv = document.getElementById("posts");

    postsHTML = `
<div class="container">
`;
    for (i = 0; i < postsJSON.posts.length; i++) {
        date = postsJSON.posts[i].date;
        number = postsJSON.posts[i].number;
        title = postsJSON.posts[i].title;
        contents = postsJSON.posts[i].content;

        if (i % 3 == 0 && i != 0) {
            postsHTML += `
</div>
<div class="container">`
        }

        postsHTML += generatePostHTML(date, number, title, contents);
    }
    postsHTML += `
</div>`;
    postsDiv.innerHTML = postsHTML;
}

function generatePostHTML(date, number, title, contents) {
    return `
<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 exMrgTop remPadLR">
    <div class="drkBG postWrapper">
        <div class="postTitle">
            <span class="lead">
                ${title} <small>${number}</small>
            </span>
        </div>
        <div class="postDate">
            ${date}
        </div>
        <div class="postContent">
            ${contents}
        </div>
    </div>
</div>

    `
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
<button type="button" onclick="document.location='${projectsJSON.list[i].link}'" class="btn btn-default"><a href="${projectsJSON.list[i].link}">${projectsJSON.list[i].name} <span class="badge">${projectsJSON.list[i].state}</span></a></button>
        `
    }

    document.getElementById("projList").innerHTML = rwHTML;
}