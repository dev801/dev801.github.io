async function loadNavbar(levels, active) {
    topDirPath = ""
    for (i = 0; i < levels; i++) {
        topDirPath += "../";
    }

    head = document.getElementsByTagName("head")[0];
    script = document.createElement("script");
    script.src = topDirPath + "randomScripts/openNavBar.js";
    head.appendChild(script);


    navDiv = document.getElementById("rwNavbar");
    coloursPath = topDirPath + "colours.json"
    colours = undefined;
    await $.getJSON(coloursPath, function(json) {
        colours = json;
    });

    stuffPath = topDirPath + "stuff.json"
    stuff = undefined;
    await $.getJSON(stuffPath, function(json) {
        stuff = json;
    });
    repWith = `
<style>
    #rwNavbar {
        margin: 0;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 999;
    }

    .navbarWrapper {
        background-color: ${colours.bgDark};
        width: 100%;
        overflow: hidden;
    }

    .navbarWrapper a {
        float: left;
        display: block;
        text-align: center;
        padding: 14px 16px;
        font-size: 17px;
    }

    .navbarWrapper a.active {
        color: ${colours.nrmText};
    }

    .navbarWrapper .icon {
        display: none;
    }

    @media screen and (max-width: 600px) {
        .navbarWrapper a:not(:first-child) {display: none;}
        .navbarWrapper a.icon {
            float: right;
            display: block;
        }
    }

    @media screen and (max-width: 600px) {
        .navbarWrapper.responsive {
            position: relative;
        }
        .navbarWrapper.responsive a.icon {
            position: absolute;
            right: 0;
            top: 0;
        }
        .navbarWrapper.responsive a {
            float: none;
            display: block;
            text-align: left;
        }
    }
</style>
<div id="navbarWrapper" class="navbarWrapper">
`
    if (active == 0) {
        repWith += `
    <a href="${stuff.homepage}" class="active">Home</a>
    <a href="${stuff.projectsPage}">Projects</a>
    <a href="${stuff.codePage}">Code</a>
    <a href="javascript:void(0);" class="icon" onclick="openNavMenu()">
        <i class="fa fa-bars"></i>
    </a>
</div>
        `
    } else if (active == 1) {
        repWith += `
    <a href="${stuff.homepage}">Home</a>
    <a href="${stuff.projectsPage}" class="active">Projects</a>
    <a href="${stuff.codePage}">Code</a>
    <a href="javascript:void(0);" class="icon" onclick="openNavMenu()">
        <i class="fa fa-bars"></i>
    </a>
</div>
        `
    } else {
        repWith += `
    <a href="${stuff.homepage}">Home</a>
    <a href="${stuff.projectsPage}">Projects</a>
    <a href="${stuff.codePage}" class="active">Code</a>
    <a href="javascript:void(0);" class="icon" onclick="openNavMenu()">
        <i class="fa fa-bars"></i>
    </a>
</div>
        `
    }

    document.getElementById("rwNavbar").innerHTML = repWith;
}