(function(w, d) {
    var siteId = "37780";
    var targetElement =
        d.getElementsByTagName("head")[0] || d.getElementsByTagName("body")[0];
    var s = d.createElement("script");
    s.src = "//cdn.adpushup.com/" + siteId + "/adpushup.js";
    s.crossOrigin = "anonymous";
    s.type = "text/javascript";
    s.async = true;
    targetElement.appendChild(s);

    function sendErrorLog(log) {
        var eventName = "script_error";
        log.siteId = siteId;
        var data = btoa(JSON.stringify(log));
        var img = document.createElement("img");
        img.src =
            "https://aplogger.adpushup.com/log?event=HC_" + eventName + "&data=" + data;
    }
    var searchParams =
        typeof URLSearchParams === "function" &&
        new URLSearchParams(window.location.search);
    if (searchParams) {
        var isDebugModeOn = searchParams.has("apDebug");
    }
    w.addEventListener("error", function(event) {
        try {
            var filename = event.filename || "";
            if (filename.indexOf("/" + siteId + "/adpushup.js") === -1) {
                return;
            }
            var error = event.error;
            if (error) {
                var message = error.message;
                var stack = error.stack;
            }
            message = message || event.message;
            var log = {
                message: message,
                stack: stack || "",
                timestamp: Math.floor(event.timeStamp),
                type: "uncaughterror",
            };
            sendErrorLog(log);
            !isDebugModeOn && event.preventDefault();
        } catch (error) {}
    });
    w.addEventListener("unhandledrejection", function(event) {
        var reason = event.reason;
        if (typeof reason === "object") reason = JSON.stringify(reason);
        var log = {
            message: reason || "no reason found",
            timestamp: Math.floor(event.timeStamp),
            type: "unhandledrejection",
        };
        sendErrorLog(log);
        !isDebugModeOn && event.preventDefault();
    });
    var ga = d.createElement("script");
    ga.src = "https://www.googletagmanager.com/gtag/js?id=G-Z0TZ7TDHS1";
    ga.type = "text/javascript";
    ga.async = true;
    targetElement.appendChild(ga);
    w.dataLayer = window.dataLayer || [];
    w.gtag = function() {
        window.dataLayer.push(arguments);
    };
    w.gtag("js", new Date());
    w.gtag("config", "G-Z0TZ7TDHS1", {
        custom_map: {
            dimension1: "siteid"
        },
    });
    w.gtag("event", "script-call", {
        send_to: "G-Z0TZ7TDHS1",
        siteid: siteId,
    });
    s.onerror = function(msg) {
        w.gtag("event", "ad-block", {
            send_to: "G-Z0TZ7TDHS1",
            siteid: siteId,
        });
    };
})(window, document);