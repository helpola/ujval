document.addEventListener('DOMContentLoaded', function () {
    // Fetch daily financial news
    fetchFinancialNews();

    // Fetch daily stock updates
    fetchStockUpdates();
});

// Fetch financial news data from an API
function fetchFinancialNews() {
    const newsContainer = document.getElementById('news-container');
    
    fetch('https://newsapi.org/v2/everything?q=finance&apiKey=YOUR_FINNHUB_API_KEY')
        .then(response => response.json())
        .then(data => {
            const articles = data.articles.slice(0, 5); // Get first 5 articles
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
