// Function to fetch and parse JSON data
async function fetchJSON(columnName) {
    const response = await fetch('/data/reporters_extra_columns_feb8.json');
    const data = await response.json();
    return data.map(item => {
        const value = item[columnName];
        return { value };
    });
}

// Group data by country
fetchJSON("country").then(data => {
    // Create an object to hold grouped data
    const groupedData = {};

    // Iterate over the data to group by country
    data.forEach(item => {
        const { value } = item;
        groupedData[value] = groupedData[value] || [];
        groupedData[value].push(item);
    });

    // Populate select dropdown with country options
    const countrySelect = document.getElementById('country-select');
    
    const placeholderOption = document.createElement('option');
    placeholderOption.value = 'Select a conflict...';
    placeholderOption.textContent = 'Select a conflict...';
    countrySelect.appendChild(placeholderOption);

    // Sort the keys of groupedData alphabetically
    const sortedCountries = Object.keys(groupedData).sort((a, b) => a.localeCompare(b));

    sortedCountries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    // Function to update total journalists when a country is selected
    function updateTotalJournalists() {
        const selectedCountry = countrySelect.value;
        const journalists = groupedData[selectedCountry].length;
        document.getElementById('total-journalists').textContent = journalists;
    }

    // Event listener for select change
    countrySelect.addEventListener('change', updateTotalJournalists);

    // Initial update
    updateTotalJournalists();
});
