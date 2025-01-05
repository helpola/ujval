const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSG2ohk3hAg5oHhi3RSeydX17ZiYYOVBKqzMEx6Ag-8yO6gJO2IeyZ8EmreIG3ROeJyRTD95TqOSU3U/pub?output=csv";

const stockDropdown = document.getElementById("stockDropdown");
const stockDetails = document.getElementById("stockDetails");
const undervaluedButton = document.getElementById("undervaluedButton");
const overvaluedButton = document.getElementById("overvaluedButton");
const filteredStockList = document.getElementById("filteredStockList");
const clickSound = document.getElementById("clickSound");

// Fetch and process data
fetch(SHEET_URL)
    .then(response => response.text())
    .then(data => {
        const rows = data.split("\n").map(row => row.split(","));
        const headers = rows[0]; // Column titles from the sheet
        const body = rows.slice(1); // All stock data

        // Populate dropdown
        body.forEach(row => {
            const option = document.createElement("option");
            option.value = row[0]; // Stock name
            option.textContent = row[0];
            stockDropdown.appendChild(option);
        });

        // Display stock details
        stockDropdown.addEventListener("change", () => {
            const selectedStock = stockDropdown.value;
            clickSound.play();
            const stockData = body.find(row => row[0] === selectedStock);

            if (stockData) {
                stockDetails.innerHTML = `
                    <h2>${selectedStock}</h2>
                    <p><strong>Listing Date:</strong> ${stockData[1]}</p>
                    <p><strong>Current Price:</strong> ${stockData[2]}</p>
                    <p><strong>Start Price:</strong> ${stockData[3]}</p>
                    <p><strong>End Price:</strong> ${stockData[4]}</p>
                    <p><strong>CAGR (Growth Rate):</strong> ${stockData[5]}</p>
                    <p><strong>52 Week High:</strong> ${stockData[6]}</p>
                    <p><strong>52 Week Low:</strong> ${stockData[7]}</p>
                    <p><strong>Market Cap:</strong> ${stockData[8]}</p>
                    <p><strong>EPS (Earnings Per Share):</strong> ${stockData[9]}</p>
                    <p><strong>PE Ratio:</strong> ${stockData[10]}</p>
                    <p><strong>Intrinsic Value:</strong> ${stockData[11]}</p>
                    <p><strong>Stock Value:</strong> ${stockData[12]}</p>
                `;
            }
        });

        // Filter stocks by valuation
        undervaluedButton.addEventListener("click", () => filterStocks(body, "under"));
        overvaluedButton.addEventListener("click", () => filterStocks(body, "over"));
    })
    .catch(error => console.error("Error fetching data:", error));

// Filter stocks based on valuation
function filterStocks(body, valueType) {
    clickSound.play();
    const filteredStocks = body.filter(row => row[12]?.toLowerCase().includes(valueType)); // 'Stock Value' column
    filteredStockList.innerHTML = `
        <h3>${valueType === "under" ? "Under Valued Stocks" : "Over Valued Stocks"}</h3>
        <div>
            ${filteredStocks
                .map(stock => `
                    <div class="stock-item">
                        <p><strong>${stock[0]}</strong></p>
                        <p>Current Price: ${stock[2]}</p>
                        <p>PE Ratio: ${stock[10]}</p>
                        <p>Market Cap: ${stock[8]}</p>
                        <p>52 Week High: ${stock[6]}</p>
                        <p>52 Week Low: ${stock[7]}</p>
                    </div>
                `)
                .join("")}
        </div>
    `;
}
