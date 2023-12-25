<?php
function badge($href = "", $src, $title, $alt) {
  if (!empty($href)) {
  return "<img src=\"{$src}\" alt=\"{$alt}\" title=\"[Clickable] {$title}\" onclick=\"window.open('{$href}');\" class=\"badge clickable-badge\" loading=\"lazy\">\n";
  } else {
  return "<img src=\"{$src}\" alt=\"{$alt}\" title=\"{$title}\" class=\"badge\" loading=\"lazy\">\n";
  }
}
?>

<div class="badgearea" onmouseover="bigbadgies()" onmouseleave="smollbadgies()" style="height: 20vh">
    <p>Badgies<imgmote>love3</imgmote></p><small style="font-size: 8px">(in random order!)</small></p>
<?php
    $badges = [
    badge("https://yesterweb.org/no-to-web3/", "https://yesterweb.org/no-to-web3/img/roly-saynotoweb3.gif", "Crypto's ewie.", "badge saying 'Keep the web free, say no to web3'"),
    badge("https://minecraft.net/", "/assets/img/badges/minecraft.gif", "block game good", "minecraft"),
    badge("https://www.mozilla.org/nl/firefox/new/?redirect_source=firefox-com", "/assets/img/badges/getfirefox.gif", "GET FIREFOX!!", "Get Firefox"),
    badge("","/assets/img/badges/fucknazis.gif","FUCK NAZIS!","Fuck nazis"),
    badge("/assets/img/badges/blinkiesCafe-autism.gif","/assets/img/badges/blinkiesCafe-autism.gif", "brain go brrr", "autism"),
    badge("/assets/img/badges/blinkiesCafe-L1.gif", "/assets/img/badges/blinkiesCafe-L1.gif", "AUTISM!", "autism"),
    badge("", "/assets/img/badges/y2k-compliant.gif", "We survived! Or... well this site is from 2023. uhm.", "Y2K-compliant"),
    badge("", "/assets/img/badges/transles80×31.png", "I'm trans, and girls", "trans-lesbian flag"),
    badge("https://www.tumblr.com/strawmelonjuice","/assets/img/badges/blinkiesCafe-tumblr-grrll.gif", "Tumblr Tumblr Tumblr", "Tumblr"),
    badge("", "/assets/img/badges/linux80x15.png", "team linux heheh", "Run linux"),
    badge("", "/assets/img/badges/feminism.gif", "intersectional feminism!", "feminism"),
    badge("https://php.net/","/assets/img/badges/php_copy1.gif", "This website runs on PHP8", "PHP powered"),
    badge("https://ubuntu.com/download/desktop/", "/assets/img/badges/ubuntubutton.png", "Ubuntu is by far the most intuitive Linux distro, go try it!", "Ubuntu"),
    badge("https://logger-diary.strawmelonjuice.com/", "https://logger-diary.strawmelonjuice.com/img/blinkie/I_use_LDo_blinkie_short.gif","Click to go to LDo!","I use Logger-Diary Online!"),
    badge("", "/assets/img/badges/antinft.gif", "NFTs are thrash, and a perfect way to spend money on destroying the world.", "anti-nft's"),
    badge("", "/assets/img/badges/nerd.gif", "nerd", "nerd"),
    badge("", "/assets/img/badges/beingaprincessisafulltimejob.gif","Being a princess is a full time job <3","Being a princess is a full time job"),
    badge("https://blinkies.cafe", "https://blinkies.cafe/b/display/blinkiesCafe-badge.gif", "blinkies.cafe | make your own blinkies!", "blinkies.cafe"),
    badge("/assets/img/badges/blinkiesCafe-xD.gif", "/assets/img/badges/blinkiesCafe-xD.gif", "This page works better on a computer than on a smartphone :3", "This site works better on a computer than on a smartphone :3"),
    // "<hl-img src=\"/assets/img/badges/blinkiesCafe-xD.gif\" alt=\"This site works better on a computer than on a smartphone :3\" title=\"[Clickable] This page works better on a computer than on a smartphone :3\" onclick=\"window.open('/assets/img/badges/blinkiesCafe-xD.gif');\" class=\"badge clickable-badge\" loading=\"lazy\"></hl-img>",
    ];

    shuffle($badges);
    $maxbadges = 20;
    $count = 0;
    foreach ($badges as $badge) {
        $count = $count + 1;
        if ($count > $maxbadges) break;
        echo $badge;
}
?>
</div>
<a href="/?p=support" id="donateextrasidebarlink" class="menulink"><span class="emoji-block">💸</span> Support me</a>
<script>
    // bruh CSS could've done this but the transition didnt work, now neither of them do. But hey it works well enough ig.
    el = (document.getElementsByClassName('badgearea')[0])
    function bigbadgies(){
        el.style.height = "fit-content";
    }
    function smollbadgies(){
        if (el.style.minHeight !== "fit-content") {
            el.style.height = "20vh";
        }
    }
</script>