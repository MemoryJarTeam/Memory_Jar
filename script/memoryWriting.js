const weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
date = new Date();
year = date.getFullYear();
month = date.getMonth() + 1;
day = date.getDate();
week = weekday[date.getDay()];
document.getElementById("todayDate").innerHTML = year + "." + month + "." + day + '.' + week;

