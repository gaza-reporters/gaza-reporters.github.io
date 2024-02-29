
const visualization = document.getElementById("card-visualization");
const countryFilter = document.getElementById("countryFilter");


fetch("/docs/data/reporters_extra_columns_feb8.csv")
  .then(response => response.text())
  .then(csvData => {
    // Parse the CSV data into an array of objects
    const deathPeople = Papa.parse(csvData, { header: true }).data;

    // Get unique country names
    const countries = [...new Set(deathPeople.map(person => person.country))];
    console.log("Unique countries:", countries);

    // Populate the country filter select element
    countries.forEach(country => {
      const option = document.createElement("option");
      option.value = country;
      option.textContent = country;
      countryFilter.appendChild(option);
    });

    // Get unique year
    const years = [...new Set(deathPeople.map(person => person.year))];
    years.sort((a, b) => a - b);
    console.log("Unique years:", years);

    const yearFilter = document.getElementById("yearFilter");

    // Populate the year filter select element
    years.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
   

    // Function to filter cards based on selected country and year
    function filter() {
    const selectedCountry = countryFilter.value;
    const selectedYear = yearFilter.value;

    const cards = Array.from(visualization.querySelectorAll(".card"));

    cards.forEach(card => {
      const cardCountry = card.getAttribute("data-country");
      const cardYear = card.getAttribute("data-year");

      if (
        (selectedCountry === "" || selectedCountry === cardCountry) &&
        (selectedYear === "" || selectedYear === cardYear)
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
    }
    
    // Initial display of cards
    deathPeople.forEach(person => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-country", person.country);
      card.setAttribute("data-year", person.year);
      card.innerHTML = `
          <h2>${person.fullName}</h2>
          <p>Date of Death: ${person.startDisplay}</p>
          <p>Location of Death: ${person.location}, ${person.country}</p>
          <p>Type of Death: ${person.typeOfDeath}</p>
          <p>News Organization: ${person.organizations}</p>
          <div class="details" style="display: none;"> Link to this journalist: <a href="${person.mtpage}">${person.mtpage}</a></div>
      `;
      visualization.appendChild(card);

      
    // Click event listener for showing/hiding details
      card.addEventListener("click", () => {
        const details = card.querySelector(".details");
        details.style.display = details.style.display === "none" ? "block" : "none";
      });
    });

    // Event listeners for the country and year filters
    countryFilter.addEventListener("change", filter);
    yearFilter.addEventListener("change", filter);
 
  })

  .catch(error => {
    console.error("Error loading CSV file:", error);
  });
