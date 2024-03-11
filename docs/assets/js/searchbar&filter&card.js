document.addEventListener("DOMContentLoaded", async function() {
    const searchInput = document.getElementById("searchInput");
    const cardsContainer = document.getElementById("searchBarResults");
    const visualization = document.getElementById("card-visualization");
    const countryFilter = document.getElementById("countryFilter");
    const monthFilter = document.createElement("select");
    const yearFilter = document.createElement("select");
  
    document.body.appendChild(monthFilter);
    document.body.appendChild(yearFilter);
  
    let data = [];
  
    async function loadData() {
      const response = await fetch('/data/reporters_extra_columns_feb8_gaza_only.csv');
      const text = await response.text();
      data = Papa.parse(text, { header: true }).data;
  
      // Get unique month
      const months = [...new Set(data.map(person => person.month))];
      months.sort((a, b) => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthNames.indexOf(a) - monthNames.indexOf(b);
      });
  
      // Populate the month filter select element
      months.forEach(month => {
        const option = document.createElement("option");
        option.value = month;
        option.textContent = month;
        monthFilter.appendChild(option);
      });
  
      // Get unique year
      const years = [...new Set(data.map(person => person.year))];
      years.sort((a, b) => a - b);
  
      // Populate the year filter select element
      years.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
      });
    }
  
    function filterCards() {
      const selectedMonth = monthFilter.value;
      const selectedYear = yearFilter.value;
      const searchValue = searchInput.value.toLowerCase();
  
      // Filter data based on selected month and year
      const filteredData = data.filter(d => {
        return (
          (selectedMonth === "" || selectedMonth === d.month) &&
          (selectedYear === "" || selectedYear === d.year) &&
          (searchValue === "" || Object.values(d).some(value => value && value.toString().toLowerCase().includes(searchValue)))
        );
      });
  
      // Update the visualization with filtered data
      cardsContainer.innerHTML = ''; // Clear existing cards
      filteredData.forEach(d => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute("data-month", d.month);
        card.setAttribute("data-year", d.year);
        card.innerHTML = `
          <h2>${d.fullName}</h2>
          <p>Date of Death: ${d.startDisplay}</p>
          <p>Location of Death: ${d.location}, ${d.country}</p>
          <p>Type of Death: ${d.typeOfDeath}</p>
          <p>News Organization: ${d.organizations}</p>
          <div class="details" style="display: none;"> Link to this journalist: <a href="${d.mtpage}">${d.mtpage}</a></div>
        `;
        visualization.appendChild(card);
        // Click event listener for showing/hiding details
        card.addEventListener("click", () => {
          const details = card.querySelector(".details");
          details.style.display = details.style.display === "none" ? "block" : "none";
        });
      });
    }
  
    // Load data and update cards
    await loadData();
    filterCards();
  
    // Update cards when search input changes
    searchInput.addEventListener('input', filterCards);
    monthFilter.addEventListener("change", filterCards);
    yearFilter.addEventListener("change", filterCards);
  });
  