let spreadsheet = "/docs/data/reporters_extra_columns_feb8.csv";
let rows; // or just --> let rows = [];
 
// filter goes here

function show(filteredRows) {
  filterResults.textContent = " "; // clear the list

  if (filteredRows.length > 0) {
    for (let row of filteredRows) {
      let item = document.createElement("li"); // document here works with html file and wiz createElement functionn, it will create <li> elements for me (it won't show up in your html codes but it will show up on your page)
      item.textContent = row.fullName + " was killed at " + "Israeli-Palestinian conflict" + " on " + row.startDisplay;
      filterResults.append(item);
    }
    filterResults.style.display = "block"; // show the list
  } else {
    filterResults.style.display = "none"; // hide the list if there are no filtered rows
  }
}


function filter(){
  let filtered = []; 

  for (let row of rows){
    console.log('selectCountry.value:', selectCountry.value);
    console.log('row.country:', row.country);
    console.log('Condition result:', selectCountry.value == 'country' || selectCountry.value == row.country);

    if(
      (selectCountry.value == 'country' || selectCountry.value == row.country)
      && // && means AND
      (selectYear.value == 'year' || selectYear.value == row.year)
    )
    {
      filtered.push(row); 
    } 

  }

  show(filtered);
}


async function loadData(){ 
  rows = await d3.csv(spreadsheet); 
  //show(rows); ---> if uncomment this line, then the whole dataset would show up on the page without filtering anything
}

selectCountry.onchange = filter;
selectYear.onchange = filter;

loadData();
