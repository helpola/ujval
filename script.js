// Fetch JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        let html = '<table border="1">';
        data.forEach(row => {
            html += '<tr>';
            for (let key in row) {
                html += `<td>${row[key]}</td>`;
            }
            html += '</tr>';
        });
        html += '</table>';
        document.getElementById('data-display').innerHTML = html;
    })
    .catch(error => console.error('Error loading JSON:', error));
