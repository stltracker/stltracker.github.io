function loaded() {
    $.get("https://celestrak.com/pub/satcat.txt", function (data) {
        $(".result").html(data);
        alert("Load was performed.");
    });
}