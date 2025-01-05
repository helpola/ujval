const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSG2ohk3hAg5oHhi3RSeydX17ZiYYOVBKqzMEx6Ag-8yO6gJO2IeyZ8EmreIG3ROeJyRTD95TqOSU3U/pub?output=csv";

// Fetch and process Google Sheet data
fetch(SHEET_URL)
    .then(response => response.text())
    .then(data => {
        const rows = data.split("\n").map(row => row.split(","));
        const headers = rows[0];
        const body = rows.slice(1);

        // Populate dropdown and headers
        const headingFilter = document.getElementById("headingFilter");
        const tableHeader = document.getElementById("tableHeader");
        headers.forEach((header, index) => {
            const th = document.createElement("th");
            th.textContent = header;
            tableHeader.appendChild(th);

            if (index > 1) { // Add to dropdown except first two
                const option = document.createElement("option");
                option.value = header;
                option.textContent = header;
                headingFilter.appendChild(option);
            }
        });

        // Populate table rows
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
        headingFilter.addEventListener("change", () => filterData(headers, body));
        document.getElementById("valuationFilter").addEventListener("change", () => filterValuation(headers, body));
    })
    .catch(error => console.error("Error fetching data:", error));

// Filter by heading
function filterData(headers, body) {
    const headingFilter = document.getElementById("headingFilter").value;
    const tbody = document.querySelector("#dataTable tbody");
    tbody.innerHTML = ""; // Clear table

    const index = headers.indexOf(headingFilter);
    body.forEach(row => {
        const tr = document.createElement("tr");
        row.forEach((cell, i) => {
            if (index === -1 || i === index || index === 0) {
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            }
        });
        tbody.appendChild(tr);
    });
}

// Filter overvalued/undervalued
function filterValuation(headers, body) {
    const valuationFilter = document.getElementById("valuationFilter").value;
    const valueIndex = headers.indexOf("Valuation"); // Assuming "Valuation" exists
    const tbody = document.querySelector("#dataTable tbody");
    tbody.innerHTML = ""; // Clear table

    body.forEach(row => {
        if (valuationFilter === "all" || row[valueIndex].toLowerCase().includes(valuationFilter)) {
            const tr = document.createElement("tr");
            row.forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        }
    });
}
