/*
Cynthia Client-side script.

This script is embedded into any page Cynthia serves, always just before the closing </html>.
*/


setInterval(() => {
    var elements = document.getElementsByClassName('unparsedtimestamp');
    for (let i = elements.length - 1; i >= 0; i--) {
        let timestamp = elements[i].innerHTML;
        console.log("Parsing timestamp.");
        const jstimestamp = timestamp * 1000;
        const dateObject = new Date(jstimestamp);
        const data = dateObject.toLocaleString();
        const date = data.substring(0, data.length - 3);
        elements[i].innerHTML = date;
        elements[i].classList.remove('unparsedtimestamp');
    }
}, 100);

function mediamobilescreen() {
    return ((window.matchMedia("(orientation: portrait),(max-width: 800px)")).matches);
};

function mobileorientation() {
    const csssays = getComputedStyle(document.body).getPropertyValue(
        "--screen-type-orientation"
    );
    if (csssays === "mobile") {
        return 1;
    }
    if (csssays === "landscape") {
        return 0;
    }
    console.error(
        "Could not determine 'mobilescreen()' from css value '" + csssays + "'."
    );
}
if (document.getElementById("cynthiapageinfoshowdummyelem") != null) {
    let pageinfosidebarelem = document.getElementById(
        "cynthiapageinfoshowdummyelem"
    );
    pageinfosidebarelem.setAttribute(
        "style",
        "opacity: 0.3; transition: all 2s ease-out 0s;"
    );
    pageinfosidebarelem.id = "pageinfosidebar";
    pageinfosidebarelem = document.getElementById("pageinfosidebar");
    let authorthumbnail = "";
    if (
        typeof pagemetainfo.author.thumbnail !== "undefined"
    ) {
        authorthumbnail = `<img style="width: 2.5em" src="${pagemetainfo.author.thumbnail}">`;
    }
    let dates = "";
    if (typeof pagemetainfo.dates !== "undefined") {
        if (pagemetainfo.dates.published == pagemetainfo.dates.altered || typeof pagemetainfo.dates.altered == "undefined") {
            dates = `<li>Posted: <span class="unparsedtimestamp">${(new Date((pagemetainfo.dates.published) * 1000).toLocaleString())}</span></li>`
        } else {
            dates = `
    <li>Posted: <span class="unparsedtimestamp">${(new Date((pagemetainfo.dates.published) * 1000).toLocaleString())}</span></li>
    <li>Edited: <span class="unparsedtimestamp">${(new Date((pagemetainfo.dates.altered) * 1000).toLocaleString())}</span></li>
    `
        }
    }
    pageinfosidebarelem.innerHTML = `
    <span class="not-on-mobile" style="position:absolute;right:0;top:0px;font-size: 3em; cursor: pointer; ">⇙</span>
    <p class="pageinfo-title">${pagemetainfo.title}</p>
    <ul>
      <li>Author: ${authorthumbnail} ${pagemetainfo.author.name}</li>
      ${dates}
      </ul>
    <p class="pageinfo-shortversion">${pagemetainfo.short}</p>
      `;
    function pageinfosidebar_rollup() {
        document.getElementById("pageinfosidebar").style.overflow = "hidden";
        document.getElementById("pageinfosidebar").style.width = "0px";
        document.getElementById("pageinfosidebar").style.maxHeight = "310px";
        document.getElementById("pageinfosidebartoggle").style.display = "";
        setTimeout(() => {
            document.getElementById("pageinfosidebartoggle").style.width = "40px";
        }, "1700");
        setTimeout(() => {
            document.getElementById("pageinfosidebartoggle").style.padding = "8px";
        }, "1800");
    }
    function pageinfosidebar_rollout() {
        document.getElementById("pageinfosidebar").style.overflow = "";
        document.getElementById("pageinfosidebar").style.opacity = "100%";
        document.getElementById("pageinfosidebartoggle").style.overflow = "hidden";
        document.getElementById("pageinfosidebartoggle").style.width = "0px";
        document.getElementById("pageinfosidebartoggle").style.padding = "0px";
        setTimeout(() => {
            document.getElementById("pageinfosidebar").style.width = "";
        }, "1800");
        setTimeout(() => {
            document.getElementById("pageinfosidebar").style.height = "";
        }, "1900");
    }

    if (mobileorientation() || window.innerHeight < 350) {
        setTimeout(() => {
            pageinfosidebar_rollup();
        }, "6000");
        document.getElementById("pageinfosidebar").style.opacity = "100%";
    } else {
        document.getElementById("pageinfosidebar").style.opacity = "30%";
        document
            .getElementById("pageinfosidebar")
            .setAttribute("onmouseover", "this.style.opacity = '100%'");
        document
            .getElementById("pageinfosidebar")
            .setAttribute("onmouseout", "this.style.opacity = '30%'");
    }
    $("#pageinfosidebar").on("click", function (e) {
        if (e.target == document.getElementById("dummyauthorthumbnail")) {
            GhostAuthorThumbnailExpand();
            return;
        }

        pageinfosidebar_rollup();
    });
}
let hlimg_options;

