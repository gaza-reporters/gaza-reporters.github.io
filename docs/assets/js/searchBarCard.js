
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
  
// Function to update cards based on search input
  function updateCards() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredData = data.filter(d => d.title.toLowerCase().includes(searchValue));
    
    cardsContainer.innerHTML = ''; // Clear existing cards

    // Create cards for filtered data
    filteredData.forEach(d => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.textContent = d.title;
      cardsContainer.appendChild(card);
    });
  }

  // Initial card display
  updateCards();

  // Update cards when search input changes
  document.getElementById('searchInput').addEventListener('input', updateCards);
});