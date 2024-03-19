/*
Cynthia Client-side script.

This script is embedded into any page Cynthia serves, always just before the closing </html>.
*/

setInterval(() => {
	const elements = document.getElementsByClassName("unparsedtimestamp");
	for (let i = elements.length - 1; i >= 0; i--) {
		const timestamp = Number.parseInt(elements[i].textContent);
		console.log("Parsing timestamp.");
		const jstimestamp = timestamp * 1000;
		const dateObject = new Date(jstimestamp);
		const data = dateObject.toLocaleString();
		elements[i].textContent = data.substring(0, data.length - 3);
		elements[i].classList.remove("unparsedtimestamp");
	}
}, 100);

function mobileorientation() {
	const csssays = getComputedStyle(document.body).getPropertyValue(
		"--screen-type-orientation",
	);
	if (csssays === "mobile") {
		return 1;
	}
	if (csssays === "landscape") {
		return 0;
	}
	console.error(
		`Could not determine 'mobilescreen()' from css value '${csssays}'.`,
	);
}

if (document.getElementById("cynthiapageinfoshowdummyelem") != null) {
	let post_tags_htm = "";
	for (tag of pagemetainfo.tags) {
		if (tag !== pagemetainfo.tags[0]) {
			post_tags_htm = `${post_tags_htm}, <code class="post_tag">${tag}</code>`;
		} else {
			post_tags_htm = `${post_tags_htm}<code class="post_tag">${tag}</code>`;
		}
	};
	post_html = document.querySelector("main");
	post_html.innerHTML = `${post_html.innerHTML}
	<hr>
	<div id="taglist">
	<h4>Tags</h4>
	${post_tags_htm}
	</div>
	`;
	post_tags = document.getElementsByClassName("post_tag");
	for (let i = post_tags.length - 1; i >= 0; i--) {
		const newpost_tag = document.createElement("a");
		newpost_tag.href = `/t/${post_tags.item(i).innerText}`;
		newpost_tag.innerHTML = `<code class='post_tag'>${
			post_tags.item(i).innerText
		}</code>`;
		post_tags.item(i).parentNode.replaceChild(newpost_tag, post_tags.item(i));
	}

	let pageinfosidebarelem = document.getElementById(
		"cynthiapageinfoshowdummyelem",
	);
	pageinfosidebarelem.setAttribute(
		"style",
		"opacity: 0.3; transition: all 2s ease-out 0s;",
	);
	pageinfosidebarelem.id = "pageinfosidebar";
	pageinfosidebarelem = document.getElementById("pageinfosidebar");
	let authorthumbnail = "";
	if (typeof pagemetainfo.author.thumbnail !== "undefined") {
		authorthumbnail = `<img alt="Author thumbnail" style="width: 2.5em" src="${pagemetainfo.author.thumbnail}">`;
	}
	let dates = "";
	if (typeof pagemetainfo.dates !== "undefined") {
		if (
			typeof pagemetainfo.dates.altered === "undefined" ||
			pagemetainfo.dates.altered == null ||
			pagemetainfo.dates.published === pagemetainfo.dates.altered
		) {
			dates = `<li>Posted: <span class="preparsedtimestamp">${new Date(
				pagemetainfo.dates.published * 1000,
			).toLocaleString()}</span></li>`;
		} else {
			dates = `
    <li>Posted: <span class="preparsedtimestamp">${new Date(
			pagemetainfo.dates.published * 1000,
		).toLocaleString()}</span></li>
    <li>Edited: <span class="preparsedtimestamp">${new Date(
			pagemetainfo.dates.altered * 1000,
		).toLocaleString()}</span></li>
    `;
		}
	}
	pageinfosidebarelem.innerHTML = `
    <span class="not-on-mobile" style="position:absolute;right:0;top:0;font-size: 3em; cursor: pointer; " onclick="pageinfosidebar_rollup()">&#8665;</span>
    <p class="pageinfo-title">${pagemetainfo.title}</p>
    <ul>
      <li>Author: ${authorthumbnail} ${pagemetainfo.author.name}</li>
      ${dates}
      </ul>
    <p class="pageinfo-shortversion">${pagemetainfo.short}</p>
      `;

	function pageinfosidebar_rollup() {
		document.getElementById("pageinfosidebar").style.overflow = "hidden";
		document.getElementById("pageinfosidebar").style.width = "0";
		document.getElementById("pageinfosidebar").style.maxHeight = "310";
		document.getElementById("pageinfosidebartoggle").style.display = "";
		document.getElementById("pageinfosidebartoggle").style.width = "initial";
		setTimeout(() => {
			document.getElementById("pageinfosidebartoggle").style.width = "40";
		}, 1700);
		setTimeout(() => {
			document.getElementById("pageinfosidebartoggle").style.padding = "8px";
		}, 1800);
	}

	function pageinfosidebar_rollout() {
		document.getElementById("pageinfosidebar").style.overflow = "";
		document.getElementById("pageinfosidebar").style.opacity = "100%";
		document.getElementById("pageinfosidebartoggle").style.overflow = "hidden";
		document.getElementById("pageinfosidebartoggle").style.width = "0";
		document.getElementById("pageinfosidebartoggle").style.padding = "0";
		setTimeout(() => {
			document.getElementById("pageinfosidebartoggle").style.width = "40px";
		}, 1700);
		setTimeout(() => {
			document.getElementById("pageinfosidebartoggle").style.padding = "8px";
		}, 1800);
	}

	if (mobileorientation() || window.innerHeight < 350) {
		setTimeout(() => {
			pageinfosidebar_rollup();
		}, 6000);
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
}
/*=====================================================================================================================================





Start of own customisations





=====================================================================================================================================*/
// function activate () {

function parseBool(bool) {
	if (bool === "true" || bool === "1" || bool === true) return true;
	return false;
}

function colorSchemeChange(x) {
	if (document.body.classList.contains("colorSchemeOverridden")) {
		return;
	}
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

const x = window.matchMedia("(prefers-color-scheme: dark)");
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
			localStorage.setItem("ForceColorScheme", 1);
			break;
		case 2:
			document.body.classList.add("light-theme");
			document.body.classList.add("colorSchemeOverridden");
			document.body.classList.remove("dark-theme");
			document.body.dataset.colorscheme = 2;
			localStorage.setItem("ForceColorScheme", 2);
			break;
		case 0:
			document.body.classList.remove("colorSchemeOverridden");
			colorSchemeChange(x);
			document.body.dataset.colorscheme = 0;
			localStorage.setItem("ForceColorScheme", 0);
			break;
	}
	UpdateColorSchemeToggle();
}
if (localStorage.getItem("ForceColorScheme") !== null) {
	colorSchemeOverride(
		Number.parseInt(localStorage.getItem("ForceColorScheme")),
	);
}
function UpdateColorSchemeToggle() {
	if (document.body.classList.contains("colorSchemeOverridden")) {
		document.getElementById("daylighttoggleimg").src =
			"/assets/img/png/strawberry-sun-moon.png";
		document.getElementById("daylighttoggleimg").alt = "Auto light/dark";
		document
			.getElementById("daylighttoggleimg")
			.setAttribute("onclick", "colorSchemeOverride(0)");
	} else {
		if (x.matches) {
			document.getElementById("daylighttoggleimg").src =
				"/assets/img/png/strawberry-sun.png";
			document.getElementById("daylighttoggleimg").alt = "Light mode";
			document
				.getElementById("daylighttoggleimg")
				.setAttribute("onclick", "colorSchemeOverride(2)");
		} else {
			document.getElementById("daylighttoggleimg").src =
				"/assets/img/png/strawberry-moon.png";
			document.getElementById("daylighttoggleimg").alt = "Dark mode";
			document
				.getElementById("daylighttoggleimg")
				.setAttribute("onclick", "colorSchemeOverride(1)");
		}
	}
}
setInterval(() => {
	UpdateColorSchemeToggle();
}, 1000);

