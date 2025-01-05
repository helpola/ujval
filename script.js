function displayStockDetails(stocks) {
    const tbody = document.querySelector("#stockTable tbody");
    tbody.innerHTML = "";
    stocks.forEach(stock => {
        // Compare Intrinsic Value with Current Price to set Stock Value
        const currentPrice = parseFloat(stock["Current Price"]);
        const intrinsicValue = parseFloat(stock["Intrinsic Value"]);
        const stockValue = intrinsicValue > currentPrice ? "Under Valued" : "Over Valued";
        stock["Stock Value"] = stockValue; // Update Stock Value column

        const row = document.createElement("tr");
        const fields = [
            "SYMBOL", "Exchange & Symbol", "NAME OF COMPANY", "Listing Date", "Current Price", "Start Price", "End Price", "CAGR",
            "52 Week High", "52 Week Low", "Market Cap", "EPS", "PE", "Intrinsic Value", "Stock Value"
        ];
        fields.forEach(field => {
            const cell = document.createElement("td");
            let value = stock[field] || "No Data";
            
            // Remove quotes from Market Cap value
            if (field === "Market Cap") {
                value = value.replace(/^"|"$/g, '');  // Remove quotes around the Market Cap value
            }

            cell.textContent = value;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}
