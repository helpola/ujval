function formatMarketCap(value) {
    const number = parseFloat(value.replace(/,/g, ""));
    if (isNaN(number)) return "No Data";
    return (number / 10000000).toFixed(2) + " Cr";
}

function generateTradingViewLink(symbol) {
    const baseUrl = "https://www.tradingview.com/symbols/";
    return `${baseUrl}${symbol}`;
}

function populateDropdown(stocks) {
    const stockSelector = document.getElementById("stockSelector");
    stockSelector.innerHTML = '<option value="">Select a Stock</option>';

    const uniqueSymbols = [...new Set(stocks.map(stock => stock["SYMBOL"]))];
    uniqueSymbols.forEach(symbol => {
        const option = document.createElement("option");
        option.value = symbol;
        option.textContent = symbol;
        stockSelector.appendChild(option);
    });

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
            } else if (field === "Market Cap") {
                value = formatMarketCap(value);
            }

            cell.textContent = value;
            row.appendChild(cell);
        });

        // Add Trading View Link
        const tradingCell = document.createElement("td");
        const tradingLink = document.createElement("a");
        tradingLink.href = generateTradingViewLink(stock["SYMBOL"]);
        tradingLink.textContent = "View";
        tradingLink.target = "_blank";
        tradingLink.style.color = "#f39c12";
        tradingLink.style.textDecoration = "none";
        tradingCell.appendChild(tradingLink);
        row.appendChild(tradingCell);

        tbody.appendChild(row);
    });
}

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
        const underValuedStocks = stocks.filter(stock => stock["Stock Value"] === "Under Valued");
        displayStockDetails(underValuedStocks);
    });

    document.getElementById("overValuedButton").addEventListener("click", () => {
        const overValuedStocks = stocks.filter(stock => stock["Stock Value"] === "Over Valued");
        displayStockDetails(overValuedStocks);
    });

    document.getElementById("searchInput").addEventListener("input", (event) => {
        const query = event.target.value.toLowerCase();
        const filteredStocks = stocks.filter(stock => {
            return (stock["SYMBOL"] && stock["SYMBOL"].toLowerCase().includes(query)) ||
                   (stock["NAME OF COMPANY"] && stock["NAME OF COMPANY"].toLowerCase().includes(query));
        });
        displayStockDetails(filteredStocks);
    });
}

init();