function unrollbottombar() {
	const x = document.getElementById("mybottombar");
	if (x.className === "bottombar") {
		x.className += " responsive";
	} else {
		x.className = "bottombar";
	}
	console.log("fn unrollbottombar() triggered");
}
function permabigbadgies() {
	el = document.getElementsByClassName("badgearea")[0];
	if (typeof el !== "undefined" && el != null) {
		el.style.minHeight = "fit-content";
		bigbadgies();
		return 1;
	}
	return 0;
}
function openNav() {
	document.getElementById("mySidebar").style.width = "70vw";
	setTimeout(permabigbadgies, 2500);
	elem = document.getElementsByClassName("search-button")[0];
	if (typeof elem !== "undefined" && elem != null) {
		elem.classList.add("not-on-mobile");
		return 1;
	}
	// (document.getElementsByClassName("content")[0]).style.marginLeft = "250px";
}

function closeNav() {
	document.getElementById("mySidebar").style.width = "";
	elem = document.getElementsByClassName("search-button")[0];
	if (typeof elem !== "undefined" && elem != null) {
		elem.classList.remove("not-on-mobile");
	}
	// (document.getElementsByClassName("content")[0]).style.marginLeft = "0";
}
el = document.getElementsByClassName("badgearea")[0];
if (window.innerHeight < 350) {
	if (typeof el !== "undefined" && el != null) {
		el.style.display = "none";
	}
}
function TouchContentUnfocusfromMenu() {
	closeNav();
	document.getElementById("mybottombar").className = "bottombar";
}

