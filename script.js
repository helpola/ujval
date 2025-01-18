function populateDropdown(stocks) {
    const stockSelector = document.getElementById("stockSelector");
    stockSelector.innerHTML = '<option value="">Select a Stock</option>'; // Clear previous options

    // Populate dropdown with unique stock symbols
    const uniqueSymbols = [...new Set(stocks.map(stock => stock["SYMBOL"]))];
    uniqueSymbols.forEach(symbol => {
        const option = document.createElement("option");
        option.value = symbol;
        option.textContent = symbol;
        stockSelector.appendChild(option);
    });

    // Add event listener for dropdown
    stockSelector.addEventListener("change", (event) => {
        const selectedStock = stocks.filter(stock => stock["SYMBOL"] === event.target.value);
        displayStockDetails(selectedStock);
    });
}

function displayStockDetails(stocks) {
    const tbody = document.querySelector("#stockTable tbody");
    tbody.innerHTML = "";

    stocks.forEach(stock => {
        const currentPrice = parseFloat(stock["Current Price"]);
        const intrinsicValue = parseFloat(stock["Intrinsic Value"]);
        const stockValue = intrinsicValue > currentPrice ? "Under Valued" : "Over Valued";
        stock["Stock Value"] = stockValue;

        const row = document.createElement("tr");
        const fields = [
            "SYMBOL", "Exchange & Symbol", "NAME OF COMPANY", "Listing Date", "Current Price", "Start Price", "End Price", "CAGR",
            "52 Week High", "52 Week Low", "Market Cap", "EPS", "PE", "Intrinsic Value", "Stock Value"
        ];
        fields.forEach(field => {
            const cell = document.createElement("td");
            let value = stock[field] || "No Data";

            if (field === "SYMBOL" || field === "Exchange & Symbol" || field === "Listing Date") {
                cell.classList.add("hidden-column");
            }

            cell.textContent = value;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}

function filterStocks(stocks, valueType) {
    return stocks.filter(stock => stock["Stock Value"] === valueType);
}

function searchStocks(stocks, query) {
    return stocks.filter(stock => {
        const symbol = stock["SYMBOL"] ? stock["SYMBOL"].toLowerCase() : "";
        const companyName = stock["NAME OF COMPANY"] ? stock["NAME OF COMPANY"].toLowerCase() : "";
        return symbol.includes(query.toLowerCase()) || companyName.includes(query.toLowerCase());
    });
}

document.getElementById("homeButton").addEventListener("click", () => {
    window.location.reload();
});

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
        const underValuedStocks = filterStocks(stocks, "Under Valued");
        displayStockDetails(underValuedStocks);
    });

    document.getElementById("overValuedButton").addEventListener("click", () => {
        const overValuedStocks = filterStocks(stocks, "Over Valued");
        displayStockDetails(overValuedStocks);
    });

    document.getElementById("searchInput").addEventListener("input", (event) => {
        const query = event.target.value;
        const filteredStocks = searchStocks(stocks, query);
        displayStockDetails(filteredStocks);
    });
}

init();
