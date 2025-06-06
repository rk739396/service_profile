        var gemSettings = {
            "isTouch": "",
            "forcedLasyDisabled": "",
            "tabletPortrait": "1",
            "tabletLandscape": "",
            "topAreaMobileDisable": "",
            "parallaxDisabled": "",
            "fillTopArea": "",
            "themePath": "https:\/\/www.incrementors.com\/wp-content\/themes\/thegem",
            "rootUrl": "https:\/\/www.incrementors.com",
            "mobileEffectsEnabled": "1",
            "isRTL": ""
        };
        (function () {
            function isTouchDevice() {
                return (('ontouchstart' in window) ||
                    (navigator.MaxTouchPoints > 0) ||
                    (navigator.msMaxTouchPoints > 0));
            }

            window.gemSettings.isTouch = isTouchDevice();

            function userAgentDetection() {
                var ua = navigator.userAgent.toLowerCase(),
                    platform = navigator.platform.toLowerCase(),
                    UA = ua.match(
                        /(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/
                        ) || [null, 'unknown', 0],
                    mode = UA[1] == 'ie' && document.documentMode;

                window.gemBrowser = {
                    name: (UA[1] == 'version') ? UA[3] : UA[1],
                    version: UA[2],
                    platform: {
                        name: ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform
                            .match(/mac|win|linux/) || ['other'])[0]
                    }
                };
            }

            window.updateGemClientSize = function () {
                if (window.gemOptions == null || window.gemOptions == undefined) {
                    window.gemOptions = {
                        first: false,
                        clientWidth: 0,
                        clientHeight: 0,
                        innerWidth: -1
                    };
                }

                window.gemOptions.clientWidth = window.innerWidth || document.documentElement.clientWidth;
                if (document.body != null && !window.gemOptions.clientWidth) {
                    window.gemOptions.clientWidth = document.body.clientWidth;
                }

                window.gemOptions.clientHeight = window.innerHeight || document.documentElement.clientHeight;
                if (document.body != null && !window.gemOptions.clientHeight) {
                    window.gemOptions.clientHeight = document.body.clientHeight;
                }
            };

            window.updateGemInnerSize = function (width) {
                window.gemOptions.innerWidth = width != undefined ? width : (document.body != null ? document
                    .body.clientWidth : 0);
            };

            userAgentDetection();
            window.updateGemClientSize(true);

            window.gemSettings.lasyDisabled = window.gemSettings.forcedLasyDisabled || (!window.gemSettings
                .mobileEffectsEnabled && (window.gemSettings.isTouch || window.gemOptions.clientWidth <= 800));
        })();
        (function () {
            if (window.gemBrowser.name == 'safari') {
                try {
                    var safariVersion = parseInt(window.gemBrowser.version);
                } catch (e) {
                    var safariVersion = 0;
                }
                if (safariVersion >= 9) {
                    window.gemSettings.parallaxDisabled = true;
                    window.gemSettings.fillTopArea = true;
                }
            }
        })();
        (function () {
            var fullwithData = {
                page: null,
                pageWidth: 0,
                pageOffset: {},
                fixVcRow: true,
                pagePaddingLeft: 0
            };

            function updateFullwidthData() {
                fullwithData.pageOffset = fullwithData.page.getBoundingClientRect();
                fullwithData.pageWidth = parseFloat(fullwithData.pageOffset.width);
                fullwithData.pagePaddingLeft = 0;

                if (fullwithData.page.className.indexOf('vertical-header') != -1) {
                    fullwithData.pagePaddingLeft = 45;
                    if (fullwithData.pageWidth >= 1600) {
                        fullwithData.pagePaddingLeft = 360;
                    }
                    if (fullwithData.pageWidth < 980) {
                        fullwithData.pagePaddingLeft = 0;
                    }
                }
            }

            function gem_fix_fullwidth_position(element) {
                if (element == null) {
                    return false;
                }

                if (fullwithData.page == null) {
                    fullwithData.page = document.getElementById('page');
                    updateFullwidthData();
                }

                /*if (fullwithData.pageWidth < 1170) {
                    return false;
                }*/

                if (!fullwithData.fixVcRow) {
                    return false;
                }

                if (element.previousElementSibling != null && element.previousElementSibling != undefined && element
                    .previousElementSibling.className.indexOf('fullwidth-block') == -1) {
                    var elementParentViewportOffset = element.previousElementSibling.getBoundingClientRect();
                } else {
                    var elementParentViewportOffset = element.parentNode.getBoundingClientRect();
                }

                /*if (elementParentViewportOffset.top > window.gemOptions.clientHeight) {
                    fullwithData.fixVcRow = false;
                    return false;
                }*/

                if (element.className.indexOf('vc_row') != -1) {
                    var elementMarginLeft = -21;
                    var elementMarginRight = -21;
                } else {
                    var elementMarginLeft = 0;
                    var elementMarginRight = 0;
                }

                var offset = parseInt(fullwithData.pageOffset.left + 0.5) - parseInt((elementParentViewportOffset
                        .left < 0 ? 0 : elementParentViewportOffset.left) + 0.5) - elementMarginLeft + fullwithData
                    .pagePaddingLeft;
                var offsetKey = window.gemSettings.isRTL ? 'right' : 'left';

                element.style.position = 'relative';
                element.style[offsetKey] = offset + 'px';
                element.style.width = fullwithData.pageWidth - fullwithData.pagePaddingLeft + 'px';

                if (element.className.indexOf('vc_row') == -1) {
                    element.setAttribute('data-fullwidth-updated', 1);
                }

                if (element.className.indexOf('vc_row') != -1 && element.className.indexOf('vc_section') == -1 && !
                    element.hasAttribute('data-vc-stretch-content')) {
                    var el_full = element.parentNode.querySelector('.vc_row-full-width-before');
                    var padding = -1 * offset;
                    0 > padding && (padding = 0);
                    var paddingRight = fullwithData.pageWidth - padding - el_full.offsetWidth + elementMarginLeft +
                        elementMarginRight;
                    0 > paddingRight && (paddingRight = 0);
                    element.style.paddingLeft = padding + 'px';
                    element.style.paddingRight = paddingRight + 'px';
                }
            }

            window.gem_fix_fullwidth_position = gem_fix_fullwidth_position;

            document.addEventListener('DOMContentLoaded', function () {
                var classes = [];

                if (window.gemSettings.isTouch) {
                    document.body.classList.add('thegem-touch');
                }

                if (window.gemSettings.lasyDisabled && !window.gemSettings.forcedLasyDisabled) {
                    document.body.classList.add('thegem-effects-disabled');
                }
            });

            if (window.gemSettings.parallaxDisabled) {
                var head = document.getElementsByTagName('head')[0],
                    link = document.createElement('style');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.innerHTML =
                    ".fullwidth-block.fullwidth-block-parallax-fixed .fullwidth-block-background { background-attachment: scroll !important; }";
                head.appendChild(link);
            }
        })();

        (function () {
            setTimeout(function () {
                var preloader = document.getElementById('page-preloader');
                if (preloader != null && preloader != undefined) {
                    preloader.className += ' preloader-loaded';
                }
            }, window.pagePreloaderHideTime || 1000);
        })();