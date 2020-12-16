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
	let recovered = document.getElementById("recovered")
	let death = document.getElementById("deaths")

	changeProgressBar(json.cases, json.recovered)
	country.innerHTML = "Selected country: "+json.country
    popu.innerHTML = "Population: " + (json.population).toLocaleString()
	cases.innerHTML = "Total cases: " +(json.cases).toLocaleString()
	tcases.innerHTML = "Cases today: " +(json.todayCases).toLocaleString()
	recovered.innerHTML = "Total recovered: " +(json.recovered).toLocaleString()
	death.innerHTML = "Total deaths: " +(json.deaths).toLocaleString()
};

let showCOVIDWorld = function(json){
    let cases = document.getElementById("w_cases")
	let popu = document.getElementById("w_population")
	let tcases = document.getElementById("w_todaycases")
	let recovered = document.getElementById("w_recovered")
	let death = document.getElementById("w_deaths")
	worldCases = json.cases
	popu.innerHTML = "Population: " + (json.population).toLocaleString()
	cases.innerHTML = "Total cases: " +(json.cases).toLocaleString()
	tcases.innerHTML = "Cases today: " +(json.todayCases).toLocaleString()
	recovered.innerHTML = "Total recovered: " +(json.recovered).toLocaleString()
	death.innerHTML = "Total deaths: " +(json.deaths).toLocaleString()

	getAPICountry("be");
}

const changeProgressBar = function(cases, recovered){
	
		let percentage = (cases/worldCases)*100
		var n = percentage.toFixed(2);
		if (n <=1) {
			document.getElementById("percentage").innerHTML ="This shows the percentage of cases compared to the world. " + `(${n}%)`;
			document.querySelector('.js-status').style.width = `2%`;
			document.querySelector('.js-status').style.background = 'var(--global-page-bars)';
		}
		else{
			document.getElementById("percentage").innerHTML ="This shows the percentage of cases compared to the world. " + `(${n}%)`;
			document.querySelector('.js-status').style.width = `${percentage}%`;
			document.querySelector('.js-status').style.background = 'var(--global-page-bars)';
		}
		
		
		let percentage2 = (recovered/cases)*100
		var n2 = percentage2.toFixed(2);
		if (n2 <=1) {
			document.getElementById("percentage2").innerHTML ="This shows the percentage of people recovered in a country. " + `(${n2}%)`;
			document.querySelector('.js-status2').style.width = `2%`;
			document.querySelector('.js-status2').style.background = 'var(--global-page-bars)';
		} else {
			document.getElementById("percentage2").innerHTML ="This shows the percentage of people recovered in a country. " + `(${n2}%)`;
			document.querySelector('.js-status2').style.width = `${percentage2}%`;
			document.querySelector('.js-status2').style.background = 'var(--global-page-bars)';
		}
		
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