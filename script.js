document.addEventListener('DOMContentLoaded', function () {
    // Fetch news and stock updates when the page loads
    fetchNews();
    fetchStockUpdates('RELIANCE.BSE');  // Example for Reliance, can be changed
});

// Function to switch between pages
function showPage(pageId) {
    const pages = ['home', 'stock-search', 'watchlist'];
    pages.forEach(page => {
        document.getElementById(page).style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

// Fetch news from NewsAPI
function fetchNews() {
    const newsContainer = document.getElementById('news-container');
    const newsApiKey = 'CSC1R5TS8PCT69OD';  // Replace with your Global News API key
    
    fetch(`https://newsapi.org/v2/top-headlines?category=business&apiKey=${newsApiKey}`)
        .then(response => response.json())
        .then(data => {
            newsContainer.innerHTML = '';  // Clear previous news
            data.articles.forEach(article => {
                const newsArticle = document.createElement('article');
                newsArticle.innerHTML = `
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                `;
                newsContainer.appendChild(newsArticle);
            });
        })
        .catch(err => {
            newsContainer.innerHTML = `<p>Error fetching news. Please try again later.</p>`;
            console.error('Error fetching news:', err);
        });
}

// Fetch stock market updates from Alpha Vantage API
function fetchStockUpdates(symbol) {
    const stocksContainer = document.getElementById('stocks-container');
    const stockApiKey = 'V3YZNMZU2GFD082W';  // Replace with your Alpha Vantage API key
    
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${stockApiKey}`)
        .then(response => response.json())
        .then(data => {
            const timeSeries = data['Time Series (5min)'];
            if (timeSeries) {
                const latestTime = Object.keys(timeSeries)[0];
                const latestData = timeSeries[latestTime];

                const currentPrice = latestData['4. close'];
                const highPrice = latestData['2. high'];
                const lowPrice = latestData['3. low'];
                
                stocksContainer.innerHTML = '';  // Clear previous stock data
                const stockUpdate = document.createElement('article');
                stockUpdate.innerHTML = `
                    <h3>${symbol}</h3>
                    <p>Current Price: ₹${currentPrice}</p>
                    <p>High Price: ₹${highPrice}</p>
                    <p>Low Price: ₹${lowPrice}</p>
                    <p>Last Updated: ${latestTime}</p>
                `;
                stocksContainer.appendChild(stockUpdate);
            } else {
                stocksContainer.innerHTML = `<p>No data found for ${symbol}.</p>`;
            }
        })
        .catch(err => {
            stocksContainer.innerHTML = `<p>Error fetching stock data. Please try again later.</p>`;
            console.error('Error fetching stock data:', err);
        });
}

// Stock search function
function searchStock() {
    const symbol = document.getElementById('stock-symbol').value.toUpperCase() + '.BSE';  // Adjust for NSE
    fetchStockUpdates(symbol);
}
