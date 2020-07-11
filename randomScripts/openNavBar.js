function openNavMenu() {
    var x = document.getElementById("navbarWrapper");
    if (x.className === "navbarWrapper") {
        x.className += " responsive";
    } else {
        x.className = "navbarWrapper";
    }
}