console.log('View mode of this page is: "' + pagemetainfo.mode + '"');
switch (pagemetainfo.mode) {
    case "blog":
        hlimg_options = {
            styling_imageshow_zIndex: 900,
            styling_hlimg_maxwidth: "70%",
        }
        break;
    case "project":
        hlimg_options = {
            styling_imageshow_zIndex: 900,
            styling_hlimg_maxwidth: "70%",
        }
        break;
    default:
        hlimg_options = {
            styling_imageshow_zIndex: 900,
            styling_hlimg_maxwidth: "70%",
        }
        break;
}

function parseBool(bool) {
    if (bool === "true" || bool === "1" || bool == true) return true; else return false;
}

function colorSchemeChange(x) {
    if (document.body.classList.contains("colorSchemeOverridden")) { return }
    if (x.matches) {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
        document.body.dataset.colorscheme = 0;
    } else {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
        document.body.dataset.colorscheme = 0;
    }
}


var x = window.matchMedia("(prefers-color-scheme: dark)")
document.body.classList.add("dark-theme");
document.body.classList.add("light-theme");
colorSchemeChange(x);

x.addListener(colorSchemeChange);

function colorSchemeOverride(to = 1 | 2 | 0) {
    switch (to) {
        case 1:
            document.body.classList.add("dark-theme");
            document.body.classList.add("colorSchemeOverridden");
            document.body.classList.remove("light-theme");
            document.body.dataset.colorscheme = 1;
            localStorage.setItem('ForceColorScheme', 1);
            break;
        case 2:
            document.body.classList.add("light-theme");
            document.body.classList.add("colorSchemeOverridden");
            document.body.classList.remove("dark-theme");
            document.body.dataset.colorscheme = 2;
            localStorage.setItem('ForceColorScheme', 2);
            break;
        case 0:
            document.body.classList.remove("colorSchemeOverridden");
            colorSchemeChange(x)
            document.body.dataset.colorscheme = 0;
            localStorage.setItem('ForceColorScheme', 0);
            break;
    }
    UpdateColorSchemeToggle()
}
if ((localStorage.getItem("ForceColorScheme")) !== null) {
    colorSchemeOverride(parseInt(localStorage.getItem("ForceColorScheme")))
}
function UpdateColorSchemeToggle() {
    if (document.body.classList.contains("colorSchemeOverridden")) {
        document.getElementById("daylighttoggleimg").src = "/assets/img/png/strawberry-sun-moon.png";
        document.getElementById("daylighttoggleimg").alt = "Auto light/dark";
        document.getElementById("daylighttoggleimg").setAttribute("onclick", "colorSchemeOverride(0)");
    } else {
        if (x.matches) {
            document.getElementById("daylighttoggleimg").src = "/assets/img/png/strawberry-sun.png";
            document.getElementById("daylighttoggleimg").alt = "Light mode";
            document.getElementById("daylighttoggleimg").setAttribute("onclick", "colorSchemeOverride(2)");
        } else {
            document.getElementById("daylighttoggleimg").src = "/assets/img/png/strawberry-moon.png";
            document.getElementById("daylighttoggleimg").alt = "Dark mode";
            document.getElementById("daylighttoggleimg").setAttribute("onclick", "colorSchemeOverride(1)");
        }
    }
}
setInterval(function () { UpdateColorSchemeToggle() }, 1000);

function unrollbottombar() {
    var x = document.getElementById("mybottombar");
    if (x.className === "bottombar") {
        x.className += " responsive";
    } else {
        x.className = "bottombar";
    }
    console.log("fn unrollbottombar() triggered")
}
function permabigbadgies() {
    el = (document.getElementsByClassName('badgearea')[0])
    if (typeof (el) != 'undefined' && (el) != null) {
        el.style.minHeight = "fit-content";
        bigbadgies();
        return 1;
    } else return 0;
}
function openNav() {
    document.getElementById("mySidebar").style.width = "70vw";
    setTimeout(permabigbadgies, 2500);
    elem = document.getElementsByClassName("search-button")[0];
    if (typeof (elem) != 'undefined' && (elem) != null) {
        elem.classList.add("not-on-mobile");
        return 1;
    }
    // (document.getElementsByClassName("content")[0]).style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "";
    elem = document.getElementsByClassName("search-button")[0];
    if (typeof (elem) != 'undefined' && (elem) != null) {
        elem.classList.remove("not-on-mobile");
    }
    // (document.getElementsByClassName("content")[0]).style.marginLeft = "0";
}
el = (document.getElementsByClassName('badgearea')[0])
if (window.innerHeight < 350) {
    if (typeof (el) != 'undefined' && (el) != null) {
        el.style.display = "none";
    }

}
function TouchContentUnfocusfromMenu() {
    closeNav()
    document.getElementById("mybottombar").className = "bottombar";
}

var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
}

