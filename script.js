const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSG2ohk3hAg5oHhi3RSeydX17ZiYYOVBKqzMEx6Ag-8yO6gJO2IeyZ8EmreIG3ROeJyRTD95TqOSU3U/pub?output=csv";

document.addEventListener("DOMContentLoaded", () => {
    const filterDropdown = document.getElementById("filterDropdown");
    const tableHeader = document.getElementById("tableHeader");
    const tbody = document.querySelector("#dataTable tbody");
    const popup = document.getElementById("popup");
    const popupDetails = document.getElementById("popupDetails");
    const closeButton = document.querySelector(".close-button");

    // Fetch and process CSV data
    fetch(SHEET_URL)
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").map(row => row.split(","));
            const header = rows[0];
            const body = rows.slice(1);

            // Populate dropdown filter and render table header
            header.forEach((column, index) => {
                if (column === "SYMBOL" || column === "Exchange & Symbol") return;

                const option = document.createElement("option");
                option.value = index;
                option.textContent = column;
                filterDropdown.appendChild(option);

                const th = document.createElement("th");
                th.textContent = column;
                tableHeader.appendChild(th);
            });

            // Render table body
            body.forEach(row => {
                const tr = document.createElement("tr");
                row.forEach((cell, index) => {
                    if (header[index] === "SYMBOL" || header[index] === "Exchange & Symbol") return;

                    const td = document.createElement("td");
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);

                // Add click event for popup
                tr.addEventListener("click", () => {
                    popupDetails.innerHTML = row
                        .map((cell, index) => `<p><strong>${header[index]}:</strong> ${cell}</p>`)
                        .join("");
                    popup.classList.remove("hidden");
                });
            });
        })
        .catch(error => console.error("Error fetching data:", error));

    // Filter functionality
    filterDropdown.addEventListener("change", () => {
        const filterIndex = filterDropdown.value === "all" ? -1 : parseInt(filterDropdown.value);
        const rows = tbody.getElementsByTagName("tr");

        Array.from(rows).forEach(row => {
            const cells = row.getElementsByTagName("td");
            if (filterIndex === -1 || cells[filterIndex]?.textContent) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });

    // Close popup
    closeButton.addEventListener("click", () => {
        popup.classList.add("hidden");
    });
});
