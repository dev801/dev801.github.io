function loadNavbar(levels, active) {
    leDiv = document.getElementById("rwNavbar");
    extraLevels = "";
    for (levels; levels > 0; levels--) extraLevels += "../";
    home = "";
    if (active == 1) home = " active";
    projects = "";
    if (active == 2) projects = " active";
    code = "";
    if (active == 3) code = " active";
    leDiv.innerHTML = `
    <nav class="navbar-expand-md navbar navbar-dark fixed-top">
            <a class="navbar-brand" href="#">
                <img src="${extraLevels}../navLg.png" width="30px" height="30px" class="d-inline-block align-top" alt="dev801">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapsable" aria-controls="navbarCollapsable" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            
            <div class="collapse navbar-collapse" id="navbarCollapsable">
                <div class="navbar-nav">
                    <a class="nav-item nav-link${home}" href="${extraLevels}../home"><span class="jsonReplace" id="nav-home"></span></a>
                    <a class="nav-item nav-link${projects}" href="${extraLevels}../projects"><span class="jsonReplace" id="nav-projects"></span></a>
                    <a class="nav-item nav-link${code}" href="${extraLevels}../code"><span class="jsonReplace" id="nav-code"></span></a>
                    <form class="form-inline d-inline-block" style="margin-left: 10px;">
                        
                    </form>
                </div>
            </div>
        </nav>
        `
}

function loadFooter() {
    footerDivs = document.getElementsByClassName("rwFooter");
    for (i = 0; i < footerDivs.length; i++) {
        footerDivs[i].innerHTML = `
        <div style="width: 100%; padding: 10px;">
            <span class="d-inline-block">&copy; dev801 2021</span>
            <select onchange="loadContent()" name="lang" class="form-control d-inline-block" id="langSelect" style="position: absolute; right: 10px; bottom: 5px; width: fit-content;">
                <option name="en">English</option>
                <!--<option name="ja">日本語</option>-->
            </select>
        </div>
        `;
    }
}