function fillPage(city, mode) {
    document.getElementById('content').innerHTML =
        '<h1 class="title">' + getTitle(city) + '</h1>\n' +
        '<h2 class="subtitle">' + getSubtitle(city) + '</h2>' +
        '<p>' + getText(city) + '</p>\n' + getIframe(mode, city);
    if (mode === "2") {
        startJotForm();
    }
}

fillPage(currentDetail[0], currentDetail[1]);

function getTitle(city) {
    let title = "";
    if (city === tr) {
        title = ist_h1;
    } else if (city === uk) {
        title = liverpool_h1;
    } else if (city === nor) {
        title = oslo_h1;
    } else if (city === eu) {
        title = eu_h1;
    } else if (city === silicon) {
        title = silicon_h1;
    }
    return title;
}

function getSubtitle(city) {
    let subtitle = "";
    if (city === tr) {
        subtitle = ist_sub;
    }
    return subtitle;
}

function getText(city) {
    let text = "";
    if (city === tr) {
        text = ist_text;
    } else if (city == silicon) {
        text = silicon_h2;
    }
    return text;
}

function getIframe(mode, city) {
    let frame = "";
    if (city === tr) {
        if (mode === "0") {
            frame = ist_data_view_frame;
        }
        if (mode === "1") {
            frame = '<div class="rush-grid"><div class="chart-box">' + ist_rush_frame_chart + '</div>' +
                '<div class="quiz-box">' + ist_rush_frame_quiz + '</div>\n</div>';
        }
        if (mode === "2") {
            frame = ist_vocab_frame;
        }
    }
    return frame;
}

function startJotForm() {
    var ifr = document.getElementById("JotFormIFrame-201402082424036");
    if (window.location.href && window.location.href.indexOf("?") > -1) {
        var get = window.location.href.substr(window.location.href.indexOf("?") + 1);
        if (ifr && get.length > 0) {
            var src = ifr.src;
            src = src.indexOf("?") > -1 ? src + "&" + get : src + "?" + get, ifr.src = src
        }
    }
    window.handleIFrameMessage = function(e) {
        if ("object" != typeof e.data) {
            var n = e.data.split(":");
            if (n.length > 2 ? iframe = document.getElementById("JotFormIFrame-" + n[n.length - 1]) : iframe = document.getElementById("JotFormIFrame"), iframe) {
                switch (n[0]) {
                    case "scrollIntoView":
                        iframe.scrollIntoView();
                        break;
                    case "setHeight":
                        iframe.style.height = n[1] + "px";
                        break;
                    case "collapseErrorPage":
                        iframe.clientHeight > window.innerHeight && (iframe.style.height = window.innerHeight + "px");
                        break;
                    case "reloadPage":
                        window.location.reload();
                        break;
                    case "loadScript":
                        var t = n[1];
                        n.length > 3 && (t = n[1] + ":" + n[2]);
                        var o = document.createElement("script");
                        o.src = t, o.type = "text/javascript", document.body.appendChild(o);
                        break;
                    case "exitFullscreen":
                        window.document.exitFullscreen ? window.document.exitFullscreen() : window.document.mozCancelFullScreen ? window.document.mozCancelFullScreen() : window.document.mozCancelFullscreen ? window.document.mozCancelFullScreen() : window.document.webkitExitFullscreen ? window.document.webkitExitFullscreen() : window.document.msExitFullscreen && window.document.msExitFullscreen()
                }
                if (e.origin.indexOf("jotform") > -1 && "contentWindow" in iframe && "postMessage" in iframe.contentWindow) {
                    var i = { docurl: encodeURIComponent(document.URL), referrer: encodeURIComponent(document.referrer) };
                    iframe.contentWindow.postMessage(JSON.stringify({ type: "urls", value: i }), "*")
                }
            }
        }
    }, window.addEventListener ? window.addEventListener("message", handleIFrameMessage, !1) : window.attachEvent && window.attachEvent("onmessage", handleIFrameMessage);
}