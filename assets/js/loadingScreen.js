window.addEventListener("load", function () {
    const loadingScreen = document.getElementById("loading-screen");
    const body = document.body;

    // Hide loading screen when the page is fully loaded
    loadingScreen.style.opacity = 0;
    body.classList.add("loaded");

    // Remove loading screen from the DOM
    setTimeout(function () {
        loadingScreen.style.display = "none";
    }, 2000); // Adjust the delay as needed
});