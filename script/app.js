/*--- Gloval Vars ---*/
let search = document.getElementById("search")
let worldCases = 0;

/*--- Events ---*/ 

search.addEventListener("click",function(){
	let inputValue = document.getElementById("searchbox").value;
	if (inputValue =="") {
		return;
	}
	else {
		getAPICountry(inputValue)
	}
    
});

var enteredText = document.getElementById("searchbox");
enteredText.addEventListener("keyup", function(event) {
  if (event.key ==  "Enter") {
   event.preventDefault();
   search.click();
  }
});

/*--- Functions ---*/

let showCOVIDCountry = function(json)
{
	let country = document.getElementById("country")
    let cases = document.getElementById("cases")
	let popu = document.getElementById("population")
	let tcases = document.getElementById("todaycases")
	let death = document.getElementById("deaths")
	changeProgressBar(json.cases)
	country.innerHTML = "Selected country: "+json.country
    popu.innerHTML = "Population: " + json.population
	cases.innerHTML = "Total cases: " +json.cases
	tcases.innerHTML = "Cases today: " +json.todayCases
	death.innerHTML = "Total deaths: " +json.deaths
    console.log(json.countryInfo.flag)
};

let showCOVIDWorld = function(json){
    let cases = document.getElementById("w_cases")
	let popu = document.getElementById("w_population")
	let tcases = document.getElementById("w_todaycases")
	let death = document.getElementById("w_deaths")
	worldCases = json.cases
    popu.innerHTML = "Population: " + json.population
	cases.innerHTML = "Total cases: " +json.cases
	tcases.innerHTML = "Cases today: " +json.todayCases
	death.innerHTML = "Total deaths: " +json.deaths

	getAPICountry("be");
}

const changeProgressBar = function(cases){
		let percentage = (cases/worldCases)*100
		var n = percentage.toFixed(2);
		document.getElementById("percentage").innerHTML ="This shows the percentage of cases compared to the world. " + `(${n}%)`;
        document.querySelector('.js-status').style.width = `${percentage}%`;
        document.querySelector('.js-status').style.background = 'var(--global-page-bars)';
};

/*--- API Functions ---*/ 
const getAPICountry = function(country){
    // Eerst bouwen we onze url op
	let url = `https://disease.sh/v3/covid-19/countries/${country}?strict=true`;
	// Met de fetch API proberen we de data op te halen.
	fetch(url)
		.then(req => {
			if (!req.ok) {
				console.error('Error with fetch');
			} else {
				return req.json();
			}
		})
		.then(json => {
			showCOVIDCountry(json);
		});
	// Als dat gelukt is, gaan we naar onze showResult functie.
};

const getAPIWorld = function(){
    // Eerst bouwen we onze url op
	let url = `https://disease.sh/v3/covid-19/all`;
	// Met de fetch API proberen we de data op te halen.
	fetch(url)
		.then(req => {
			if (!req.ok) {
				console.error('Error with fetch');
			} else {
				return req.json();
			}
		})
		.then(json => {
			showCOVIDWorld(json);
		});
	// Als dat gelukt is, gaan we naar onze showResult functie.
};

/*--- Initialisation ---*/ 
const init = function() {
    console.log("init initiated!");
	getAPIWorld();
	
};



document.addEventListener("DOMContentLoaded", init);