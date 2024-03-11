document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("searchInput");
  const cardsContainer = document.getElementById("searchBarResults");
  let data = [];

  async function loadCSV() {
    const response = await fetch('/data/reporters_extra_columns_feb8_gaza_only.csv');
    const text = await response.text();

    // Parse CSV using PapaParse
    const parsedData = Papa.parse(text, { header: true }).data;
    
    data = parsedData;
    console.log(data)
  }

  // Function to update cards based on search input
  function updateCards() {
    console.log("searchInput:", searchInput);
    console.log("cardsContainer:", cardsContainer);
    
    const searchValue = searchInput.value.toLowerCase();
    console.log("searchValue", searchValue); // Add this line to log filteredData

    // Check if search value is empty
    if (!searchValue.trim()) {
      cardsContainer.innerHTML = ''; // Clear existing cards
      return; // Exit the function early
    }

    const filteredData = data.filter(d => {
      return (
        (d.fullName && d.fullName.toLowerCase().includes(searchValue.toLowerCase())) ||
        (d.location && d.location.toLowerCase().includes(searchValue.toLowerCase())) ||
        (d.status && d.status.toLowerCase().includes(searchValue.toLowerCase())) ||
        (d.typeOfDeath && d.typeOfDeath.toLowerCase().includes(searchValue.toLowerCase())) ||
        (d.charges && d.charges.toLowerCase().includes(searchValue.toLowerCase())) ||
        (d.startDisplay && d.startDisplay.toLowerCase().includes(searchValue.toLowerCase())) ||
        (d.mtpage && d.mtpage.toLowerCase().includes(searchValue.toLowerCase())) ||
        (d.country && d.country.toLowerCase().includes(searchValue.toLowerCase())) ||
        (d.type && d.type.toLowerCase().includes(searchValue.toLowerCase())) ||
        (d.motiveConfirmed && d.motiveConfirmed.toLowerCase().includes(searchValue.toLowerCase())) ||
        (d.year && d.year.toLowerCase().includes(searchValue.toLowerCase())) ||
        (d.month && d.month.toLowerCase().includes(searchValue.toLowerCase())) ||
        (d.organizations && d.organizations.toLowerCase().includes(searchValue.toLowerCase()))
      );
    });
    
    console.log("filteredData:", filteredData); // Add this line to log filteredData


    cardsContainer.innerHTML = ''; // Clear existing cards

  
  // Create cards for filtered data
  filteredData.forEach(d => {
   const card = document.createElement('div');

    card.classList.add('card');
    card.innerHTML = `
      <h2>${d.fullName}</h2>
      <p>Date of Death: ${d.startDisplay}</p>
      <p>Location of Death: ${d.location}, ${d.country}</p>
      <p>Type of Death: ${d.typeOfDeath}</p>
      <p>News Organization: ${d.organizations}</p>
      <div class="details" style="display: none;"> Link to this journalist: <a href="${d.mtpage}">${d.mtpage}</a></div>
    `;
    cardsContainer.appendChild(card);
    // Click event listener for showing/hiding details
    card.addEventListener("click", () => {
      const details = card.querySelector(".details");
      details.style.display = details.style.display === "none" ? "block" : "none";
    });
  });
}

  // Initial card display
  loadCSV().then(updateCards);

  // Update cards when search input changes
  searchInput.addEventListener('input', updateCards);
});