const HttpClient = function () {
	this.get = (aUrl, aCallback) => {
		const anHttpRequest = new XMLHttpRequest();
		anHttpRequest.onreadystatechange = () => {
			if (anHttpRequest.readyState === 4 && anHttpRequest.status === 200)
				aCallback(anHttpRequest.responseText);
		};

		anHttpRequest.open("GET", aUrl, true);
		anHttpRequest.send(null);
	};
};

const client = new HttpClient();
client.get("/assets/html/sociallinks.html", (response) => {
	sociallinkelements = document.getElementsByClassName("sociallinks");
	for (let i = sociallinkelements.length - 1; i >= 0; i--) {
		sociallinkelementnew = document.createElement("div");
		sociallinkelementnew.setAttribute(
			"style",
			"text-align: center; align-content: center; margin-left: auto; margin-right: auto;",
		);
		sociallinkelementnew.innerHTML = response;
		sociallinkelements
			.item(i)
			.parentNode.replaceChild(
				sociallinkelementnew,
				sociallinkelements.item(i),
			);
	}
});

document.body.style.filter = "none";
document.getElementById("filtertoggle").innerHTML = "Contrast/Greyscale";
document.getElementById("filtertoggle").style.padding = "10px";
switch (localStorage.getItem("accessibilityfilter")) {
	case "contrast":
		document.body.style.filter = "contrast(1.6)";
		document.body.style.backgroundColor = getComputedStyle(
			document.body,
		).getPropertyValue("--filter-contrast-backgroundcolor");
		document.body.style.backgroundImage = "none";
		document.getElementById("filtertoggle").innerText = "Greyscale";
		break;
	case "grayscale":
		document.body.style.filter = "grayscale(1)";
		document.body.style.backgroundColor = getComputedStyle(
			document.body,
		).getPropertyValue("--filter-grayscale-backgroundcolor");
		document.body.style.backgroundImage = "none";
		document.getElementById("filtertoggle").innerText = "Colorful";
		break;
	default:
		document.body.style.filter = "none";
		document.body.style.backgroundImage = "";
		document.body.style.backgroundColor = "";
		document.getElementById("filtertoggle").innerText = "Contrast";
		break;
}

function ToggleFilters() {
	console.log(document.body.style.filter);
	switch (document.body.style.filter) {
		case "contrast(1.6)":
			document.body.style.filter = "grayscale(1)";
			document.body.style.backgroundColor = getComputedStyle(
				document.body,
			).getPropertyValue("--filter-grayscale-backgroundcolor");
			document.body.style.backgroundImage = "none";
			localStorage.setItem("accessibilityfilter", "grayscale");
			document.getElementById("filtertoggle").innerHTML = "Colorful";
			break;
		case "grayscale(1)":
			document.body.style.filter = "none";
			document.body.style.backgroundColor = "";
			document.body.style.backgroundImage = "";
			localStorage.removeItem("accessibilityfilter");
			document.getElementById("filtertoggle").innerHTML = "Contrast";
			break;
		default:
			document.body.style.filter = "contrast(1.6)";
			document.body.style.backgroundColor = getComputedStyle(
				document.body,
			).getPropertyValue("--filter-contrast-backgroundcolor");
			document.body.style.backgroundImage = "none";
			document.getElementById("filtertoggle").innerHTML = "Greyscale";
			localStorage.setItem("accessibilityfilter", "contrast");
			break;
	}
}

setInterval(() => {
	if (
		typeof document.getElementById("bmc-wbtn") !== "undefined" &&
		document.getElementById("bmc-wbtn") !== null
	) {
		document.getElementById("bmc-wbtn").removeAttribute("style");
		// (document.getElementById("bmc-wbtn")).style.display = "none";
	} else {
		console.log("could not find bmc");
	}
}, 3000);

