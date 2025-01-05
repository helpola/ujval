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
        const headers = rows[0];
        const body = rows.slice(1);

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
                    <p><strong>Current Price:</strong> ${stockData[1]}</p>
                    <p><strong>Start Price:</strong> ${stockData[2]}</p>
                    <p><strong>End Price:</strong> ${stockData[3]}</p>
                    <p><strong>CAGR:</strong> ${stockData[4]}</p>
                    <p><strong>52 Week High:</strong> ${stockData[5]}</p>
                    <p><strong>52 Week Low:</strong> ${stockData[6]}</p>
                    <p><strong>Market Cap:</strong> ${stockData[7]}</p>
                    <p><strong>EPS:</strong> ${stockData[8]}</p>
                    <p><strong>Intrinsic Value:</strong> ${stockData[10]}</p>
                    <p><strong>Stock Value:</strong> ${stockData[11]}</p>
                `;
            }
        });

        // Filters
        undervaluedButton.addEventListener("click", () => filterStocks(body, "under"));
        overvaluedButton.addEventListener("click", () => filterStocks(body, "over"));
    })
    .catch(error => console.error("Error fetching data:", error));

// Filter stocks
function filterStocks(body, valueType) {
    clickSound.play();
    const stockList = body.filter(stock => stock[11].toLowerCase().includes(valueType));
    filteredStockList.innerHTML = `<h3>${valueType === "under" ? "Under Valued Stocks" : "Over Valued Stocks"}</h3>`;
    stockList.forEach(stock => {
        filteredStockList.innerHTML += `
            <div>
                <p><strong>${stock[0]}</strong></p>
                <p>Current Price: ${stock[1]}</p>
                <p>PE Ratio: ${stock[8]}</p>
            </div>
        `;
    });
}
