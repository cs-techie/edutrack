document.getElementById("view-results").addEventListener("click", function() {
  fetch('get_results.php')
  .then(response => {
      return response.text();  // Get the raw text of the response
  })
  .then(data => {
      console.log(data);  // Log the raw response to see what you're getting
      try {
          const jsonData = JSON.parse(data);  // Attempt to parse the response as JSON
          const tableBody = document.getElementById('marks-body');
          tableBody.innerHTML = '';
          jsonData.forEach(item => {
              const row = document.createElement('tr');
              row.innerHTML = `<td>${item.subject}</td><td>${item.marks}</td>`;
              tableBody.appendChild(row);
          });
          document.getElementById('table-container').style.display = 'block';
      } catch (e) {
          console.error('Error parsing JSON:', e);
          alert('Error fetching results. Please check the console for details.');
      }
  })
  .catch(error => console.error('Error fetching results:', error));
});
