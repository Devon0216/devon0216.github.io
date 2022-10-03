const api_url = "https://api.covid19api.com/summary";

const onCovidButtonClick = () => {
    document.getElementById('loading').style.display = 'inline';
    
    // Calling that async function
    getapi(api_url);
};


// Defining async function
async function getapi(url) {
	
	// Storing response
	const response = await fetch(url);
	
	// Storing data in form of JSON
	var data = await response.json();

	console.log(data);
	if (response) {
		hideloader();
	}

    //show data according to the need
    if ( document.getElementById('country-stats').value === 'global' ){
        showGlobal(data);
    }
    else if ( document.getElementById('country-stats').value === 'all' ){
        show(data) ;
    }
    else if ( (document.getElementById('country-stats').value != 'all') || (document.getElementById('country-stats').value != 'global') ){
        showOneCountry(data, document.getElementById('country-stats').value) ;
    }
}


// Function to hide the loader
function hideloader() {
	document.getElementById('loading').style.display = 'none';
}


// Function to create all countries names for drop down
async function populateCountries() {
    // Storing response
	const response = await fetch(api_url);
	
	// Storing data in form of JSON
	var data = await response.json();

	console.log(data);
	if (response) {
		hideloader();
	}

	/*store data from api data*/
    const covidData = {
        ID: data.ID ,
        Message: data.Message,
        Global: data.Global,
        Countries: data.Countries,
        Date: data.Date
    }

    let tab = "" ;
    
    covidData.Countries.forEach((Element)=>{
        tab += 
            `<option value="${Element.Country}">${Element.Country}</option>`
    })

	document.getElementById("country-stats").innerHTML += tab;
}
populateCountries() ;


// Function to define innerHTML for HTML table
function show(data) {
	let tab =
		`<tr>
		<th>Country</th>
		<th>CountryCode</th>
		<th>Slug</th>
		<th>NewConfirmed</th>
        <th>TotalConfirmed</th>
        <th>NewDeaths</th>
        <th>TotalDeaths</th>
        <th>NewRecovered</th>
        <th>TotalRecovered</th>
        <th>Date</th>
		</tr>`;
	
	/*store data from api data*/
    const covidData = {
        ID: data.ID ,
        Message: data.Message,
        Global: data.Global,
        Countries: data.Countries,
        Date: data.Date
    }

    /*get data for global*/
    const Global = {
        NewConfirmed: covidData.Global.NewConfirmed,
        TotalConfirmed: covidData.Global.TotalConfirmed,
        NewDeaths: covidData.Global.NewDeaths,
        TotalDeaths: covidData.Global.TotalDeaths,
        NewRecovered: covidData.Global.NewRecovered,
        TotalRecovered: covidData.Global.TotalRecovered,
        Date: covidData.Global.Date
    }
    tab += 
        `<tr>
        <td>Global</td>
        <td></td>
        <td></td>
        <td>${Global.NewConfirmed} </td>
        <td>${Global.TotalConfirmed}</td>
        <td>${Global.NewDeaths}</td>	
        <td>${Global.TotalDeaths}</td>
        <td>${Global.NewRecovered}</td>
        <td>${Global.TotalRecovered}</td>
        <td>${Global.Date} </td>	
        </tr>`;

    
    covidData.Countries.forEach((Element)=>{
        tab += 
            `<tr>
            <td>${Element.Country} </td>
            <td>${Element.CountryCode} </td>
            <td>${Element.Slug} </td>
            <td>${Element.NewConfirmed} </td>
            <td>${Element.TotalConfirmed}</td>
            <td>${Element.NewDeaths}</td>	
            <td>${Element.TotalDeaths}</td>
            <td>${Element.NewRecovered}</td>
            <td>${Element.TotalRecovered}</td>
            <td>${Element.Date} </td>	
            </tr>`;
    })

	document.getElementById("covid-stats").innerHTML = tab;
}



// Function to define innerHTML for HTML table
function showGlobal(data) {
	let tab =
		`<tr>
		<th>Country</th>
		<th>CountryCode</th>
		<th>Slug</th>
		<th>NewConfirmed</th>
        <th>TotalConfirmed</th>
        <th>NewDeaths</th>
        <th>TotalDeaths</th>
        <th>NewRecovered</th>
        <th>TotalRecovered</th>
        <th>Date</th>
		</tr>`;
	
	/*store data from api data*/
    const covidData = {
        ID: data.ID ,
        Message: data.Message,
        Global: data.Global,
        Countries: data.Countries,
        Date: data.Date
    }

    /*get data for global*/
    const Global = {
        NewConfirmed: covidData.Global.NewConfirmed,
        TotalConfirmed: covidData.Global.TotalConfirmed,
        NewDeaths: covidData.Global.NewDeaths,
        TotalDeaths: covidData.Global.TotalDeaths,
        NewRecovered: covidData.Global.NewRecovered,
        TotalRecovered: covidData.Global.TotalRecovered,
        Date: covidData.Global.Date
    }
    tab += 
        `<tr>
        <td>Global</td>
        <td></td>
        <td></td>
        <td>${Global.NewConfirmed} </td>
        <td>${Global.TotalConfirmed}</td>
        <td>${Global.NewDeaths}</td>	
        <td>${Global.TotalDeaths}</td>
        <td>${Global.NewRecovered}</td>
        <td>${Global.TotalRecovered}</td>
        <td>${Global.Date} </td>	
        </tr>`;

	document.getElementById("covid-stats").innerHTML = tab;
}



// Function to define innerHTML for HTML table
function showOneCountry(data, countryName) {
    console.log(countryName) ;
	let tab =
		`<tr>
		<th>Country</th>
		<th>CountryCode</th>
		<th>Slug</th>
		<th>NewConfirmed</th>
        <th>TotalConfirmed</th>
        <th>NewDeaths</th>
        <th>TotalDeaths</th>
        <th>NewRecovered</th>
        <th>TotalRecovered</th>
        <th>Date</th>
		</tr>`;
	
	/*store data from api data*/
    const covidData = {
        ID: data.ID ,
        Message: data.Message,
        Global: data.Global,
        Countries: data.Countries,
        Date: data.Date
    }



    /*get data for each country*/
    const countryData = [] ;
    
    for(let i = 0; i < covidData.Countries.length; i++ ){
        if ( covidData.Countries[i].Country === countryName){
            tab += 
            `<tr>
            <td>${covidData.Countries[i].Country} </td>
            <td>${covidData.Countries[i].CountryCode} </td>
            <td>${covidData.Countries[i].Slug} </td>
            <td>${covidData.Countries[i].NewConfirmed} </td>
            <td>${covidData.Countries[i].TotalConfirmed}</td>
            <td>${covidData.Countries[i].NewDeaths}</td>	
            <td>${covidData.Countries[i].TotalDeaths}</td>
            <td>${covidData.Countries[i].NewRecovered}</td>
            <td>${covidData.Countries[i].TotalRecovered}</td>
            <td>${covidData.Countries[i].Date} </td>	
            </tr>`;
            break ;
        }//if 
    }
    

	document.getElementById("covid-stats").innerHTML = tab;
}



