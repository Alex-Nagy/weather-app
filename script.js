const updateWeatherList = (data) => {
	// console.log(data);
	// console.log(data.current.temp_c);
	// console.log(data.location.name);

	document.querySelector("h3").textContent = data.location.name;
	document.getElementById("country").textContent = data.location.country;
	document.getElementById("temp").textContent = `${data.current.temp_c}°`;
	document.getElementById("humidity").textContent = `Humidity: ${data.current.humidity}%`;
	document.getElementById("condition").textContent = data.current.condition.text;
	document.querySelector("img").setAttribute("src", data.current.condition.icon);
};

const getWeatherData = (city) => {
	const spinner = document.getElementById("spinner");
	const boxText = document.querySelectorAll('#cityWeather > *')

	spinner.removeAttribute("hidden");

	setTimeout(() => {

		fetch(`http://api.weatherapi.com/v1/current.json?key=48ff8df63ddf4106868123149210612&q=${city}`)
			.then(response => response.json())
			.then(jsonData => updateWeatherList(jsonData));

		for (const item of boxText) {
			item.classList.remove("notext")
		}
		spinner.setAttribute("hidden", '')

	}, 1000) // spinner time
};

const background = (city) => {
	const body = document.querySelector("body");
	if (city === "Budapest") {
		body.classList.add("bud");
	}	else if (city === "London") {
		body.classList.add("lon");
	}	else if (city === "Paris") {
		body.classList.add("par");
	}	else if (city === "Rome") {
		body.classList.add("rom");
	}	else if (city === "Barcelona") {
		body.classList.add("bar");
	}
};

const changeCity = (event) => {
	let selectedCity = event.target.value;
	// console.log(selectedCity);

	const boxText = document.querySelectorAll('#cityWeather > *:not(:last-child)')
	for (const item of boxText) {
		item.classList.add("notext")
	}
	
	getWeatherData(selectedCity);
	background(selectedCity);
};

const deleteDatalist = () => {
	const fill = document.getElementById("allCitiesList");

	while (fill.firstChild) {
		fill.removeChild(fill.lastChild);
	}
};

const fillCityList = (data) => {
	// console.log(data);

	const fill = document.getElementById("allCitiesList");
	
	for (const city of data) {
		// console.log(city.name);
		fill.insertAdjacentHTML("beforeend", `<option value="${city.name}">`);
	}

	fill.addEventListener("click", deleteDatalist);
};

const getCities = (event) => {
	let chars = event.target.value;

	const fill = document.getElementById("allCitiesList");
	fill.textContent = "";

	if (chars.length > 2) {
		fetch(`http://api.weatherapi.com/v1/search.json?key=48ff8df63ddf4106868123149210612&q=${chars}`)
			.then(response => response.json())
			.then(jsonData => fillCityList(jsonData));
	}
};

const clickInputField = (event) => {
	event.target.value = "";
	
	const fill = document.getElementById("allCitiesList");
		while (fill.firstChild) {
		fill.removeChild(fill.lastChild);
	}
};

function loadEvent() {
	getWeatherData("Budapest");

	const citySelect = document.getElementById("cities");
	citySelect.addEventListener("change", changeCity);

	const allCityInput = document.getElementById("allCities");
	allCityInput.addEventListener("input", getCities);
	allCityInput.addEventListener("change", changeCity);
	allCityInput.addEventListener("click", clickInputField);
}

window.addEventListener("load", loadEvent);