// Example for loading CSV data
fetch('data.csv')
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n').slice(1); // Skip header row
        let html = '<table border="1">';
        rows.forEach(row => {
            const cols = row.split(',');
            html += '<tr>';
            cols.forEach(col => html += `<td>${col}</td>`);
            html += '</tr>';
        });
        html += '</table>';
        document.getElementById('data-display').innerHTML = html;
    });
