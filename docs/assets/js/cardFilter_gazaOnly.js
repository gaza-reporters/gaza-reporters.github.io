
const visualization = document.getElementById("card-visualization");
const countryFilter = document.getElementById("countryFilter");


fetch("/data/reporters_extra_columns_feb8_gaza_only_updated.csv")
  .then(response => response.text())
  .then(csvData => {
    // Parse the CSV data into an array of objects
    const deathPeople = Papa.parse(csvData, { header: true }).data;

    // Get unique month
    const months = [...new Set(deathPeople.map(person => person.month))];

    // Sort the unique months
    months.sort((a, b) => {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return monthNames.indexOf(a) - monthNames.indexOf(b);
    });
    console.log("Unique months:", months);

    // Populate the month filter select element
    months.forEach(month => {
      const option = document.createElement("option");
      option.value = month;
      option.textContent = month;
      monthFilter.appendChild(option);
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
    const selectedMonth = monthFilter.value;
    const selectedYear = yearFilter.value;
    console.log("selected month is " + selectedMonth)

    const cards = Array.from(visualization.querySelectorAll(".card"));

    cards.forEach(card => {
      const cardMonth = card.getAttribute("data-month");
      const cardYear = card.getAttribute("data-year");

      if (
        (selectedMonth === "" || selectedMonth === cardMonth) &&
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
      card.setAttribute("data-month", person.month);
      card.setAttribute("data-year", person.year);
      card.innerHTML = `
          <h2>${person.fullName}</h2>
          <p>Date of Death: ${person.startDisplay}</p>
          <p>Location of Death: ${person.location}</p>
          <p>News Organization: ${person.organizations}</p>
          <p>Link to this journalist on CPJ: <a href="${person.mtpage}">${person.mtpage}</a></p>
          <div class="details" style="display: none;"> Link to this journalist: <a href="${person.mtpage}">${person.mtpage}</a></div>
      `;
      visualization.appendChild(card);

      
    // Click event listener for showing/hiding details
      card.addEventListener("click", () => {
        const details = card.querySelector(".details");
        //details.style.display = details.style.display === "none" ? "block" : "none"; (deactivate the card-click-interactive feature)
      });
    });

    // Event listeners for the country and year filters
    monthFilter.addEventListener("change", filter);
    yearFilter.addEventListener("change", filter);
 
  })

  .catch(error => {
    console.error("Error loading CSV file:", error);
  });
