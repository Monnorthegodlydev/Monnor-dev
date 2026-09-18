document.addEventListener("DOMContentLoaded", function () {
    // Get the page parameter from the URL or set default to 'Home'
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page") || "Home";

    // Define a function to load content based on the page parameter
    function loadContent(page) {
        const contentElement = document.getElementById("content");

        // Check if the page parameter is 'error'
        if (page === "error") {
            // Redirect to a different page
            window.location.href = "https://www.moahub.org";
            return; // Stop further execution
        }
        if (page == "weather") {
            window.location.href = "https://www.moahub.org/weather.html";
            return;
        }

        // Fetch the HTML content of the specified page from the parent directory
        fetch(`../${page}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${page}. Status: ${response.status}`);
                }
                return response.text();
            })
            .then(htmlContent => {
                // Set the fetched HTML content in the designated element
                contentElement.innerHTML = htmlContent;
            })
            .catch(error => {
                // Handle errors (e.g., page not found)
                contentElement.innerHTML = `<h1>Moahub</h1>`;
                console.error(error.message)
            });
    }

    // Load content based on the page parameter or redirect if 'error'
    loadContent(page);
});
