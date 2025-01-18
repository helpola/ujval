async function init() {
    const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSG2ohk3hAg5oHhi3RSeydX17ZiYYOVBKqzMEx6Ag-8yO6gJO2IeyZ8EmreIG3ROeJyRTD95TqOSU3U/pub?output=csv";
    const response = await fetch(csvUrl);
    const data = await response.text();
    const rows = data.split("\n").map(row => row.split(","));
    const headers = rows[0];
    const stocks = rows.slice(1).map(row => {
        const stock = {};
        row.forEach((value, index) => {
            stock[headers[index]] = value.trim();
        });
        return stock;
    });

    populateDropdown(stocks);
    displayStockDetails(stocks);

    document.getElementById("underValuedButton").addEventListener("click", () => {
        const underValuedStocks = stocks.filter(stock => {
            const currentPrice = parseFloat(stock["Current Price"]);
            const intrinsicValue = parseFloat(stock["Intrinsic Value"]);
            return intrinsicValue > currentPrice;
        });
        displayStockDetails(underValuedStocks);
    });

    document.getElementById("overValuedButton").addEventListener("click", () => {
        const overValuedStocks = stocks.filter(stock => {
            const currentPrice = parseFloat(stock["Current Price"]);
            const intrinsicValue = parseFloat(stock["Intrinsic Value"]);
            return intrinsicValue <= currentPrice;
        });
        displayStockDetails(overValuedStocks);
    });

    document.getElementById("searchInput").addEventListener("input", (event) => {
        const query = event.target.value.toLowerCase();
        const filteredStocks = stocks.filter(stock =>
            (stock["SYMBOL"] || "").toLowerCase().includes(query) ||
            (stock["NAME OF COMPANY"] || "").toLowerCase().includes(query)
        );
        displayStockDetails(filteredStocks);
    });
}

function populateDropdown(stocks) {
    const stockSelector = document.getElementById("stockSelector");
    stockSelector.innerHTML = '<option value="">Select a Stock</option>';
    stocks.forEach(stock => {
        const option = document.createElement("option");
        option.value = stock["SYMBOL"];
        option.textContent = stock["SYMBOL"];
        stockSelector.appendChild(option);
    });

    stockSelector.addEventListener("change", (event) => {
        const symbol = event.target.value;
        const filteredStocks = stocks.filter(stock => stock["SYMBOL"] === symbol);
        displayStockDetails(filteredStocks);
    });
}

function displayStockDetails(stocks) {
    const tbody = document.querySelector("#stockTable tbody");
    tbody.innerHTML = "";
    stocks.forEach(stock => {
        const row = document.createElement("tr");
        Object.entries(stock).forEach(([key, value]) => {
            const cell = document.createElement("td");
            cell.textContent = value || "N/A";
            if (["SYMBOL", "Exchange & Symbol", "Listing Date"].includes(key)) {
                cell.classList.add("hidden-column");
            }
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}

init();
