function reqListener() {
    alert("Load was performed.");
}

function loaded() {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "https://celestrak.com/pub/goes.txt");
    oReq.send();
}