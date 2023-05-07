$(function () {
    function c() {
        p();
        var e = h();
        var r = 0;
        var u = false;
        l.empty();
        while (!u) {
            if (s[r] == e[0].weekday) {
                u = true;
            } else {
                l.append('<div class="blank"></div>');
                r++;
            }
        }
        for (var c = 0; c < 42 - r; c++) {
            if (c >= e.length) {
                l.append('<div class="blank"></div>');
            } else {
                var v = e[c].day;
                var m = g(new Date(t, n - 1, v))
                    ? '<div class="today">'
                    : "<div>";
                l.append(m + "" + v + "</div>");
            }
        }
        var y = o[n - 1];
        a.css("background-color", y)
            .find("h1")
            .text(i[n - 1] + " " + t);
        f.find("div").css("color", y);
        l.find(".today").css("background-color", y);
        d();
    }
    function h() {
        var e = [];
        for (var r = 1; r < v(t, n) + 1; r++) {
            e.push({ day: r, weekday: s[m(t, n, r)] });
        }
        return e;
    }
    function p() {
        f.empty();
        for (var e = 0; e < 7; e++) {
            f.append("<div>" + s[e].substring(0, 3) + "</div>");
        }
    }
    function d() {
        var t;
        var n = $("#calendar").css("width", "90%");
        // var n = $("#calendar").css("width", e + "px");
        // here
        if (document.body.offsetWidth < 700) {
            // console.log(document.body.offsetWidth);
            n.find((t = "#calendar_weekdays, #calendar_content"))
                // .css("width", e + "px")
                .css("width", "100%")
                .find("div")
                .css({
                    // width: 11 + "vw",
                    width: "14.26%",
                    height: "11vw",
                    "line-height": 10 + "vw",
                });
            n.find("#calendar_header")
                // .css({ height: e * (1 / 7) + "px" })
                .find('i[class^="icon-chevron"]')
                .css("line-height", e * (1 / 7) + "px");
        } else if (document.body.offsetWidth < 800){
            n = $("#calendar").css("width", "65%");
            n.find((t = "#calendar_weekdays, #calendar_content"))
                // .css("width", e + "px")
                .css("width", "100%")
                .find("div")
                .css({
                    // width: 11 + "vw",
                    width: "14.24%",
                    height: "9.5vw",
                    "line-height": 10 + "vw",
                });
        }else if (document.body.offsetWidth < 900) {
            n = $("#calendar").css("width", "55%");
            n.find((t = "#calendar_weekdays, #calendar_content"))
                // .css("width", e + "px")
                .css("width", "100%")
                .find("div")
                .css({
                    // width: 11 + "vw",
                    width: "14.24%",
                    height: "8vw",
                    "line-height": 8 + "vw",
                });
        } else {
            n = $("#calendar").css("width", "40%");
            n.find((t = "#calendar_weekdays, #calendar_content"))
                // .css("width", e + "px")
                .css("width", "100%")
                .find("div")
                .css({
                    // width: 11 + "vw",
                    width: "14.24%",
                    height: "5.5vw",
                    "line-height": 5.5 + "vw",
                });
        }
    }
    function v(e, t) {
        return new Date(e, t, 0).getDate();
    }
    function m(e, t, n) {
        return new Date(e, t - 1, n).getDay();
    }
    function g(e) {
        return y(new Date()) == y(e);
    }
    function y(e) {
        return e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate();
    }
    function b() {
        var e = new Date();
        t = e.getFullYear();
        n = e.getMonth() + 1;
    }
    var e = 480;
    var t = 2013;
    var n = 9;
    var r = [];
    var i = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
    ];
    var s = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    var o = [
        "#16a085",
        "#1abc9c",
        "#c0392b",
        "#27ae60",
        "#FF6860",
        "#f39c12",
        "#f1c40f",
        "#e67e22",
        "#2ecc71",
        "#e74c3c",
        "#d35400",
        "#2c3e50",
    ];
    var u = $("#calendar");
    var a = u.find("#calendar_header");
    var f = u.find("#calendar_weekdays");
    var l = u.find("#calendar_content");
    b();
    c();
    a.find('i[class^="fa-solid fa-chevron"]').on("click", function () {
        var e = $(this);
        var r = function (e) {
            n = e == "next" ? n + 1 : n - 1;
            if (n < 1) {
                n = 12;
                t--;
            } else if (n > 12) {
                n = 1;
                t++;
            }
            c();
        };
        if (e.attr("class").indexOf("left") != -1) {
            r("previous");
        } else {
            r("next");
        }
    });
});

// if (document.body.offsetWidth > 700) {
//     console.log("0ver 700");
// }
