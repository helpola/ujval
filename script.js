// Link to your Google Sheet's CSV export
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSG2ohk3hAg5oHhi3RSeydX17ZiYYOVBKqzMEx6Ag-8yO6gJO2IeyZ8EmreIG3ROeJyRTD95TqOSU3U/pub?output=csv";

// Fetch and display data from the Google Sheet
fetch(SHEET_URL)
    .then(response => response.text())
    .then(data => {
        const rows = data.split("\n").map(row => row.split(","));
        const header = rows[0];
        const body = rows.slice(1);

        // Render header
        const headerRow = document.getElementById("tableHeader");
        header.forEach(column => {
            const th = document.createElement("th");
            th.textContent = column;
            headerRow.appendChild(th);
        });

        // Render body
        const tbody = document.querySelector("#dataTable tbody");
        body.forEach(row => {
            const tr = document.createElement("tr");
            row.forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        // Add filter functionality
        const filterInput = document.getElementById("filterInput");
        filterInput.addEventListener("keyup", () => {
            const filterValue = filterInput.value.toLowerCase();
            const rows = tbody.getElementsByTagName("tr");

            Array.from(rows).forEach(row => {
                const cells = row.getElementsByTagName("td");
                const rowText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(" ");
                row.style.display = rowText.includes(filterValue) ? "" : "none";
            });
        });
    })
    .catch(error => console.error("Error fetching data:", error));
