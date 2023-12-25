<?php
require_once(__DIR__ . "/../../init.php");
header('Content-Type: text/javascript');
echo "// Merged javascripts for enhancing feed experience. \n\n// site.min.js\n\n\n".file_get_contents(__DIR__. "../../../assets/scripts/site.min.js"). "\n//hl-img from jsdelivr\n\n\n".shell_exec("curl {$hlimg_script_src}");
// echo shell_exec("curl {$hlimg_script_src}");