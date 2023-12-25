function scrollbarsLoad() {
    if (mediamobilescreen()) {
        console.log("Mobile and or portrait screen detected. Not loading custom scroll bars.");
        return;
    }
    switch (viewmode) {
        case 'projects':
            (function ($) {
                $(window).on("load", function () {
                    $("main.content").mCustomScrollbar({
                        theme: "inset-2",
                        alwaysShowScrollbar: 0,
                        mouseWheel: {
                            enable: true,
                            scrollAmount: 300,
                        },
                    });
                });
            })(jQuery);
            break;
        case 'blog':
            (function ($) {
                $(window).on("load", function () {
                    $("main.content").mCustomScrollbar({
                        theme: "minimal-dark",
                        mouseWheel: {
                            enable: true,
                            scrollAmount: 300,
                        },
                        autoHideScrollbar: 1,
                    });
                });
            })(jQuery);
            break;
        default:
            (function ($) {
                $(window).on("load", function () {
                    $("main.content").mCustomScrollbar({
                        //   theme:"rounded-dots-dark",
                        theme: "inset-3-dark",
                        autoHideScrollbar: 1,
                        scrollbarPosition: "outside",
                        mouseWheel: {
                            enable: true,
                            scrollAmount: 300,
                        },
                    });
                });
            })(jQuery);
            break;
    }
}