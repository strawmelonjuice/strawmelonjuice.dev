const debug_pageinfo = 1;
function mobilescreen() {
  if (

    typeof mediamobilescreen === "function"

) {
    return mediamobilescreen();
  }
  var csssays = (getComputedStyle(document.body).getPropertyValue('--screen-type-orientation'));
  if ((csssays) === ("mobile")) {
    return 1;
  }
  if ((csssays) === ("landscape")) {
    return 0;
  }
  console.error("Could not determine 'mobilescreen()' from css value '" + csssays + "'.");
};
  if (debug_pageinfo) console.log("Is this a mobile screen? " + mobilescreen());
  function pageinfosidebar_rollup() {
    document.getElementById("pageinfosidebar").style.overflow = "hidden";
    document.getElementById("pageinfosidebar").style.width = "0px";
    document.getElementById("pageinfosidebar").style.maxHeight = "310px";
    document.getElementById("pageinfosidebartoggle").style.display = "";
    setTimeout(() => { document.getElementById("pageinfosidebartoggle").style.width = "40px"; }, '1700');
    setTimeout(() => { document.getElementById("pageinfosidebartoggle").style.padding = "8px"; }, '1800');
  }
  function pageinfosidebar_rollout() {
    document.getElementById("pageinfosidebar").style.overflow = "";
    document.getElementById("pageinfosidebar").style.opacity = "100%";
    document.getElementById("pageinfosidebartoggle").style.overflow = "hidden";
    document.getElementById("pageinfosidebartoggle").style.width = "0px";
    document.getElementById("pageinfosidebartoggle").style.padding = "0px";
    setTimeout(() => { document.getElementById("pageinfosidebar").style.width = ""; }, '1800');
    setTimeout(() => { document.getElementById("pageinfosidebar").style.height = ""; }, '1900');
  }




  if ((mobilescreen()) || (window.innerHeight < 350)) {
    setTimeout(() => { pageinfosidebar_rollup(); }, '6000');
    document.getElementById("pageinfosidebar").style.opacity = "100%"
  } else {
    document.getElementById("pageinfosidebar").style.opacity = "30%"
    document.getElementById("pageinfosidebar").setAttribute("onmouseover", "this.style.opacity = '100%'");
    document.getElementById("pageinfosidebar").setAttribute("onmouseout", "this.style.opacity = '30%'");
  }
$('#pageinfosidebar').on('click', function (e) {
  if (e.target == document.getElementById("dummyauthorthumbnail")) {
    GhostAuthorThumbnailExpand()
    return;
  }
  
  pageinfosidebar_rollup()
});
  function GhostAuthorThumbnail() {
    document.getElementById("dummyauthorthumbnail").setAttribute("onclick", "GhostAuthorThumbnailExpand()");
    document.getElementById("dummyauthorthumbnail").setAttribute("style", document.getElementById("authorthumbnail").getAttribute("style"));
    document.getElementById("dummyauthorthumbnail").setAttribute("src", document.getElementById("authorthumbnail").getAttribute("src"));
    document.getElementById("dummyauthorthumbnail").setAttribute("alt", document.getElementById("authorthumbnail").getAttribute("alt"));
  }
  function GhostAuthorThumbnailExpand() {
    setTimeout(() => { imageshow(1, document.getElementById("authorthumbnail")); }, '300');
  }
setTimeout(() => { GhostAuthorThumbnail(); }, '3000');
