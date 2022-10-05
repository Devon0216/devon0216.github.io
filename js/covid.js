/*declare necessary variables*/
const API_URL = "https://api.covid19api.com/summary";
var data = undefined ;
var input = undefined ;

var CovidData = {
  ID: undefined,
  Message: undefined,
  Global: undefined,
  Countries: undefined,
  Date: undefined
}

var Global = {
  NewConfirmed: undefined,
  TotalConfirmed: undefined,
  NewDeaths: undefined,
  TotalDeaths: undefined,
  NewRecovered: undefined,
  TotalRecovered: undefined,
  Date : undefined
}


/*trigger select click*/
function onCountrySelect () {
    document.getElementById('loading').style.display = 'inline';
    
    hideloader();
    input = document.getElementById('country-stats').value ;
    show() ;
}




/*Function to hide the loader*/
function hideloader() {
	document.getElementById('loading').style.display = 'none';
}


/*Function to create all countries names for drop down*/
async function populateCountries() {
    // Storing response
    
    var response = undefined ;
    
    try {
        response = await fetch(API_URL);
         // Storing data in form of JSON
        data = await response.json();
    } catch(err) {
        alert(err); 
        console.log(err) ;
    }
	
	
    if (response) {
      hideloader();
    }

    console.log(data);

	  //store data from api data
    CovidData.ID = data.ID ;
    CovidData.Message = data.Message ;
    CovidData.Global = data.Global ;
    CovidData.Countries = data.Countries ;
    CovidData.Date = data.Date ;

    Global.NewConfirmed = CovidData.Global.NewConfirmed ;
    Global.TotalConfirmed = CovidData.Global.TotalConfirmed ;
    Global.NewDeaths = CovidData.Global.NewDeaths ;
    Global.TotalDeaths = CovidData.Global.TotalDeaths ;
    Global.NewRecovered = CovidData.Global.NewRecovered ;
    Global.TotalRecovered = CovidData.Global.TotalRecovered ;
    Global.Date = CovidData.Global.Date ;

    //populate options for the select drop down
    select = document.getElementById('country-stats');
    
    CovidData.Countries.map(makeDropDownCountries) ;

}
populateCountries() ;

function makeDropDownCountries(element){
    var option = document.createElement('option');
    option.value = element.Country;
    option.textContent = element.Country;
    select.appendChild(option);
}






// Function to define innerHTML for HTML table
function show() {

  if ( document.getElementById("covid-stats").innerHTML != ""){
    document.getElementById("covid-stats").innerHTML = "";
  }
   
  showHeader() ;  
  if ( input == "global"){
    showGlobal() ;
  }
  else if ( input != "all" && input != "global" ){
    showCountry(input) ;
  }
  else if ( input == "all" ){
    showAll() ;
  }

}



/*function to create header row*/
function showHeader(){
  let header ={
    Country : "Country",
    CountryCode:"CountryCode",
    Slug :"Slug",
    NewConfirmed:"NewConfirmed",
    TotalConfirmed:"TotalConfirmed",
    NewDeaths:"NewDeaths",
    TotalDeaths:"TotalDeaths",
    NewRecovered:"NewRecovered",
    TotalRecovered:"TotalRecovered",
    Date:"Date"
  } ;
  showRow(header) ;
}


/*function to create global row*/
function showGlobal(){
  let tempGlobal ={
    Country : "Global",
    CountryCode:"",
    Slug :"",
    NewConfirmed: Global.NewConfirmed,
    TotalConfirmed:Global.TotalConfirmed,
    NewDeaths:Global.NewDeaths,
    TotalDeaths:Global.TotalDeaths,
    NewRecovered:Global.NewRecovered,
    TotalRecovered:Global.TotalRecovered,
    Date:Global.Date
  } ;
  showRow(tempGlobal) ;
}


/*function to create one country row*/
function showCountry(input){
  CovidData.Countries.find( isCountry ) ;
}

function isCountry(element){
  if (element.Country == input){
    showRow(element) ;
  }
}

/*function to create all country rows*/
function showAll(){
  showGlobal() ;
  CovidData.Countries.map(showRow) ;
}



/*function to generate data for one row based on given country*/
function showRow(Element){
    let tbody = document.createElement('tbody');

    let CountryRow = document.createElement('tr');

    let CountryName = document.createElement('td');
    CountryName.textContent = Element.Country ;

    let CountryCode = document.createElement('td');
    CountryCode.textContent = Element.CountryCode;

    let CountrySlug = document.createElement('td');
    CountrySlug.textContent = Element.Slug ;

    let CountryNewConfirmed = document.createElement('td');
    CountryNewConfirmed.textContent = Element.NewConfirmed;

    let CountryTotalConfirmed = document.createElement('td');
    CountryTotalConfirmed.textContent = Element.TotalConfirmed;

    let CountryNewDeaths = document.createElement('td');
    CountryNewDeaths.textContent = Element.NewDeaths;

    let CountryTotalDeaths = document.createElement('td');
    CountryTotalDeaths.textContent = Element.TotalDeaths;

    let CountryNewRecovered = document.createElement('td');
    CountryNewRecovered.textContent = Element.NewRecovered;

    let CountryTotalRecovered = document.createElement('td');
    CountryTotalRecovered.textContent = Element.TotalRecovered;

    let CountryDate = document.createElement('td');
    CountryDate.textContent = Element.Date;
    

    CountryRow.appendChild(CountryName);
    CountryRow.appendChild(CountryCode);
    CountryRow.appendChild(CountrySlug);
    CountryRow.appendChild(CountryNewConfirmed);
    CountryRow.appendChild(CountryTotalConfirmed);
    CountryRow.appendChild(CountryNewDeaths);
    CountryRow.appendChild(CountryTotalDeaths);
    CountryRow.appendChild(CountryNewRecovered);
    CountryRow.appendChild(CountryTotalRecovered);
    CountryRow.appendChild(CountryDate);
    tbody.appendChild(CountryRow);

    document.getElementById("covid-stats").appendChild(tbody) ;

}