function mediamobilescreen() {
    return ((window.matchMedia("(orientation: portrait),(max-width: 800px)")).matches);
};

function colorSchemeChange(x) {
    if (document.body.classList.contains("colorSchemeOverridden")) {return}
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

function SendToServer(name, value) {
    let xhttpw = new XMLHttpRequest();
    xhttpw.open("GET", "/?"+ name + "=" + value);
    xhttpw.send();
}

function colorSchemeOverride(to = 1|2|0) {
    switch (to) {
        case 1:
            document.body.classList.add("dark-theme");
            document.body.classList.add("colorSchemeOverridden");
            document.body.classList.remove("light-theme");
            document.body.dataset.colorscheme = 1;
            SendToServer('ForceColorScheme',1);
            break;
        case 2:
            document.body.classList.add("light-theme");
            document.body.classList.add("colorSchemeOverridden");
            document.body.classList.remove("dark-theme");
            document.body.dataset.colorscheme = 2;
            SendToServer('ForceColorScheme', 2);
            break;
        case 0:
            document.body.classList.remove("colorSchemeOverridden");
            colorSchemeChange(x)
            document.body.dataset.colorscheme = 0;
            SendToServer('ForceColorScheme', 0);
            break;
    }
    UpdateColorSchemeToggle()
}
colorSchemeOverride(LoadForceColorScheme);
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
setInterval(function () {UpdateColorSchemeToggle()}, 1000);

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
client.get('/sociallinks', function (response) {
    sociallinkelements = document.getElementsByClassName("sociallinks");
    for (var i = sociallinkelements.length - 1; i >= 0; i--) {
        sociallinkelementnew = document.createElement("div");
        sociallinkelementnew.setAttribute("style", "text-align: center; align-content: center; margin-left: auto; margin-right: auto;");
        sociallinkelementnew.innerHTML = response;
        sociallinkelements.item(i).parentNode.replaceChild(sociallinkelementnew, sociallinkelements.item(i));
    }
})

function LoadImgMote(currimgmote) {
    var client = new HttpClient();
    let name = (currimgmote.innerHTML).replace(":", ".");
    client.get('/?getimgmote=' + name, function (response) {
        var newimgmote = document.createElement("img");
        newimgmote.setAttribute("style", "max-width: 16px; max-height: 16px");
        newimgmote.setAttribute("loading", "lazy");
        newimgmote.setAttribute("alt", ":" + name + ":-imgmote.");
        newimgmote.classList.add("imgmote");

        newimgmote.src = response;
        currimgmote.parentNode.replaceChild(newimgmote, currimgmote);
    });
}

imgmotes = document.getElementsByTagName("imgmote");
for (var i = imgmotes.length - 1; i >= 0; i--) {
    LoadImgMote(imgmotes.item(i));

}

document.body.style.filter = "none";
document.getElementById("filtertoggle").innerHTML = "Contrast/Greyscale";
document.getElementById("filtertoggle").style.padding = "10px";

console.log(accessibilityfilter);
switch (accessibilityfilter) {
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
    case "none":
    default:
        document.body.style.filter = "none";
        document.body.style.backgroundImage = "";
        document.body.style.backgroundColor = "";
        document.getElementById("filtertoggle").innerText = "Contrast";
        break;
}



function ToggleFilters() {
    console.log(document.body.style.filter)
    const xhttpw = new XMLHttpRequest();
    switch (document.body.style.filter) {
        default:
            document.body.style.filter = "contrast(1.6)";
            document.body.style.backgroundColor = (getComputedStyle(document.body).getPropertyValue('--filter-contrast-backgroundcolor'));
            document.body.style.backgroundImage = "none";
            document.getElementById("filtertoggle").innerHTML = "Greyscale";
            xhttpw.open("GET", "/?filter=contrast");
            xhttpw.send();
            break;
        case ("contrast(1.6)"):
            document.body.style.filter = "grayscale(1)";
            document.body.style.backgroundColor = (getComputedStyle(document.body).getPropertyValue('--filter-grayscale-backgroundcolor'));
            document.body.style.backgroundImage = "none";
            document.getElementById("filtertoggle").innerHTML = "Colorful";
            xhttpw.open("GET", "/?filter=grayscale");
            xhttpw.send();
            break;
        case ("grayscale(1)"):
            document.body.style.filter = "none";
            document.body.style.backgroundColor = "";
            document.body.style.backgroundImage = "";
            document.getElementById("filtertoggle").innerHTML = "Contrast";
            xhttpw.open("GET", "/?filter=none");
            xhttpw.send();
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
setTimeout(function () {
if ((typeof (document.getElementById("oneko")) == 'undefined') || ((document.getElementById("oneko")) == null)) {
    document.getElementById("kittontoggle").remove();
    console.log("oneko is not here.")
} else {
        if (wantkitton == false) {
            (document.getElementById("oneko")).style.display = "none";
            (document.getElementById("kittontoggletext")).innerText = "show!";
        } else {
            (document.getElementById("kittontoggletext")).innerText = "hide..";
        };
}}, 1500);
function ToggleKitton() {
    var kitton = (document.getElementById("oneko"));
    const xhttpw = new XMLHttpRequest();
    switch (kitton.style.display) {
        case 'none':
            kitton.style.display = "";
            (document.getElementById("kittontoggletext")).innerText = "hide..";
            xhttpw.open("GET", "/?kitton=1");
            xhttpw.send();
            break;

        default:
            kitton.style.display = "none";
            (document.getElementById("kittontoggletext")).innerText = "show!";
            xhttpw.open("GET", "/?kitton=0");
            xhttpw.send();
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
