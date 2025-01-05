const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSG2ohk3hAg5oHhi3RSeydX17ZiYYOVBKqzMEx6Ag-8yO6gJO2IeyZ8EmreIG3ROeJyRTD95TqOSU3U/pub?output=csv";

// Fetch and display data from Google Sheet
fetch(SHEET_URL)
    .then(response => response.text())
    .then(data => {
        const rows = data.split("\n").map(row => row.split(","));
        const headers = rows[0];
        const body = rows.slice(1);

        // Remove unwanted columns (Symbol and Exchange & Symbol)
        const filteredHeaders = headers.filter((header, index) => index > 1);
        const filteredBody = body.map(row => row.filter((_, index) => index > 1));

        // Populate Table Headers
        const headerRow = document.getElementById("tableHeader");
        filteredHeaders.forEach(column => {
            const th = document.createElement("th");
            th.textContent = column;
            headerRow.appendChild(th);
        });

        // Populate Table Body
        const tbody = document.querySelector("#dataTable tbody");
        filteredBody.forEach(row => {
            const tr = document.createElement("tr");
            row.forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            tr.addEventListener("click", () => openModal(row));
            tbody.appendChild(tr);
        });

        // Populate Filter Dropdown
        const filterDropdown = document.getElementById("filterDropdown");
        filteredHeaders.forEach(column => {
            const option = document.createElement("option");
            option.value = column;
            option.textContent = column;
            filterDropdown.appendChild(option);
        });

        filterDropdown.addEventListener("change", () => {
            const selectedHeader = filterDropdown.value;
            const headerIndex = filteredHeaders.indexOf(selectedHeader);
            const rows = tbody.getElementsByTagName("tr");

            Array.from(rows).forEach(row => {
                const cells = row.getElementsByTagName("td");
                const cellValue = cells[headerIndex]?.textContent || "";
                row.style.display =
                    selectedHeader === "all" || cellValue
                        ? ""
                        : "none";
            });
        });
    })
    .catch(error => console.error("Error fetching data:", error));

// Modal functionality
const modal = document.getElementById("stockModal");
const modalContent = document.getElementById("stockDetails");
const closeBtn = document.querySelector(".close-btn");

function openModal(stockDetails) {
    modalContent.innerHTML = `<p>${stockDetails.join("<br>")}</p>`;
    modal.style.display = "block";
}

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", event => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