function checkKitton() {
	if (
		typeof document.getElementById("oneko") === "undefined" ||
		document.getElementById("oneko") == null
	) {
		document.getElementById("kittontoggle").remove();
		console.log("kitton is not here.");
	} else {
		console.log("kitton is here!");
		if (parseBool(localStorage.getItem("wantskitton")) === true) {
			// console.log("and it'll stay");
			document.getElementById("kittontoggletext").innerText = "hide..";
		} else {
			// console.log("But we want it to go away!");
			document.getElementById("oneko").style.display = "none";
			document.getElementById("kittontoggletext").innerText = "show!";
		}
	}
}
setTimeout(() => {
	console.log("Checking for oneko...");
	checkKitton();
}, 1500);
function ToggleKitton() {
	const kitton = document.getElementById("oneko");
	switch (kitton.style.display) {
		case "none":
			kitton.style.display = "";
			localStorage.setItem("wantskitton", "true");
			document.getElementById("kittontoggletext").innerText = "hide..";
			break;

		default:
			kitton.style.display = "none";
			localStorage.setItem("wantskitton", "false");
			document.getElementById("kittontoggletext").innerText = "show!";
			break;
	}
}

const badges = document.querySelector("div.badgearea");
if (badges !== null) {
	// Randomnises the badgies' order
	const innerbadges = document.querySelector("div#innerbadgies");
	if (innerbadges !== null) {
		for (let i = innerbadges.children.length; i >= 0; i--) {
			innerbadges.appendChild(innerbadges.children[(Math.random() * i) | 0]);
		}
		console.info("Badgies are now randomnised!");
	}
	// Allows for big or smoll badgies
	window.bigbadgies = () => {
		badges.style.height = "fit-content";
	};
	window.smollbadgies = () => {
		if (badges.style.minHeight !== "fit-content") {
			badges.style.height = "20vh";
		}
	};
}

console.log(`View mode of this page is: "${pagemetainfo.mode}"`);

window.ScaleFontsTo = 7;

document.body.setScaledFont = function (f) {
	let o = 100;
	const ow = this.offsetWidth;
	switch (true) {
		case mobileorientation():
			o = ow * (f / 60);
			console.log("Scaling in mobile mode.");
			break;
		case this.offsetWidth < 1200:
			o = ow * (f / 90);
				
			console.log(`Scaling in tablet mode. Width: ${this.offsetWidth}`);
			break;
		case this.offsetWidth <= 1600:
			o = ow * (f / 100);
			console.log(`Scaling in laptop mode. Width: ${this.offsetWidth}`);
			break;
		case this.offsetWidth > 1600:
			o = ow * (f / 150);
			console.log(`Scaling in desktop mode. Width: ${this.offsetWidth}`);
			break;
	}
	this.style.fontSize = `${o}%`;
	return this;
};

window.onresize = () => {
	document.body.setScaledFont(window.ScaleFontsTo);
};
document.body.setScaledFont(window.ScaleFontsTo);
setInterval(() => {
	for (a of document.querySelectorAll("img.imgmote")) {
		a.style.height = "1em";
		a.style.width = "1em";
		a.style.maxHeight = "";
		a.style.maxWidth = "";
		a.style.fontSize = "100%";
	}
});


// }

// oneko.js: https://github.com/adryd325/oneko.js

