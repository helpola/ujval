const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSG2ohk3hAg5oHhi3RSeydX17ZiYYOVBKqzMEx6Ag-8yO6gJO2IeyZ8EmreIG3ROeJyRTD95TqOSU3U/pub?output=csv";

const stockDropdown = document.getElementById("stockDropdown");
const stockDetails = document.getElementById("stockDetails");
const undervaluedButton = document.getElementById("undervaluedButton");
const overvaluedButton = document.getElementById("overvaluedButton");
const stockList = document.getElementById("stockList");
const clickSound = document.getElementById("clickSound");

// Fetch and process data
fetch(SHEET_URL)
    .then(response => response.text())
    .then(data => {
        const rows = data.split("\n").map(row => row.split(","));
        const headers = rows[0];
        const body = rows.slice(1);

        // Populate dropdown
        body.forEach(row => {
            const option = document.createElement("option");
            option.value = row[0]; // Stock name
            option.textContent = row[0];
            stockDropdown.appendChild(option);
        });

        // Display stock details on selection
        stockDropdown.addEventListener("change", () => {
            const selectedStock = stockDropdown.value;
            clickSound.play();
            const stockData = body.find(row => row[0] === selectedStock);

            stockDetails.innerHTML = `
                <h2>${stockData[0]}</h2>
                <p><strong>Current Price:</strong> ${stockData[1]}</p>
                <p><strong>Start Price:</strong> ${stockData[2]}</p>
                <p><strong>End Price:</strong> ${stockData[3]}</p>
                <p><strong>CAGR (Growth Rate):</strong> ${stockData[4]}</p>
                <p><strong>52 Week High:</strong> ${stockData[5]}</p>
                <p><strong>52 Week Low:</strong> ${stockData[6]}</p>
                <p><strong>Market Cap:</strong> ${stockData[7]}</p>
                <p><strong>EPS (Earnings per Share):</strong> ${stockData[8]}</p>
                <p><strong>PE Ratio:</strong> ${stockData[9]}</p>
                <p><strong>Intrinsic Value:</strong> ${stockData[10]}</p>
                <p><strong>Stock Value:</strong> ${stockData[11]}</p>
            `;
        });

        // Filter undervalued and overvalued stocks
        undervaluedButton.addEventListener("click", () => filterStocks(body, headers, "undervalued"));
        overvaluedButton.addEventListener("click", () => filterStocks(body, headers, "overvalued"));
    })
    .catch(error => console.error("Error fetching data:", error));

// Filter stocks
function filterStocks(body, headers, type) {
    clickSound.play();
    const valuationIndex = headers.indexOf("Stock Value");
    stockList.innerHTML = `<h3>${type === "undervalued" ? "Under Valued" : "Over Valued"} Stocks</h3>`;
    const filteredStocks = body.filter(row => row[valuationIndex].toLowerCase().includes(type));
    filteredStocks.forEach(stock => {
        const stockItem = document.createElement("p");
        stockItem.textContent = stock[0];
        stockList.appendChild(stockItem);
    });
}
