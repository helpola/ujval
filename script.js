const fetchData = () => {
    // Simulating the data fetch - replace this with your actual fetch call
    // Example API call:
    // fetch('https://web.sensibull.com/fii-dii-data/summary')
    //     .then(response => response.json())
    //     .then(data => updateTable(data))
    //     .catch(err => console.error(err));

    const data = [
        {
            participant: 'FII',
            segment: 'Index Futures',
            bearish: 'Mild Bearish',
            bullish: '',
            netOi: '-30,547',
            change: '-9,311',
            trend: 'bearish'
        },
        {
            participant: 'FII',
            segment: 'Call Options',
            bearish: '',
            bullish: 'Medium Bullish',
            netOi: '2.57L',
            change: '3,601',
            trend: 'bullish'
        },
        // More rows as per your layout...
    ];

    updateTable(data);
};

const updateTable = (data) => {
    const tableBody = document.getElementById('marketData');
    tableBody.innerHTML = ''; // Clear previous content

    data.forEach(row => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${row.participant}</td>
            <td>${row.segment}</td>
            <td class="${row.trend === 'bearish' ? 'bearish' : ''}">${row.bearish}</td>
            <td class="${row.trend === 'bullish' ? 'bullish' : ''}">${row.bullish}</td>
            <td>${row.netOi}</td>
            <td>${row.change}</td>
        `;

        tableBody.appendChild(tr);
    });
};

// Fetch the data at 8 PM daily based on Indian Time Zone
const now = new Date();
const eightPM = new Date();
eightPM.setHours(20, 0, 0, 0); // Set the time to 8 PM

if (now > eightPM) {
    eightPM.setDate(eightPM.getDate() + 1); // Schedule for the next day if past 8 PM today
}

const timeUntilEightPM = eightPM - now;

setTimeout(() => {
    fetchData();
    setInterval(fetchData, 24 * 60 * 60 * 1000); // Fetch data every 24 hours
}, timeUntilEightPM);

// Initial fetch for the first load
fetchData();