function oneko() {
	const nekoEl = document.createElement("div");
	let nekoPosX = 32;
	let nekoPosY = 32;
	let mousePosX = 0;
	let mousePosY = 0;
	const isReduced =
		window.matchMedia("(prefers-reduced-motion: reduce)") === true ||
		window.matchMedia("(prefers-reduced-motion: reduce)").matches === true;
	if (isReduced) {
		return;
	}

	let frameCount = 0;
	let idleTime = 0;
	let idleAnimation = null;
	let idleAnimationFrame = 0;
	const nekoSpeed = 15;
	const spriteSets = {
		idle: [[-3, -3]],
		alert: [[-7, -3]],
		scratchSelf: [
			[-5, 0],
			[-6, 0],
			[-7, 0],
		],
		scratchWallN: [
			[0, 0],
			[0, -1],
		],
		scratchWallS: [
			[-7, -1],
			[-6, -2],
		],
		scratchWallE: [
			[-2, -2],
			[-2, -3],
		],
		scratchWallW: [
			[-4, 0],
			[-4, -1],
		],
		tired: [[-3, -2]],
		sleeping: [
			[-2, 0],
			[-2, -1],
		],
		N: [
			[-1, -2],
			[-1, -3],
		],
		NE: [
			[0, -2],
			[0, -3],
		],
		E: [
			[-3, 0],
			[-3, -1],
		],
		SE: [
			[-5, -1],
			[-5, -2],
		],
		S: [
			[-6, -3],
			[-7, -2],
		],
		SW: [
			[-5, -3],
			[-6, -1],
		],
		W: [
			[-4, -2],
			[-4, -3],
		],
		NW: [
			[-1, 0],
			[-1, -1],
		],
	};

	function create() {
		nekoEl.id = "oneko";
		nekoEl.style.width = "32px";
		nekoEl.style.height = "32px";
		nekoEl.style.position = "fixed";
		nekoEl.style.pointerEvents = "none";
		nekoEl.style.backgroundImage = "url('/assets/img/kitton.png')";
		nekoEl.style.imageRendering = "smooth";
		nekoEl.style.left = `${nekoPosX - 16}px`;
		nekoEl.style.top = `${nekoPosY - 16}px`;
		nekoEl.style.zIndex = "999";

		document.body.appendChild(nekoEl);

		document.onmousemove = (event) => {
			mousePosX = event.clientX;
			mousePosY = event.clientY;
		};

		window.onekoInterval = setInterval(frame, 100);
	}

	function setSprite(name, frame) {
		const sprite = spriteSets[name][frame % spriteSets[name].length];
		nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
	}

	function resetIdleAnimation() {
		idleAnimation = null;
		idleAnimationFrame = 0;
	}

	function idle() {
		idleTime += 1;

		// every ~ 20 seconds
		if (
			idleTime > 10 &&
			Math.floor(Math.random() * 200) === 0 &&
			idleAnimation == null
		) {
			const avalibleIdleAnimations = ["sleeping", "scratchSelf"];
			if (nekoPosX < 32) {
				avalibleIdleAnimations.push("scratchWallW");
			}
			if (nekoPosY < 32) {
				avalibleIdleAnimations.push("scratchWallN");
			}
			if (nekoPosX > window.innerWidth - 32) {
				avalibleIdleAnimations.push("scratchWallE");
			}
			if (nekoPosY > window.innerHeight - 32) {
				avalibleIdleAnimations.push("scratchWallS");
			}
			idleAnimation =
				avalibleIdleAnimations[
					Math.floor(Math.random() * avalibleIdleAnimations.length)
				];
		}

		switch (idleAnimation) {
			case "sleeping":
				if (idleAnimationFrame < 8) {
					setSprite("tired", 0);
					break;
				}
				setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
				if (idleAnimationFrame > 192) {
					resetIdleAnimation();
				}
				break;
			case "scratchWallN":
			case "scratchWallS":
			case "scratchWallE":
			case "scratchWallW":
			case "scratchSelf":
				setSprite(idleAnimation, idleAnimationFrame);
				if (idleAnimationFrame > 9) {
					resetIdleAnimation();
				}
				break;
			default:
				setSprite("idle", 0);
				return;
		}
		idleAnimationFrame += 1;
	}

	function frame() {
		frameCount += 1;
		const diffX = nekoPosX - mousePosX;
		const diffY = nekoPosY - mousePosY;
		const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

		if (distance < nekoSpeed || distance < 48) {
			idle();
			return;
		}

		idleAnimation = null;
		idleAnimationFrame = 0;

		if (idleTime > 1) {
			setSprite("alert", 0);
			// count down after being alerted before moving
			idleTime = Math.min(idleTime, 7);
			idleTime -= 1;
			return;
		}

		direction = diffY / distance > 0.5 ? "N" : "";
		direction += diffY / distance < -0.5 ? "S" : "";
		direction += diffX / distance > 0.5 ? "W" : "";
		direction += diffX / distance < -0.5 ? "E" : "";
		setSprite(direction, frameCount);

		nekoPosX -= (diffX / distance) * nekoSpeed;
		nekoPosY -= (diffY / distance) * nekoSpeed;

		nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
		nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

		nekoEl.style.left = `${nekoPosX - 16}px`;
		nekoEl.style.top = `${nekoPosY - 16}px`;
	}

	create();
};

if (pagemetainfo.mode === "default") oneko();