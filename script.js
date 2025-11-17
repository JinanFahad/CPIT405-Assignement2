
const searchInput = document.getElementById("searchInput");
const searchBtn   = document.getElementById("searchBtn");
const messageP    = document.getElementById("message");
const resultsBody = document.getElementById("resultsBody");

function clearResults() {
    resultsBody.innerHTML = "";
    messageP.textContent = "";
}

function searchUniversities() {
    clearResults();

    const query = searchInput.value.trim();

    if (!query) {
        messageP.textContent = "Please type a university name.";
        return;
    }

    const apiUrl = `http://universities.hipolabs.com/search?name=${encodeURIComponent(query)}`;

    const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;

    console.log("Requesting:", url);

    fetch(url)
        .then(response => {
            console.log("Response status:", response.status);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("Data received:", data);

            if (!Array.isArray(data) || data.length === 0) {
                messageP.textContent = "No universities found.";
                return;
            }

            data.forEach(university => {
                const tr = document.createElement("tr");

                const nameTd = document.createElement("td");
                nameTd.textContent = university.name || "N/A";

                const countryTd = document.createElement("td");
                countryTd.textContent = university.country || "N/A";

                const websiteTd = document.createElement("td");
                if (university.web_pages && university.web_pages.length > 0) {
                    const link = document.createElement("a");
                    link.href = university.web_pages[0];
                    link.textContent = "Visit";
                    link.target = "_blank";
                    websiteTd.appendChild(link);
                } else {
                    websiteTd.textContent = "N/A";
                }

                tr.appendChild(nameTd);
                tr.appendChild(countryTd);
                tr.appendChild(websiteTd);

                resultsBody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error("Fetch error:", error);
            messageP.textContent = "An error occurred. Please try again.";
        });
}

if (searchBtn) {
    searchBtn.addEventListener("click", searchUniversities);
}

if (searchInput) {
    searchInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            searchUniversities();
        }
    });
}