var client = new HttpClient();
client.get('/assets/html/sociallinks.html', function (response) {
    sociallinkelements = document.getElementsByClassName("sociallinks");
    for (var i = sociallinkelements.length - 1; i >= 0; i--) {
        sociallinkelementnew = document.createElement("div");
        sociallinkelementnew.setAttribute("style", "text-align: center; align-content: center; margin-left: auto; margin-right: auto;");
        sociallinkelementnew.innerHTML = response;
        sociallinkelements.item(i).parentNode.replaceChild(sociallinkelementnew, sociallinkelements.item(i));
    }
})

document.body.style.filter = "none";
document.getElementById("filtertoggle").innerHTML = "Contrast/Greyscale";
document.getElementById("filtertoggle").style.padding = "10px";

console.log(localStorage.getItem("accessibilityfilter"));
switch (localStorage.getItem("accessibilityfilter")) {
    case 'contrast':
        document.body.style.filter = "contrast(1.6)";
        document.body.style.backgroundColor = (getComputedStyle(document.body).getPropertyValue('--filter-contrast-backgroundcolor'));
        document.body.style.backgroundImage = "none";
        document.getElementById("filtertoggle").innerText = "Greyscale";
        break;
    case 'grayscale':
        document.body.style.filter = "grayscale(1)";
        document.body.style.backgroundColor = (getComputedStyle(document.body).getPropertyValue('--filter-grayscale-backgroundcolor'));
        document.body.style.backgroundImage = "none";
        document.getElementById("filtertoggle").innerText = "Colorful";
        break;
    case null:
    default:
        document.body.style.filter = "none";
        document.body.style.backgroundImage = "";
        document.body.style.backgroundColor = "";
        document.getElementById("filtertoggle").innerText = "Contrast";
        break;
}


function ToggleFilters() {
    console.log(document.body.style.filter)
    switch (document.body.style.filter) {
        default:
            document.body.style.filter = "contrast(1.6)";
            document.body.style.backgroundColor = (getComputedStyle(document.body).getPropertyValue('--filter-contrast-backgroundcolor'));
            document.body.style.backgroundImage = "none";
            document.getElementById("filtertoggle").innerHTML = "Greyscale";
            localStorage.setItem("accessibilityfilter","contrast");
            break;
        case ("contrast(1.6)"):
            document.body.style.filter = "grayscale(1)";
            document.body.style.backgroundColor = (getComputedStyle(document.body).getPropertyValue('--filter-grayscale-backgroundcolor'));
            document.body.style.backgroundImage = "none";
            localStorage.setItem("accessibilityfilter", "grayscale");
            document.getElementById("filtertoggle").innerHTML = "Colorful";
            break;
        case ("grayscale(1)"):
            document.body.style.filter = "none";
            document.body.style.backgroundColor = "";
            document.body.style.backgroundImage = "";
            localStorage.removeItem("accessibilityfilter");
            document.getElementById("filtertoggle").innerHTML = "Contrast";
            break;
    }
}

setInterval(function () {
    if ((typeof (document.getElementById("bmc-wbtn")) !== 'undefined') && ((document.getElementById("bmc-wbtn")) !== null)) {
        (document.getElementById("bmc-wbtn")).removeAttribute("style");
        // (document.getElementById("bmc-wbtn")).style.display = "none";
    } else {
        console.log("could not find bmc");
    }
}, 3000);

function checkKitton() {
    if ((typeof (document.getElementById("oneko")) == 'undefined') || ((document.getElementById("oneko")) == null)) {
        document.getElementById("kittontoggle").remove();
        console.log("kitton is not here.")
    } else {
        console.log("kitton is here!")
        if (parseBool(localStorage.getItem("wantskitton")) === false) {
        // console.log("But we want it to go away!");
            (document.getElementById("oneko")).style.display = "none";
            (document.getElementById("kittontoggletext")).innerText = "show!";
        } else {
        // console.log("and it'll stay");
            (document.getElementById("kittontoggletext")).innerText = "hide..";
        };
    }    
}
setTimeout(() => {
    console.log("Checking for oneko...")
    checkKitton();
}, 1500);
function ToggleKitton() {
    var kitton = (document.getElementById("oneko"));
    switch (kitton.style.display) {
        case 'none':
            kitton.style.display = "";
            localStorage.setItem("wantskitton","true");
            (document.getElementById("kittontoggletext")).innerText = "hide..";
            break;

        default:
            kitton.style.display = "none";
            localStorage.setItem("wantskitton", "false");
            (document.getElementById("kittontoggletext")).innerText = "show!";
            break;
    }
}
taggos = (document.getElementsByClassName('taggo'))
for (var i = taggos.length - 1; i >= 0; i--) {
    var newtaggo = document.createElement("a");
    newtaggo.href = "/search?s=%2C+" + taggos.item(i).innerText;
    newtaggo.innerHTML = "<code class='taggo'>" + taggos.item(i).innerText + "</code>";
    taggos.item(i).parentNode.replaceChild(newtaggo, taggos.item(i));
}