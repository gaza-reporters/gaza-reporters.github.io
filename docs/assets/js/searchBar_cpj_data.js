
document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("searchInput");
  const resultsList = document.getElementById("searchBarResults");
  let data = [];

  async function loadCSV() {
      const response = await fetch('data/reporters_extra_columns_feb8.csv');
      const text = await response.text();
  
      // Parse CSV using PapaParse
      const parsedData = Papa.parse(text, { header: true }).data;
  
      // Alternatively, parse CSV using split and map
      const dataArray = text.split("\n").map(line => line.split(","));
      const headers = dataArray.shift();
      const mappedData = dataArray.map(values => Object.fromEntries(headers.map((header, index) => [header, values[index]])));
  
      // Choose one of the parsing methods based on your needs
      data = parsedData; // or data = mappedData;
  }
  
  function show(data) {
      resultsList.innerHTML = ""; // Clear previous results

      for (let i = 0; i < data.length; i++) {
          const row = data[i];
          const li = document.createElement("li");
          li.textContent = `${row.fullName} was killed in ${row.country} on ${row.startDisplay}`;

          resultsList.appendChild(li);
      }
  }

  loadCSV();

  searchInput.addEventListener("input", function() {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredData = data.filter(row =>
          Object.values(row).some(value => value.toLowerCase().includes(searchTerm))
      );

      show(filteredData);
  });
});