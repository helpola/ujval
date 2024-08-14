document.addEventListener('DOMContentLoaded', function () {
    // Fetch daily financial news
    fetchFinancialNews();

    // Fetch daily stock updates
    fetchStockUpdates();
});

// Function to switch between pages
function showPage(pageId) {
    const pages = ['home', 'stock-search', 'watchlist'];
    pages.forEach(page => {
        document.getElementById(page).style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

// Fetch financial news data from an API
function fetchFinancialNews() {
    const newsContainer = document.getElementById('news-container');
    
    fetch('https://newsapi.org/v2/everything?q=finance&apiKey=YOUR_NEWS_API_KEY')
        .then(response => response.json())
        .then(data => {
            const articles = data.articles.slice(0, 5); // Get first 5 articles
            newsContainer.innerHTML = '';  // Clear the previous content
            articles.forEach(article => {
                const newsArticle = document.createElement('article');
                newsArticle.innerHTML = `
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                `;
                newsContainer.appendChild(newsArticle);
            });
        })
        .catch(err => console.error('Error fetching news:', err));
}

// Fetch stock market data from an API
function fetchStockUpdates() {
    const stocksContainer = document.getElementById('stocks-container');
    
    fetch('https://finnhub.io/api/v1/quote?symbol=AAPL&token=YOUR_FINNHUB_API_KEY')
        .then(response => response.json())
        .then(data => {
            stocksContainer.innerHTML = '';  // Clear the previous content
            const stockUpdate = document.createElement('article');
            stockUpdate.innerHTML = `
                <h3>Apple Inc. (AAPL)</h3>
                <p>Current Price: $${data.c}</p>
                <p>High Price: $${data.h}</p>
                <p>Low Price: $${data.l}</p>
                <p>Previous Close: $${data.pc}</p>
            `;
            stocksContainer.appendChild(stockUpdate);
        })
        .catch(err => console.error('Error fetching stock data:', err));
}

// Stock search function for the Stock Search page
function searchStock() {
    const symbol = document.getElementById('stock-symbol').value.toUpperCase();
    const resultContainer = document.getElementById('stock-result');
    resultContainer.innerHTML = ''; // Clear previous results

    fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=YOUR_FINNHUB_API_KEY`)
        .then(response => response.json())
        .then(data => {
            const stockResult = document.createElement('article');
            stockResult.innerHTML = `
                <h3>${symbol}</h3>
                <p>Current Price: $${data.c}</p>
                <p>High Price: $${data.h}</p>
                <p>Low Price: $${data.l}</p>
                <p>Previous Close: $${data.pc}</p>
            `;
            resultContainer.appendChild(stockResult);
        })
        .catch(err => {
            resultContainer.innerHTML = `<p>Error fetching data for ${symbol}</p>`;
            console.error('Error fetching stock data:', err);
        });
}
