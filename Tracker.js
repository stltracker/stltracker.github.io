function loaded() {
    $.get("https://celestrak.com/pub/noaa.txt", function (data) {
        $(".result").html(data);
        alert("Load was performed.");
    });
}