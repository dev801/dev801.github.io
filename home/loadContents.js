async function loadContents() {
    contentsJSON = undefined;
    await $.getJSON("contents.json", function(json) {
        contentsJSON = json;
        //console.log(contentsJSON);
    });

    document.getElementById("mainTitle").innerText = contentsJSON.mainTitle;
    document.getElementById("headerText").innerText = contentsJSON.headerText;
    document.getElementById("mainTextHeader").innerText = contentsJSON.mainTextHeader;
    document.getElementById("mainText").innerText = contentsJSON.mainText;
    document.getElementById("nwsHeader").innerText = contentsJSON.nwsHeader;
    document.getElementById("nws").innerHTML = contentsJSON.nws;

    await loadPosts();
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

/* <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 exMrgTop remPadLR">
    <div class="drkBG postWrapper">
        <div class="postTitle">
            <span class="lead">
                Header <small>Number</small>
            </span>
        </div>
        <div class="postDate">
            Date
        </div>
        <div class="postContent">
            Test
        </div>
    </div>
</div> */