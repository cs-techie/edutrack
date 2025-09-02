document.getElementById("view-results").addEventListener("click", function() {
    fetch('get_results.php')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('marks-body');
        tableBody.innerHTML = ''; // Clear existing rows

        // Check if results are empty
        if (data.length === 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 2;
            cell.textContent = 'No results found';
            row.appendChild(cell);
            tableBody.appendChild(row);
        } else {
            // Populate table with results
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${item.subject}</td><td>${item.marks}</td>`;
                tableBody.appendChild(row);
            });
        }

        // Show the table
        document.getElementById('table-container').style.display = 'block';
    })
    .catch(error => {
        console.error('Error fetching results:', error);
        alert("An error occurred while fetching results.");
    });
});

function closeTable() {
    document.getElementById('table-container').style.display = 'none';
}
