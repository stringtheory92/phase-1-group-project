// 10/5 After initial search and city screen render, cannot complete search
// using city/state from that city screen. Error 'wrong latitude'

// After searching by city, if only 1 city is returned
// THINK ITS FIXED!
// tomorrow => new pics for clear (maybe with a sun) and daytime rain
// work on nightmode if there's time and no bugs (big if)

let cityData = {};
let stateArray = [];

// Elements
const topBar = document.querySelector("#top-bar");
const weatherText = document.querySelector("#weather-text");
const cityForm = document.querySelector("#city-form");
const inputText = document.querySelector("#input-text");
const homeBanner = document.querySelector("#home-banner");
const cityPage = document.querySelector("#city-page");
const citySubmit = document.querySelector("#submit-button");

// City page elements
const cityBanner = document.querySelector("#city-banner");
const cityName = document.querySelector("#city-name");
const currentTemp = document.querySelector("#current-temp");
const humidity = document.querySelector("#humidity");
const dailyHigh = document.querySelector("#daily-high");
const dailyLow = document.querySelector("#daily-low");
const feelsLike = document.querySelector("#feels-like");
const windSpeed = document.querySelector("#wind-speed");
const weatherFactsContainer = document.querySelector("#weather-facts");
const nightModeButton = document.querySelector("#night-button");

// Elements Generated in Functions
// select state menu has id (#city-menu)
// weather fact name id = #weather-fact-name (from generateFirstWeatherFact())
// weather fact detail id = #weather-fact-detail (from generateFirstWeatherFact())

// Day/Night mode button listener
nightModeButton.addEventListener("click", (e) => {
  console.log("clicked");

  // Day to Night
  if (nightModeButton.innerHTML !== '<i class="fa-regular fa-sun"></i>') {
    nightModeButton.innerHTML = '<i class="fa-regular fa-sun"></i>';
    nightModeButton.className = "day-button";
    topBar.className = "top-bar-night";
    weatherText.className = "weather-text-night";
    homeBanner.className = "home-banner-night";
    cityPage.className = "city-page-night";
    //cityBanner.className = "city-banner-night";
    if (cityBanner.className === "clear") {
      cityBanner.classList = "clear-night";
    }
    if (cityBanner.className === "clouds") {
      cityBanner.classList = "clouds-night";
    }
    if (cityBanner.className === "rain") {
      cityBanner.classList = "rain-night";
    }
    if (cityBanner.className === "mist") {
      cityBanner.classList = "mist-night";
    }
    if (cityBanner.className === "snow") {
      cityBanner.classList = "snow-night";
    }

    // Night to Day
  } else {
    nightModeButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
    nightModeButton.className = "night-button";
    topBar.className = "top-bar-day";
    weatherText.className = "weather-text-day";
    homeBanner.className = "home-banner-day";
    cityPage.className = "city-page-day";
    if (cityBanner.className === "clear-night") {
      cityBanner.classList = "clear";
    }
    if (cityBanner.className === "clouds-night") {
      cityBanner.className = "clouds";
    }
    if (cityBanner.className === "rain-night") {
      cityBanner.className = "rain";
    }
    if (cityBanner.className === "mist-night") {
      cityBanner.className = "mist";
    }
    if (cityBanner.className === "snow-night") {
      cityBanner.className = "snow";
    }
  }
});
//==================================================

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (Number(inputText.value)) {
    // ZipCode submitted

    getWeatherByZip(inputText.value).then((data) => {
      console.log("data: ", data);
      cityData = data;
      inputText.value = "";

      //Collapse home banner and display city details
      homeBanner.style.display = "none";
      cityPage.style.display = "block";

      //Change city banner based on weather
      const weatherStatus = cityData.weather[0].main;
      console.log(cityData.weather);
      console.log("city: ", cityData.name);
      console.log("weatherStatus: ", weatherStatus);

      //======  VERSION IN PROGRESS. WORKING CODE BELOW  ============
      //========  will persist the cityBanner day/night status between searches (defaults to day now)
      //   if (weatherStatus === "Clouds") {
      //     console.log("clouds banner");
      //     if (cityBanner.className === "city-banner-day") {
      //       cityBanner.classList.add = "clouds";
      //     } else cityBanner.classList = "city-banner-night clouds-night";
      //     cityBanner.textContent = "Cloudy";
      //   } else if (weatherStatus === "Rain") {
      //     console.log("rain banner");
      //     cityBanner.classList = "rain";
      //     cityBanner.textContent = "Rain";
      //   } else if (weatherStatus === "Mist") {
      //     console.log("mist banner");
      //     cityBanner.classList = "mist";
      //     cityBanner.textContent = "Misty";
      //   } else if (weatherStatus === "Clear") {
      //     console.log("clear banner");
      //     cityBanner.classList = "clear";
      //     cityBanner.textContent = "Clear";
      //   } else if (weatherStatus === "Snow") {
      //     console.log("snow banner");
      //     cityBanner.classList = "snow";
      //     cityBanner.textContent = "Snow";
      // }
      //=======  BACKUP CODE ===================
      if (weatherStatus === "Clouds") {
        console.log("clouds banner");
        cityBanner.classList = "clouds";
        cityBanner.textContent = "Cloudy";
      } else if (weatherStatus === "Rain") {
        console.log("rain banner");
        cityBanner.classList = "rain";
        cityBanner.textContent = "Rain";
      } else if (weatherStatus === "Mist") {
        console.log("mist banner");
        cityBanner.classList = "mist";
        cityBanner.textContent = "Misty";
      } else if (weatherStatus === "Clear") {
        console.log("clear banner");
        cityBanner.classList = "clear";
        cityBanner.textContent = "Clear";
      } else if (weatherStatus === "Snow") {
        console.log("snow banner");
        cityBanner.classList = "snow";
        cityBanner.textContent = "Snow";
      }

      renderData();
    });

    // City Name submitted
  } else if (!document.querySelector("#city-menu")) {
    getWeatherByCity(inputText.value).then((data) => {
      console.log("fetch worked: ", data);
      cityData = data;

      if (data.length > 1) {
        citySubmit.style.display = "none";

        const dropDown = document.createElement("select");
        const firstOption = document.createElement("option");

        dropDown.id = "city-menu";
        cityForm.append(dropDown);

        firstOption.textContent = "Select State";
        dropDown.appendChild(firstOption);

        data.forEach((city) => {
          stateArray.push(city.state);
          const option = document.createElement("option");

          option.textContent = city.state;
          dropDown.appendChild(option);
        });

        dropDownListener(dropDown);
      } else console.log("one city returned");
    });
  } else {
    console.log("You shouldnt be here");
  }
  function dropDownListener(selectMenu) {
    console.log("stateArray: ", stateArray);

    selectMenu.addEventListener("change", (e) => {
      console.log("listening to change event");
      const stateArrayIndex = e.target.options.selectedIndex - 1;
      const selectedState = stateArray[stateArrayIndex];

      for (let city of cityData) {
        console.log("Just outside of for loop");
        if (city.state === selectedState) {
          console.log("city.state", city.state);
          console.log("selectedState", selectedState);
          cityData = city;
        }
        console.log("cityData after for loop: ", cityData);
      }

      // Collapses home banner and displays city page
      homeBanner.style.display = "none";
      cityPage.style.display = "block";
      citySubmit.style.display = "inline";
      inputText.value = "";
      selectMenu.remove();

      console.log("heres your city: ", cityData);
      console.log("cityData.lat: ", cityData.lat);

      getWeatherByLat(cityData.lat.toFixed(6), cityData.lon.toFixed(6)).then(
        (data) => {
          console.log("city ", data);
          console.log("cityData: ", cityData);
          const actualCity = cityData.name;
          console.log("actualCity: ", actualCity);
          cityData = data;
          renderData(actualCity);

          //Change city banner based on weather
          const weatherStatus = cityData.weather[0].main;
          console.log(cityData.weather);
          console.log("city: ", cityData.name);
          console.log("weatherStatus: ", weatherStatus);

          if (weatherStatus === "Clouds") {
            console.log("clouds banner");
            cityBanner.classList = "clouds";
            cityBanner.textContent = "Cloudy";
          } else if (weatherStatus === "Rain") {
            console.log("rain banner");
            cityBanner.classList = "rain";
            cityBanner.textContent = "Rain";
          } else if (weatherStatus === "Mist") {
            console.log("mist banner");
            cityBanner.classList = "mist";
            cityBanner.textContent = "Misty";
          } else if (weatherStatus === "Clear") {
            console.log("clear banner");
            cityBanner.classList = "clear";
            cityBanner.textContent = "Clear";
          } else if (weatherStatus === "Snow") {
            console.log("snow banner");
            cityBanner.classList = "snow";
            cityBanner.textContent = "Snow";
          }
        }
      );
    });
  }
});

function renderData(optionalCityName) {
  currentTemp.textContent = `${cityData.main.temp.toFixed(0)}°`;
  dailyHigh.textContent = `${cityData.main.temp_max.toFixed(0)}°`;
  dailyLow.textContent = `${cityData.main.temp_min.toFixed(0)}°`;
  console.log("cityData.name: ", cityData.name);
  console.log("optionalCityName: ", optionalCityName);
  if (cityData.name !== optionalCityName && optionalCityName !== undefined) {
    cityName.textContent = optionalCityName;
  } else cityName.textContent = cityData.name;
  stateArray = [];
  weatherScrolling();
}

// Optional weather data in #weather-facts-container via arrow keys
//
function weatherScrolling() {
  console.log("weatherScrolling running");
  console.log(cityData);

  if (!weatherFactsContainer.hasChildNodes()) {
    generateFeelsLikeFact();
  }

  document.addEventListener("keydown", (e) => {
    // adding ifs for functions 'generate${Different}Facts'
    // Feels like data renders on form submit, then keydowns to toggle between data
    if (e.key === "ArrowRight") {
      console.log("ArrowRight");
      if (document.querySelector("#feels-like-fact-name")) {
        generateHumidityFact();
      } else if (document.querySelector("#humidity-fact-name")) {
        generateWindSpeedFact();
      } else if (document.querySelector("#wind-speed-fact-name")) {
        generateFeelsLikeFact();
      }
    }
    if (e.key === "ArrowLeft") {
      console.log("ArrowLeft");
      if (document.querySelector("#feels-like-fact-name")) {
        generateWindSpeedFact();
      } else if (document.querySelector("#humidity-fact-name")) {
        generateFeelsLikeFact();
      } else if (document.querySelector("#wind-speed-fact-name")) {
        generateHumidityFact();
      }
    }
  });
}

function generateFeelsLikeFact() {
  console.log("feels like");
  if (weatherFactsContainer.hasChildNodes()) {
    weatherFactsContainer.innerHTML = "";
  }
  // add class to first weatherFact and to subsequent facts
  // for similar css styling
  const weatherFactName = document.createElement("h2");
  const weatherFactDetail = document.createElement("h3");

  weatherFactName.id = "feels-like-fact-name";
  weatherFactDetail.id = "feels-like-fact-detail";

  weatherFactName.textContent = "Currently Feels Like:";
  weatherFactDetail.textContent = `${cityData.main.feels_like.toFixed(0)}°`;

  weatherFactsContainer.appendChild(weatherFactName);
  weatherFactsContainer.appendChild(weatherFactDetail);
}

function generateWindSpeedFact() {
  console.log("wind speed");
  if (weatherFactsContainer.hasChildNodes()) {
    weatherFactsContainer.innerHTML = "";
  }
  // add class to first weatherFact and to subsequent facts
  // for similar css styling
  const weatherFactName = document.createElement("h2");
  const weatherFactDetail = document.createElement("h3");

  weatherFactName.id = "wind-speed-fact-name";
  weatherFactDetail.id = "wind-speed-fact-detail";

  weatherFactName.textContent = "Wind Speed:";
  weatherFactDetail.textContent = `${cityData.wind.speed.toFixed(0)}mph`;

  weatherFactsContainer.appendChild(weatherFactName);
  weatherFactsContainer.appendChild(weatherFactDetail);
}

function generateHumidityFact() {
  console.log("humidity");
  if (weatherFactsContainer.hasChildNodes()) {
    weatherFactsContainer.innerHTML = "";
  }
  // add class to first weatherFact and to subsequent facts
  // for similar css styling
  const weatherFactName = document.createElement("h2");
  const weatherFactDetail = document.createElement("h3");

  weatherFactName.id = "humidity-fact-name";
  weatherFactDetail.id = "humidity-fact-detail";

  weatherFactName.textContent = "% Humidity:";
  weatherFactDetail.textContent = cityData.main.humidity;

  weatherFactsContainer.appendChild(weatherFactName);
  weatherFactsContainer.appendChild(weatherFactDetail);
}
//============================================================================

const getWeatherByCity = (city) => {
  const apiByCity = `http://api.openweathermap.org/geo/1.0/direct?q=${city},US,&limit=5&appid=ac4519ef112c6f4cc9a4b2e01e44fe76&units=imperial`;
  return fetch(apiByCity)
    .then((res) => res.json())
    .then((data) => data);
};
const getWeatherByLat = (lat, lon) => {
  const apiByLat = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&limit=5&appid=ac4519ef112c6f4cc9a4b2e01e44fe76&units=imperial`;
  return fetch(apiByLat)
    .then((res) => res.json())
    .then((data) => data);
};
const getWeatherByZip = (zip) => {
  const apiByZip = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=ac4519ef112c6f4cc9a4b2e01e44fe76&units=imperial`;
  return fetch(apiByZip)
    .then((res) => res.json())
    .then((data) => data);
};

//==================  BACKUP VERSION 10/6 9:06am =====================================
// // 10/5 After initial search and city screen render, cannot complete search
// // using city/state from that city screen. Error 'wrong latitude'

// // After searching by city, if only 1 city is returned
// // THINK ITS FIXED!
// // tomorrow => new pics for clear (maybe with a sun) and daytime rain
// // work on nightmode if there's time and no bugs (big if)

// let cityData = {};
// let stateArray = [];

// // Elements
// const cityForm = document.querySelector("#city-form");
// const inputText = document.querySelector("#input-text");
// const homeBanner = document.querySelector("#home-banner");
// const cityPage = document.querySelector("#city-page");
// const citySubmit = document.querySelector("#submit-button");

// // City page elements
// const cityBanner = document.querySelector("#city-banner");
// const cityName = document.querySelector("#city-name");
// const currentTemp = document.querySelector("#current-temp");
// const humidity = document.querySelector("#humidity");
// const dailyHigh = document.querySelector("#daily-high");
// const dailyLow = document.querySelector("#daily-low");
// const feelsLike = document.querySelector("#feels-like");
// const windSpeed = document.querySelector("#wind-speed");
// const weatherFactsContainer = document.querySelector("#weather-facts");

// // Elements Generated in Functions
// // select state menu has id (#city-menu)
// // weather fact name id = #weather-fact-name (from generateFirstWeatherFact())
// // weather fact detail id = #weather-fact-detail (from generateFirstWeatherFact())

// cityForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   if (Number(inputText.value)) {
//     // ZipCode submitted

//     getWeatherByZip(inputText.value).then((data) => {
//       console.log("data: ", data);
//       cityData = data;
//       inputText.value = "";

//       //Collapse home banner and display city details
//       homeBanner.style.display = "none";
//       cityPage.style.display = "block";

//       //Change city banner based on weather
//       const weatherStatus = cityData.weather[0].main;
//       console.log(cityData.weather);
//       console.log("city: ", cityData.name);
//       console.log("weatherStatus: ", weatherStatus);

//       if (weatherStatus === "Clouds") {
//         console.log("clouds banner");
//         cityBanner.classList = "clouds";
//         cityBanner.textContent = "Cloudy";
//       } else if (weatherStatus === "Rain") {
//         console.log("rain banner");
//         cityBanner.classList = "rain";
//         cityBanner.textContent = "Rain";
//       } else if (weatherStatus === "Mist") {
//         console.log("mist banner");
//         cityBanner.classList = "mist";
//         cityBanner.textContent = "Misty";
//       } else if (weatherStatus === "Clear") {
//         console.log("clear banner");
//         cityBanner.classList = "clear";
//         cityBanner.textContent = "Clear";
//       } else if (weatherStatus === "Snow") {
//         console.log("snow banner");
//         cityBanner.classList = "snow";
//         cityBanner.textContent = "Snow";
//       }

//       renderData();
//     });

//     // City Name submitted
//   } else if (!document.querySelector("#city-menu")) {
//     getWeatherByCity(inputText.value).then((data) => {
//       console.log("fetch worked: ", data);
//       cityData = data;

//       if (data.length > 1) {
//         citySubmit.style.display = "none";

//         const dropDown = document.createElement("select");
//         const firstOption = document.createElement("option");

//         dropDown.id = "city-menu";
//         cityForm.append(dropDown);

//         firstOption.textContent = "Select State";
//         dropDown.appendChild(firstOption);

//         data.forEach((city) => {
//           stateArray.push(city.state);
//           const option = document.createElement("option");

//           option.textContent = city.state;
//           dropDown.appendChild(option);
//         });

//         dropDownListener(dropDown);
//       } else console.log("one city returned");
//     });
//   } else {
//     console.log("You shouldnt be here");
//   }
//   function dropDownListener(selectMenu) {
//     console.log("stateArray: ", stateArray);

//     selectMenu.addEventListener("change", (e) => {
//       console.log("lisening to change event");
//       const stateArrayIndex = e.target.options.selectedIndex - 1;
//       const selectedState = stateArray[stateArrayIndex];

//       for (let city of cityData) {
//         console.log("Just outside of for loop");
//         if (city.state === selectedState) {
//           console.log("city.state", city.state);
//           console.log("selectedState", selectedState);
//           cityData = city;
//         }
//         console.log("cityData after for loop: ", cityData);
//       }

//       // Collapses home banner and displays city page
//       homeBanner.style.display = "none";
//       cityPage.style.display = "block";
//       citySubmit.style.display = "inline";
//       inputText.value = "";
//       selectMenu.remove();

//       console.log("heres your city: ", cityData);
//       console.log("cityData.lat: ", cityData.lat);

//       getWeatherByLat(cityData.lat.toFixed(6), cityData.lon.toFixed(6)).then(
//         (data) => {
//           console.log("city ", data);
//           console.log("cityData: ", cityData);
//           const actualCity = cityData.name;
//           console.log("actualCity: ", actualCity);
//           cityData = data;
//           renderData(actualCity);

//           //Change city banner based on weather
//           const weatherStatus = cityData.weather[0].main;
//           console.log(cityData.weather);
//           console.log("city: ", cityData.name);
//           console.log("weatherStatus: ", weatherStatus);

//           if (weatherStatus === "Clouds") {
//             console.log("clouds banner");
//             cityBanner.classList = "clouds";
//             cityBanner.textContent = "Cloudy";
//           } else if (weatherStatus === "Rain") {
//             console.log("rain banner");
//             cityBanner.classList = "rain";
//             cityBanner.textContent = "Rain";
//           } else if (weatherStatus === "Mist") {
//             console.log("mist banner");
//             cityBanner.classList = "mist";
//             cityBanner.textContent = "Misty";
//           } else if (weatherStatus === "Clear") {
//             console.log("clear banner");
//             cityBanner.classList = "clear";
//             cityBanner.textContent = "Clear";
//           } else if (weatherStatus === "Snow") {
//             console.log("snow banner");
//             cityBanner.classList = "snow";
//             cityBanner.textContent = "Snow";
//           }
//         }
//       );
//     });
//   }
// });

// function renderData(optionalCityName) {
//   currentTemp.textContent = `${cityData.main.temp.toFixed(0)}°`;
//   dailyHigh.textContent = `${cityData.main.temp_max.toFixed(0)}°`;
//   dailyLow.textContent = `${cityData.main.temp_min.toFixed(0)}°`;
//   console.log("cityData.name: ", cityData.name);
//   console.log("optionalCityName: ", optionalCityName);
//   if (cityData.name !== optionalCityName && optionalCityName !== undefined) {
//     cityName.textContent = optionalCityName;
//   } else cityName.textContent = cityData.name;
//   stateArray = [];
//   weatherScrolling();
// }

// // Optional weather data in #weather-facts-container via arrow keys
// //
// function weatherScrolling() {
//   console.log("weatherScrolling running");
//   console.log(cityData);

//   if (!weatherFactsContainer.hasChildNodes()) {
//     generateFeelsLikeFact();
//   }

//   document.addEventListener("keydown", (e) => {
//     // adding ifs for functions 'generate${Different}Facts'
//     // Feels like data renders on form submit, then keydowns to toggle between data
//     if (e.key === "ArrowRight") {
//       console.log("ArrowRight");
//       if (document.querySelector("#feels-like-fact-name")) {
//         generateHumidityFact();
//       } else if (document.querySelector("#humidity-fact-name")) {
//         generateWindSpeedFact();
//       } else if (document.querySelector("#wind-speed-fact-name")) {
//         generateFeelsLikeFact();
//       }
//     }
//     if (e.key === "ArrowLeft") {
//       console.log("ArrowLeft");
//       if (document.querySelector("#feels-like-fact-name")) {
//         generateWindSpeedFact();
//       } else if (document.querySelector("#humidity-fact-name")) {
//         generateFeelsLikeFact();
//       } else if (document.querySelector("#wind-speed-fact-name")) {
//         generateHumidityFact();
//       }
//     }
//   });
// }

// function generateFeelsLikeFact() {
//   console.log("feels like");
//   if (weatherFactsContainer.hasChildNodes()) {
//     weatherFactsContainer.innerHTML = "";
//   }
//   // add class to first weatherFact and to subsequent facts
//   // for similar css styling
//   const weatherFactName = document.createElement("h2");
//   const weatherFactDetail = document.createElement("h3");

//   weatherFactName.id = "feels-like-fact-name";
//   weatherFactDetail.id = "feels-like-fact-detail";

//   weatherFactName.textContent = "Currently Feels Like:";
//   weatherFactDetail.textContent = `${cityData.main.feels_like.toFixed(0)}°`;

//   weatherFactsContainer.appendChild(weatherFactName);
//   weatherFactsContainer.appendChild(weatherFactDetail);
// }

// function generateWindSpeedFact() {
//   console.log("wind speed");
//   if (weatherFactsContainer.hasChildNodes()) {
//     weatherFactsContainer.innerHTML = "";
//   }
//   // add class to first weatherFact and to subsequent facts
//   // for similar css styling
//   const weatherFactName = document.createElement("h2");
//   const weatherFactDetail = document.createElement("h3");

//   weatherFactName.id = "wind-speed-fact-name";
//   weatherFactDetail.id = "wind-speed-fact-detail";

//   weatherFactName.textContent = "Wind Speed:";
//   weatherFactDetail.textContent = `${cityData.wind.speed.toFixed(0)}mph`;

//   weatherFactsContainer.appendChild(weatherFactName);
//   weatherFactsContainer.appendChild(weatherFactDetail);
// }

// function generateHumidityFact() {
//   console.log("humidity");
//   if (weatherFactsContainer.hasChildNodes()) {
//     weatherFactsContainer.innerHTML = "";
//   }
//   // add class to first weatherFact and to subsequent facts
//   // for similar css styling
//   const weatherFactName = document.createElement("h2");
//   const weatherFactDetail = document.createElement("h3");

//   weatherFactName.id = "humidity-fact-name";
//   weatherFactDetail.id = "humidity-fact-detail";

//   weatherFactName.textContent = "% Humidity:";
//   weatherFactDetail.textContent = cityData.main.humidity;

//   weatherFactsContainer.appendChild(weatherFactName);
//   weatherFactsContainer.appendChild(weatherFactDetail);
// }
// //============================================================================

// const getWeatherByCity = (city) => {
//   const apiByCity = `http://api.openweathermap.org/geo/1.0/direct?q=${city},US,&limit=5&appid=ac4519ef112c6f4cc9a4b2e01e44fe76&units=imperial`;
//   return fetch(apiByCity)
//     .then((res) => res.json())
//     .then((data) => data);
// };
// const getWeatherByLat = (lat, lon) => {
//   const apiByLat = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&limit=5&appid=ac4519ef112c6f4cc9a4b2e01e44fe76&units=imperial`;
//   return fetch(apiByLat)
//     .then((res) => res.json())
//     .then((data) => data);
// };
// const getWeatherByZip = (zip) => {
//   const apiByZip = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=ac4519ef112c6f4cc9a4b2e01e44fe76&units=imperial`;
//   return fetch(apiByZip)
//     .then((res) => res.json())
//     .then((data) => data);
// };

//========== BACKUP CSS STYLES 10/5  ===============================
// html {
//     font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
//       Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
//     font-size: 62.5%;
//     color: #222;
//     --top-bar-color: #eaeaea;
//     --main-bg-color: rgb(215, 219, 220);
//     --secondary-bg-color: rgb(220, 219, 219);
//     --tertiary-bg-color: rgb(228, 101, 101);
//     --button-color: #4eacfe;
//   }

//   body {
//     margin: 0;
//     padding: 0;
//     background-color: var(--main-bg-color);
//   }

//   #top-bar {
//     display: flex;
//     justify-content: space-between;
//     background-color: var(--top-bar-color);
//   }

//   #weather-text {
//     margin: 0;
//     padding-left: 10rem;
//     font-size: 4rem;
//   }

//   /*=======  FORM STYLES ===========================*/
//   #city-form {
//     padding: 1rem 5rem 1rem 0;
//   }

//   #input-text {
//     padding: 0.5rem 0.5rem 0.5rem 0.5rem;
//     border-radius: 5px;
//     margin-right: 0.5rem;
//     border: none;
//     outline: none;
//   }

//   #submit-button {
//     padding: 0.6rem 1.8rem;
//     border: none;
//     border-radius: 15px;
//     background-color: var(--button-color);
//   }

//   #submit-button:active {
//     background-color: #3c85c5;
//   }

//   #city-menu {
//     /* ==> select menu rendered in js upon city submission  */
//     padding: 0.5rem 0.8rem;
//     border-radius: 8px;
//     outline: none;
//   }
//   /*======================================================*/
//   #home-banner {
//     background-image: url("./images/sample-home-banner.jpg");
//     background-size: cover;
//     background-repeat: no-repeat;
//     height: 60vh;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-size: 4rem;
//   }

//   #home-banner h1 {
//     text-shadow: 2px 2px 5px rgba(255, 255, 254, 1);
//   }

//   #city-banner {
//     height: 13rem;
//     display: flex;
//     justify-content: end;
//     align-items: end;
//   }

//   #city-page {
//     display: none;

//     /* hidden until form submit
//       change style of visibility via
//       form submit event */
//     height: 100vh;
//   }

//   #city-temps {
//     /*background-color: var(--secondary-bg-color);*/
//     /*background-color: #0099ff;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3CradialGradient id='a' cx='800' cy='371' r='14.5%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230099ff'/%3E%3Cstop offset='1' stop-color='%2304C'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='800' cy='371' r='44%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230EF' stop-opacity='1'/%3E%3Cstop offset='1' stop-color='%230EF' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1600' height='900'/%3E%3Cg fill='none' stroke='%2303E' stroke-width='2.5' stroke-miterlimit='10' stroke-opacity='0.94'%3E%3Cpolygon points='2277.4 1152 800-1407-677.4 1152'/%3E%3Cpolygon points='800-1372.9-648.8 1136.5 2248.8 1136.5'/%3E%3Cpolygon points='800-1338.8-620.2 1121.1 2220.2 1121.1'/%3E%3Cpolygon points='800-1304.7-591.6 1105.6 2191.6 1105.6'/%3E%3Cpolygon points='800-1270.6-563 1090.2 2163 1090.2'/%3E%3Cpolygon points='800-1236.5-534.4 1074.7 2134.4 1074.7'/%3E%3Cpolygon points='800-1202.4-505.8 1059.3 2105.8 1059.3'/%3E%3Cpolygon points='800-1168.3-477.2 1043.8 2077.2 1043.8'/%3E%3Cpolygon points='800-1134.2-448.6 1028.4 2048.6 1028.4'/%3E%3Cpolygon points='800-1100.1-420 1012.9 2020 1012.9'/%3E%3Cpolygon points='800-1066-391.4 997.5 1991.4 997.5'/%3E%3Cpolygon points='800-1031.9-362.7 982 1962.7 982'/%3E%3Cpolygon points='800-997.8-334.1 966.6 1934.1 966.6'/%3E%3Cpolygon points='800-963.7-305.5 951.1 1905.5 951.1'/%3E%3Cpolygon points='800-929.6-276.9 935.7 1876.9 935.7'/%3E%3Cpolygon points='800-895.5-248.3 920.2 1848.3 920.2'/%3E%3Cpolygon points='800-861.4-219.7 904.7 1819.7 904.7'/%3E%3Cpolygon points='800-827.3-191.1 889.3 1791.1 889.3'/%3E%3Cpolygon points='800-793.2-162.5 873.8 1762.5 873.8'/%3E%3Cpolygon points='800-759.1-133.9 858.4 1733.9 858.4'/%3E%3Cpolygon points='800-725-105.3 842.9 1705.3 842.9'/%3E%3Cpolygon points='800-690.9-76.7 827.5 1676.7 827.5'/%3E%3Cpolygon points='800-656.8-48.1 812 1648.1 812'/%3E%3Cpolygon points='800-622.7-19.4 796.6 1619.4 796.6'/%3E%3Cpolygon points='800-588.6 9.2 781.1 1590.8 781.1'/%3E%3Cpolygon points='800-554.5 37.8 765.7 1562.2 765.7'/%3E%3Cpolygon points='800-520.5 66.4 750.2 1533.6 750.2'/%3E%3Cpolygon points='800-486.4 95 734.8 1505 734.8'/%3E%3Cpolygon points='800-452.3 123.6 719.3 1476.4 719.3'/%3E%3Cpolygon points='800-418.2 152.2 703.9 1447.8 703.9'/%3E%3Cpolygon points='800-384.1 180.8 688.4 1419.2 688.4'/%3E%3Cpolygon points='800-350 209.4 673 1390.6 673'/%3E%3Cpolygon points='800-315.9 238 657.5 1362 657.5'/%3E%3Cpolygon points='800-281.8 266.6 642 1333.4 642'/%3E%3Cpolygon points='800-247.7 295.2 626.6 1304.8 626.6'/%3E%3Cpolygon points='800-213.6 323.9 611.1 1276.1 611.1'/%3E%3Cpolygon points='800-179.5 352.5 595.7 1247.5 595.7'/%3E%3Cpolygon points='800-145.4 381.1 580.2 1218.9 580.2'/%3E%3Cpolygon points='800-111.3 409.7 564.8 1190.3 564.8'/%3E%3Cpolygon points='800-77.2 438.3 549.3 1161.7 549.3'/%3E%3Cpolygon points='800-43.1 466.9 533.9 1133.1 533.9'/%3E%3Cpolygon points='800-9 495.5 518.4 1104.5 518.4'/%3E%3Cpolygon points='800 25.1 524.1 503 1075.9 503'/%3E%3Cpolygon points='800 59.2 552.7 487.5 1047.3 487.5'/%3E%3Cpolygon points='800 93.3 581.3 472.1 1018.7 472.1'/%3E%3Cpolygon points='800 127.4 609.9 456.6 990.1 456.6'/%3E%3Cpolygon points='800 161.5 638.5 441.2 961.5 441.2'/%3E%3Cpolygon points='800 195.6 667.2 425.7 932.8 425.7'/%3E%3Cpolygon points='800 229.7 695.8 410.2 904.2 410.2'/%3E%3Cpolygon points='800 263.8 724.4 394.8 875.6 394.8'/%3E%3Cpolygon points='800 297.9 753 379.3 847 379.3'/%3E%3Cpolygon points='800 332 781.6 363.9 818.4 363.9'/%3E%3C/g%3E%3Crect fill-opacity='0.94' fill='url(%23b)' width='1600' height='900'/%3E%3C/svg%3E");
//     background-attachment: fixed;
//     background-size: cover;*/
//     /*=============================*/
//     /*background-color: #0099ff;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3CradialGradient id='a' cx='800' cy='371' r='18.4%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230099ff'/%3E%3Cstop offset='1' stop-color='%2304C'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='800' cy='371' r='52.9%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230EF' stop-opacity='1'/%3E%3Cstop offset='1' stop-color='%230EF' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1600' height='900'/%3E%3Cg fill='none' stroke='%2303E' stroke-width='15' stroke-miterlimit='10' stroke-opacity='0.66'%3E%3Cpolygon points='2277.4 1152 800-1407-677.4 1152'/%3E%3Cpolygon points='800-1372.9-648.8 1136.5 2248.8 1136.5'/%3E%3Cpolygon points='800-1338.8-620.2 1121.1 2220.2 1121.1'/%3E%3Cpolygon points='800-1304.7-591.6 1105.6 2191.6 1105.6'/%3E%3Cpolygon points='800-1270.6-563 1090.2 2163 1090.2'/%3E%3Cpolygon points='800-1236.5-534.4 1074.7 2134.4 1074.7'/%3E%3Cpolygon points='800-1202.4-505.8 1059.3 2105.8 1059.3'/%3E%3Cpolygon points='800-1168.3-477.2 1043.8 2077.2 1043.8'/%3E%3Cpolygon points='800-1134.2-448.6 1028.4 2048.6 1028.4'/%3E%3Cpolygon points='800-1100.1-420 1012.9 2020 1012.9'/%3E%3Cpolygon points='800-1066-391.4 997.5 1991.4 997.5'/%3E%3Cpolygon points='800-1031.9-362.7 982 1962.7 982'/%3E%3Cpolygon points='800-997.8-334.1 966.6 1934.1 966.6'/%3E%3Cpolygon points='800-963.7-305.5 951.1 1905.5 951.1'/%3E%3Cpolygon points='800-929.6-276.9 935.7 1876.9 935.7'/%3E%3Cpolygon points='800-895.5-248.3 920.2 1848.3 920.2'/%3E%3Cpolygon points='800-861.4-219.7 904.7 1819.7 904.7'/%3E%3Cpolygon points='800-827.3-191.1 889.3 1791.1 889.3'/%3E%3Cpolygon points='800-793.2-162.5 873.8 1762.5 873.8'/%3E%3Cpolygon points='800-759.1-133.9 858.4 1733.9 858.4'/%3E%3Cpolygon points='800-725-105.3 842.9 1705.3 842.9'/%3E%3Cpolygon points='800-690.9-76.7 827.5 1676.7 827.5'/%3E%3Cpolygon points='800-656.8-48.1 812 1648.1 812'/%3E%3Cpolygon points='800-622.7-19.4 796.6 1619.4 796.6'/%3E%3Cpolygon points='800-588.6 9.2 781.1 1590.8 781.1'/%3E%3Cpolygon points='800-554.5 37.8 765.7 1562.2 765.7'/%3E%3Cpolygon points='800-520.5 66.4 750.2 1533.6 750.2'/%3E%3Cpolygon points='800-486.4 95 734.8 1505 734.8'/%3E%3Cpolygon points='800-452.3 123.6 719.3 1476.4 719.3'/%3E%3Cpolygon points='800-418.2 152.2 703.9 1447.8 703.9'/%3E%3Cpolygon points='800-384.1 180.8 688.4 1419.2 688.4'/%3E%3Cpolygon points='800-350 209.4 673 1390.6 673'/%3E%3Cpolygon points='800-315.9 238 657.5 1362 657.5'/%3E%3Cpolygon points='800-281.8 266.6 642 1333.4 642'/%3E%3Cpolygon points='800-247.7 295.2 626.6 1304.8 626.6'/%3E%3Cpolygon points='800-213.6 323.9 611.1 1276.1 611.1'/%3E%3Cpolygon points='800-179.5 352.5 595.7 1247.5 595.7'/%3E%3Cpolygon points='800-145.4 381.1 580.2 1218.9 580.2'/%3E%3Cpolygon points='800-111.3 409.7 564.8 1190.3 564.8'/%3E%3Cpolygon points='800-77.2 438.3 549.3 1161.7 549.3'/%3E%3Cpolygon points='800-43.1 466.9 533.9 1133.1 533.9'/%3E%3Cpolygon points='800-9 495.5 518.4 1104.5 518.4'/%3E%3Cpolygon points='800 25.1 524.1 503 1075.9 503'/%3E%3Cpolygon points='800 59.2 552.7 487.5 1047.3 487.5'/%3E%3Cpolygon points='800 93.3 581.3 472.1 1018.7 472.1'/%3E%3Cpolygon points='800 127.4 609.9 456.6 990.1 456.6'/%3E%3Cpolygon points='800 161.5 638.5 441.2 961.5 441.2'/%3E%3Cpolygon points='800 195.6 667.2 425.7 932.8 425.7'/%3E%3Cpolygon points='800 229.7 695.8 410.2 904.2 410.2'/%3E%3Cpolygon points='800 263.8 724.4 394.8 875.6 394.8'/%3E%3Cpolygon points='800 297.9 753 379.3 847 379.3'/%3E%3Cpolygon points='800 332 781.6 363.9 818.4 363.9'/%3E%3C/g%3E%3Crect fill-opacity='0.66' fill='url(%23b)' width='1600' height='900'/%3E%3C/svg%3E");
//     background-attachment: fixed;
//     background-size: cover;*/
//     /*=============================*/
//     /*background-color: #0099ff;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3CradialGradient id='a' cx='800' cy='371' r='18.4%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230099ff'/%3E%3Cstop offset='1' stop-color='%2304C'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='800' cy='371' r='52.9%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230EF' stop-opacity='1'/%3E%3Cstop offset='1' stop-color='%230EF' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1600' height='900'/%3E%3Cg fill='none' stroke='%2303E' stroke-width='1' stroke-miterlimit='10' stroke-opacity='0.66'%3E%3Cpolygon points='2277.4 1152 800-1407-677.4 1152'/%3E%3Cpolygon points='800-1372.9-648.8 1136.5 2248.8 1136.5'/%3E%3Cpolygon points='800-1338.8-620.2 1121.1 2220.2 1121.1'/%3E%3Cpolygon points='800-1304.7-591.6 1105.6 2191.6 1105.6'/%3E%3Cpolygon points='800-1270.6-563 1090.2 2163 1090.2'/%3E%3Cpolygon points='800-1236.5-534.4 1074.7 2134.4 1074.7'/%3E%3Cpolygon points='800-1202.4-505.8 1059.3 2105.8 1059.3'/%3E%3Cpolygon points='800-1168.3-477.2 1043.8 2077.2 1043.8'/%3E%3Cpolygon points='800-1134.2-448.6 1028.4 2048.6 1028.4'/%3E%3Cpolygon points='800-1100.1-420 1012.9 2020 1012.9'/%3E%3Cpolygon points='800-1066-391.4 997.5 1991.4 997.5'/%3E%3Cpolygon points='800-1031.9-362.7 982 1962.7 982'/%3E%3Cpolygon points='800-997.8-334.1 966.6 1934.1 966.6'/%3E%3Cpolygon points='800-963.7-305.5 951.1 1905.5 951.1'/%3E%3Cpolygon points='800-929.6-276.9 935.7 1876.9 935.7'/%3E%3Cpolygon points='800-895.5-248.3 920.2 1848.3 920.2'/%3E%3Cpolygon points='800-861.4-219.7 904.7 1819.7 904.7'/%3E%3Cpolygon points='800-827.3-191.1 889.3 1791.1 889.3'/%3E%3Cpolygon points='800-793.2-162.5 873.8 1762.5 873.8'/%3E%3Cpolygon points='800-759.1-133.9 858.4 1733.9 858.4'/%3E%3Cpolygon points='800-725-105.3 842.9 1705.3 842.9'/%3E%3Cpolygon points='800-690.9-76.7 827.5 1676.7 827.5'/%3E%3Cpolygon points='800-656.8-48.1 812 1648.1 812'/%3E%3Cpolygon points='800-622.7-19.4 796.6 1619.4 796.6'/%3E%3Cpolygon points='800-588.6 9.2 781.1 1590.8 781.1'/%3E%3Cpolygon points='800-554.5 37.8 765.7 1562.2 765.7'/%3E%3Cpolygon points='800-520.5 66.4 750.2 1533.6 750.2'/%3E%3Cpolygon points='800-486.4 95 734.8 1505 734.8'/%3E%3Cpolygon points='800-452.3 123.6 719.3 1476.4 719.3'/%3E%3Cpolygon points='800-418.2 152.2 703.9 1447.8 703.9'/%3E%3Cpolygon points='800-384.1 180.8 688.4 1419.2 688.4'/%3E%3Cpolygon points='800-350 209.4 673 1390.6 673'/%3E%3Cpolygon points='800-315.9 238 657.5 1362 657.5'/%3E%3Cpolygon points='800-281.8 266.6 642 1333.4 642'/%3E%3Cpolygon points='800-247.7 295.2 626.6 1304.8 626.6'/%3E%3Cpolygon points='800-213.6 323.9 611.1 1276.1 611.1'/%3E%3Cpolygon points='800-179.5 352.5 595.7 1247.5 595.7'/%3E%3Cpolygon points='800-145.4 381.1 580.2 1218.9 580.2'/%3E%3Cpolygon points='800-111.3 409.7 564.8 1190.3 564.8'/%3E%3Cpolygon points='800-77.2 438.3 549.3 1161.7 549.3'/%3E%3Cpolygon points='800-43.1 466.9 533.9 1133.1 533.9'/%3E%3Cpolygon points='800-9 495.5 518.4 1104.5 518.4'/%3E%3Cpolygon points='800 25.1 524.1 503 1075.9 503'/%3E%3Cpolygon points='800 59.2 552.7 487.5 1047.3 487.5'/%3E%3Cpolygon points='800 93.3 581.3 472.1 1018.7 472.1'/%3E%3Cpolygon points='800 127.4 609.9 456.6 990.1 456.6'/%3E%3Cpolygon points='800 161.5 638.5 441.2 961.5 441.2'/%3E%3Cpolygon points='800 195.6 667.2 425.7 932.8 425.7'/%3E%3Cpolygon points='800 229.7 695.8 410.2 904.2 410.2'/%3E%3Cpolygon points='800 263.8 724.4 394.8 875.6 394.8'/%3E%3Cpolygon points='800 297.9 753 379.3 847 379.3'/%3E%3Cpolygon points='800 332 781.6 363.9 818.4 363.9'/%3E%3C/g%3E%3Crect fill-opacity='0.66' fill='url(%23b)' width='1600' height='900'/%3E%3C/svg%3E");
//     background-attachment: fixed;
//     background-size: cover;*/
//     /*=============================*/
//     /*background-color: #0099ff;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='935' height='467.5' viewBox='0 0 160 80'%3E%3Cg fill='%2300EEFF' fill-opacity='0.71'%3E%3Cpolygon points='0 10 0 0 10 0'/%3E%3Cpolygon points='0 40 0 30 10 30'/%3E%3Cpolygon points='0 30 0 20 10 20'/%3E%3Cpolygon points='0 70 0 60 10 60'/%3E%3Cpolygon points='0 80 0 70 10 70'/%3E%3Cpolygon points='50 80 50 70 60 70'/%3E%3Cpolygon points='10 20 10 10 20 10'/%3E%3Cpolygon points='10 40 10 30 20 30'/%3E%3Cpolygon points='20 10 20 0 30 0'/%3E%3Cpolygon points='10 10 10 0 20 0'/%3E%3Cpolygon points='30 20 30 10 40 10'/%3E%3Cpolygon points='20 20 20 40 40 20'/%3E%3Cpolygon points='40 10 40 0 50 0'/%3E%3Cpolygon points='40 20 40 10 50 10'/%3E%3Cpolygon points='40 40 40 30 50 30'/%3E%3Cpolygon points='30 40 30 30 40 30'/%3E%3Cpolygon points='40 60 40 50 50 50'/%3E%3Cpolygon points='50 30 50 20 60 20'/%3E%3Cpolygon points='40 60 40 80 60 60'/%3E%3Cpolygon points='50 40 50 60 70 40'/%3E%3Cpolygon points='60 0 60 20 80 0'/%3E%3Cpolygon points='70 30 70 20 80 20'/%3E%3Cpolygon points='70 40 70 30 80 30'/%3E%3Cpolygon points='60 60 60 80 80 60'/%3E%3Cpolygon points='80 10 80 0 90 0'/%3E%3Cpolygon points='70 40 70 60 90 40'/%3E%3Cpolygon points='80 60 80 50 90 50'/%3E%3Cpolygon points='60 30 60 20 70 20'/%3E%3Cpolygon points='80 70 80 80 90 80 100 70'/%3E%3Cpolygon points='80 10 80 40 110 10'/%3E%3Cpolygon points='110 40 110 30 120 30'/%3E%3Cpolygon points='90 40 90 70 120 40'/%3E%3Cpolygon points='10 50 10 80 40 50'/%3E%3Cpolygon points='110 60 110 50 120 50'/%3E%3Cpolygon points='100 60 100 80 120 60'/%3E%3Cpolygon points='110 0 110 20 130 0'/%3E%3Cpolygon points='120 30 120 20 130 20'/%3E%3Cpolygon points='130 10 130 0 140 0'/%3E%3Cpolygon points='130 30 130 20 140 20'/%3E%3Cpolygon points='120 40 120 30 130 30'/%3E%3Cpolygon points='130 50 130 40 140 40'/%3E%3Cpolygon points='120 50 120 70 140 50'/%3E%3Cpolygon points='110 70 110 80 130 80 140 70'/%3E%3Cpolygon points='140 10 140 0 150 0'/%3E%3Cpolygon points='140 20 140 10 150 10'/%3E%3Cpolygon points='140 40 140 30 150 30'/%3E%3Cpolygon points='140 50 140 40 150 40'/%3E%3Cpolygon points='140 70 140 60 150 60'/%3E%3Cpolygon points='150 20 150 40 160 30 160 20'/%3E%3Cpolygon points='150 60 150 50 160 50'/%3E%3Cpolygon points='140 70 140 80 150 80 160 70'/%3E%3C/g%3E%3C/svg%3E");
//     /*=============================*/
//     /*background-color: #9be4ff;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 1200'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(0,660,545)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%238ed1ec'/%3E%3Cstop offset='0.02' stop-color='%239BE4FF'/%3E%3Cstop offset='0.02' stop-color='%2393dbfc'/%3E%3Cstop offset='0.032' stop-color='%239BE4FF'/%3E%3Cstop offset='0.032' stop-color='%237ebcdb'/%3E%3Cstop offset='0.056' stop-color='%239BE4FF'/%3E%3Cstop offset='0.056' stop-color='%2377bbe9'/%3E%3Cstop offset='0.07' stop-color='%239BE4FF'/%3E%3Cstop offset='0.07' stop-color='%237cc7fd'/%3E%3Cstop offset='0.1' stop-color='%239BE4FF'/%3E%3Cstop offset='0.1' stop-color='%237bb8d7'/%3E%3Cstop offset='0.126' stop-color='%239BE4FF'/%3E%3Cstop offset='0.126' stop-color='%2386c7e2'/%3E%3Cstop offset='0.142' stop-color='%239BE4FF'/%3E%3Cstop offset='0.142' stop-color='%238cd2f4'/%3E%3Cstop offset='0.159' stop-color='%239BE4FF'/%3E%3Cstop offset='0.159' stop-color='%2395dcf9'/%3E%3Cstop offset='0.17' stop-color='%239BE4FF'/%3E%3Cstop offset='0.17' stop-color='%238ed3f1'/%3E%3Cstop offset='0.197' stop-color='%239BE4FF'/%3E%3Cstop offset='0.197' stop-color='%2392d9f8'/%3E%3Cstop offset='0.218' stop-color='%239BE4FF'/%3E%3Cstop offset='0.218' stop-color='%2387caeb'/%3E%3Cstop offset='0.239' stop-color='%239BE4FF'/%3E%3Cstop offset='0.239' stop-color='%238dd0eb'/%3E%3Cstop offset='0.254' stop-color='%239BE4FF'/%3E%3Cstop offset='0.254' stop-color='%2395ddfb'/%3E%3Cstop offset='0.283' stop-color='%239BE4FF'/%3E%3Cstop offset='0.283' stop-color='%2384c3df'/%3E%3Cstop offset='0.294' stop-color='%239BE4FF'/%3E%3Cstop offset='0.294' stop-color='%2398e1fe'/%3E%3Cstop offset='0.305' stop-color='%239BE4FF'/%3E%3Cstop offset='0.305' stop-color='%2392dbfd'/%3E%3Cstop offset='0.332' stop-color='%239BE4FF'/%3E%3Cstop offset='0.332' stop-color='%2390d6f3'/%3E%3Cstop offset='0.346' stop-color='%239BE4FF'/%3E%3Cstop offset='0.346' stop-color='%237bbfea'/%3E%3Cstop offset='0.362' stop-color='%239BE4FF'/%3E%3Cstop offset='0.362' stop-color='%237cc2f0'/%3E%3Cstop offset='0.381' stop-color='%239BE4FF'/%3E%3Cstop offset='0.381' stop-color='%237ac4f8'/%3E%3Cstop offset='0.415' stop-color='%239BE4FF'/%3E%3Cstop offset='0.415' stop-color='%237ec0e7'/%3E%3Cstop offset='0.428' stop-color='%239BE4FF'/%3E%3Cstop offset='0.428' stop-color='%2394dbf8'/%3E%3Cstop offset='0.442' stop-color='%239BE4FF'/%3E%3Cstop offset='0.442' stop-color='%237bc6ff'/%3E%3Cstop offset='0.456' stop-color='%239BE4FF'/%3E%3Cstop offset='0.456' stop-color='%2394dcfb'/%3E%3Cstop offset='0.498' stop-color='%239BE4FF'/%3E%3Cstop offset='0.498' stop-color='%2389cbe8'/%3E%3Cstop offset='0.511' stop-color='%239BE4FF'/%3E%3Cstop offset='0.511' stop-color='%2392d9f6'/%3E%3Cstop offset='0.532' stop-color='%239BE4FF'/%3E%3Cstop offset='0.532' stop-color='%2382c4e7'/%3E%3Cstop offset='0.541' stop-color='%239BE4FF'/%3E%3Cstop offset='0.541' stop-color='%2383cbf6'/%3E%3Cstop offset='0.56' stop-color='%239BE4FF'/%3E%3Cstop offset='0.56' stop-color='%238ed4f6'/%3E%3Cstop offset='0.581' stop-color='%239BE4FF'/%3E%3Cstop offset='0.581' stop-color='%237ac3f7'/%3E%3Cstop offset='0.6' stop-color='%239BE4FF'/%3E%3Cstop offset='0.6' stop-color='%237dc7fa'/%3E%3Cstop offset='0.618' stop-color='%239BE4FF'/%3E%3Cstop offset='0.618' stop-color='%2389cae5'/%3E%3Cstop offset='0.656' stop-color='%239BE4FF'/%3E%3Cstop offset='0.656' stop-color='%238ad3fd'/%3E%3Cstop offset='0.679' stop-color='%239BE4FF'/%3E%3Cstop offset='0.679' stop-color='%2388cef4'/%3E%3Cstop offset='0.689' stop-color='%239BE4FF'/%3E%3Cstop offset='0.689' stop-color='%2391dbfe'/%3E%3Cstop offset='0.720' stop-color='%239BE4FF'/%3E%3Cstop offset='0.720' stop-color='%2395ddfb'/%3E%3Cstop offset='0.734' stop-color='%239BE4FF'/%3E%3Cstop offset='0.734' stop-color='%2388cae8'/%3E%3Cstop offset='0.748' stop-color='%239BE4FF'/%3E%3Cstop offset='0.748' stop-color='%2388cff5'/%3E%3Cstop offset='0.764' stop-color='%239BE4FF'/%3E%3Cstop offset='0.764' stop-color='%2378b1cd'/%3E%3Cstop offset='0.788' stop-color='%239BE4FF'/%3E%3Cstop offset='0.788' stop-color='%2384ccf8'/%3E%3Cstop offset='0.808' stop-color='%239BE4FF'/%3E%3Cstop offset='0.808' stop-color='%2388cced'/%3E%3Cstop offset='0.831' stop-color='%239BE4FF'/%3E%3Cstop offset='0.831' stop-color='%2384c9ef'/%3E%3Cstop offset='0.856' stop-color='%239BE4FF'/%3E%3Cstop offset='0.856' stop-color='%237fc3e9'/%3E%3Cstop offset='0.872' stop-color='%239BE4FF'/%3E%3Cstop offset='0.872' stop-color='%237bbee8'/%3E%3Cstop offset='0.894' stop-color='%239BE4FF'/%3E%3Cstop offset='0.894' stop-color='%2389d0f5'/%3E%3Cstop offset='0.914' stop-color='%239BE4FF'/%3E%3Cstop offset='0.914' stop-color='%2386cbef'/%3E%3Cstop offset='0.942' stop-color='%239BE4FF'/%3E%3Cstop offset='0.942' stop-color='%238dd2f0'/%3E%3Cstop offset='0.957' stop-color='%239BE4FF'/%3E%3Cstop offset='0.957' stop-color='%2394dbf9'/%3E%3Cstop offset='0.973' stop-color='%239BE4FF'/%3E%3Cstop offset='0.973' stop-color='%2392d7f4'/%3E%3Cstop offset='1' stop-color='%239BE4FF'/%3E%3Cstop offset='1' stop-color='%238dd3f5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' x='0' y='0' width='100%25' height='100%25'/%3E%3C/svg%3E");
//     background-attachment: fixed;
//     background-size: cover;
//     /*=============================*/
//     background-color: #9be4ff;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 1200'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(0,660,545)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%2395dcf7'/%3E%3Cstop offset='0.02' stop-color='%239BE4FF'/%3E%3Cstop offset='0.02' stop-color='%2397e0fd'/%3E%3Cstop offset='0.032' stop-color='%239BE4FF'/%3E%3Cstop offset='0.032' stop-color='%238fd3ef'/%3E%3Cstop offset='0.056' stop-color='%239BE4FF'/%3E%3Cstop offset='0.056' stop-color='%238cd3f5'/%3E%3Cstop offset='0.07' stop-color='%239BE4FF'/%3E%3Cstop offset='0.07' stop-color='%238ed8fe'/%3E%3Cstop offset='0.1' stop-color='%239BE4FF'/%3E%3Cstop offset='0.1' stop-color='%238ed1ee'/%3E%3Cstop offset='0.126' stop-color='%239BE4FF'/%3E%3Cstop offset='0.126' stop-color='%2392d7f2'/%3E%3Cstop offset='0.142' stop-color='%239BE4FF'/%3E%3Cstop offset='0.142' stop-color='%2394dcfa'/%3E%3Cstop offset='0.159' stop-color='%239BE4FF'/%3E%3Cstop offset='0.159' stop-color='%2398e1fc'/%3E%3Cstop offset='0.17' stop-color='%239BE4FF'/%3E%3Cstop offset='0.17' stop-color='%2395dcf9'/%3E%3Cstop offset='0.197' stop-color='%239BE4FF'/%3E%3Cstop offset='0.197' stop-color='%2397dffc'/%3E%3Cstop offset='0.218' stop-color='%239BE4FF'/%3E%3Cstop offset='0.218' stop-color='%2392d9f6'/%3E%3Cstop offset='0.239' stop-color='%239BE4FF'/%3E%3Cstop offset='0.239' stop-color='%2395dbf6'/%3E%3Cstop offset='0.254' stop-color='%239BE4FF'/%3E%3Cstop offset='0.254' stop-color='%2398e1fd'/%3E%3Cstop offset='0.283' stop-color='%239BE4FF'/%3E%3Cstop offset='0.283' stop-color='%2391d6f1'/%3E%3Cstop offset='0.294' stop-color='%239BE4FF'/%3E%3Cstop offset='0.294' stop-color='%239ae2ff'/%3E%3Cstop offset='0.305' stop-color='%239BE4FF'/%3E%3Cstop offset='0.305' stop-color='%2397e0fe'/%3E%3Cstop offset='0.332' stop-color='%239BE4FF'/%3E%3Cstop offset='0.332' stop-color='%2396defa'/%3E%3Cstop offset='0.346' stop-color='%239BE4FF'/%3E%3Cstop offset='0.346' stop-color='%238ed4f6'/%3E%3Cstop offset='0.362' stop-color='%239BE4FF'/%3E%3Cstop offset='0.362' stop-color='%238ed5f8'/%3E%3Cstop offset='0.381' stop-color='%239BE4FF'/%3E%3Cstop offset='0.381' stop-color='%238dd6fc'/%3E%3Cstop offset='0.415' stop-color='%239BE4FF'/%3E%3Cstop offset='0.415' stop-color='%238ed5f5'/%3E%3Cstop offset='0.428' stop-color='%239BE4FF'/%3E%3Cstop offset='0.428' stop-color='%2398e0fc'/%3E%3Cstop offset='0.442' stop-color='%239BE4FF'/%3E%3Cstop offset='0.442' stop-color='%238dd7ff'/%3E%3Cstop offset='0.456' stop-color='%239BE4FF'/%3E%3Cstop offset='0.456' stop-color='%2398e0fd'/%3E%3Cstop offset='0.498' stop-color='%239BE4FF'/%3E%3Cstop offset='0.498' stop-color='%2393d9f5'/%3E%3Cstop offset='0.511' stop-color='%239BE4FF'/%3E%3Cstop offset='0.511' stop-color='%2397dffb'/%3E%3Cstop offset='0.532' stop-color='%239BE4FF'/%3E%3Cstop offset='0.532' stop-color='%2390d6f4'/%3E%3Cstop offset='0.541' stop-color='%239BE4FF'/%3E%3Cstop offset='0.541' stop-color='%2391d9fb'/%3E%3Cstop offset='0.56' stop-color='%239BE4FF'/%3E%3Cstop offset='0.56' stop-color='%2395ddfb'/%3E%3Cstop offset='0.581' stop-color='%239BE4FF'/%3E%3Cstop offset='0.581' stop-color='%238dd6fc'/%3E%3Cstop offset='0.6' stop-color='%239BE4FF'/%3E%3Cstop offset='0.6' stop-color='%238ed7fd'/%3E%3Cstop offset='0.618' stop-color='%239BE4FF'/%3E%3Cstop offset='0.618' stop-color='%2393d9f4'/%3E%3Cstop offset='0.656' stop-color='%239BE4FF'/%3E%3Cstop offset='0.656' stop-color='%2393ddfe'/%3E%3Cstop offset='0.679' stop-color='%239BE4FF'/%3E%3Cstop offset='0.679' stop-color='%2393dbfa'/%3E%3Cstop offset='0.689' stop-color='%239BE4FF'/%3E%3Cstop offset='0.689' stop-color='%2397e0ff'/%3E%3Cstop offset='0.720' stop-color='%239BE4FF'/%3E%3Cstop offset='0.720' stop-color='%2398e1fd'/%3E%3Cstop offset='0.734' stop-color='%239BE4FF'/%3E%3Cstop offset='0.734' stop-color='%2393d9f5'/%3E%3Cstop offset='0.748' stop-color='%239BE4FF'/%3E%3Cstop offset='0.748' stop-color='%2393dbfa'/%3E%3Cstop offset='0.764' stop-color='%239BE4FF'/%3E%3Cstop offset='0.764' stop-color='%238ccfea'/%3E%3Cstop offset='0.788' stop-color='%239BE4FF'/%3E%3Cstop offset='0.788' stop-color='%2391d9fc'/%3E%3Cstop offset='0.808' stop-color='%239BE4FF'/%3E%3Cstop offset='0.808' stop-color='%2393daf7'/%3E%3Cstop offset='0.831' stop-color='%239BE4FF'/%3E%3Cstop offset='0.831' stop-color='%2391d8f8'/%3E%3Cstop offset='0.856' stop-color='%239BE4FF'/%3E%3Cstop offset='0.856' stop-color='%238fd6f5'/%3E%3Cstop offset='0.872' stop-color='%239BE4FF'/%3E%3Cstop offset='0.872' stop-color='%238dd4f5'/%3E%3Cstop offset='0.894' stop-color='%239BE4FF'/%3E%3Cstop offset='0.894' stop-color='%2393dbfa'/%3E%3Cstop offset='0.914' stop-color='%239BE4FF'/%3E%3Cstop offset='0.914' stop-color='%2392d9f8'/%3E%3Cstop offset='0.942' stop-color='%239BE4FF'/%3E%3Cstop offset='0.942' stop-color='%2395dcf8'/%3E%3Cstop offset='0.957' stop-color='%239BE4FF'/%3E%3Cstop offset='0.957' stop-color='%2398e0fc'/%3E%3Cstop offset='0.973' stop-color='%239BE4FF'/%3E%3Cstop offset='0.973' stop-color='%2397defa'/%3E%3Cstop offset='1' stop-color='%239BE4FF'/%3E%3Cstop offset='1' stop-color='%2395ddfa'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' x='0' y='0' width='100%25' height='100%25'/%3E%3C/svg%3E");
//     background-attachment: fixed;
//     background-size: cover;
//     /*=============================*/

//     /*background-color: #ffffff;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='400' cy='400' r='50%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%230EF'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='400' cy='400' r='70%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%230FF'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='800'/%3E%3Cg fill-opacity='.8'%3E%3Cpath fill='url(%23b)' d='M998.7 439.2c1.7-26.5 1.7-52.7 0.1-78.5L401 399.9c0 0 0-0.1 0-0.1l587.6-116.9c-5.1-25.9-11.9-51.2-20.3-75.8L400.9 399.7c0 0 0-0.1 0-0.1l537.3-265c-11.6-23.5-24.8-46.2-39.3-67.9L400.8 399.5c0 0 0-0.1-0.1-0.1l450.4-395c-17.3-19.7-35.8-38.2-55.5-55.5l-395 450.4c0 0-0.1 0-0.1-0.1L733.4-99c-21.7-14.5-44.4-27.6-68-39.3l-265 537.4c0 0-0.1 0-0.1 0l192.6-567.4c-24.6-8.3-49.9-15.1-75.8-20.2L400.2 399c0 0-0.1 0-0.1 0l39.2-597.7c-26.5-1.7-52.7-1.7-78.5-0.1L399.9 399c0 0-0.1 0-0.1 0L282.9-188.6c-25.9 5.1-51.2 11.9-75.8 20.3l192.6 567.4c0 0-0.1 0-0.1 0l-265-537.3c-23.5 11.6-46.2 24.8-67.9 39.3l332.8 498.1c0 0-0.1 0-0.1 0.1L4.4-51.1C-15.3-33.9-33.8-15.3-51.1 4.4l450.4 395c0 0 0 0.1-0.1 0.1L-99 66.6c-14.5 21.7-27.6 44.4-39.3 68l537.4 265c0 0 0 0.1 0 0.1l-567.4-192.6c-8.3 24.6-15.1 49.9-20.2 75.8L399 399.8c0 0 0 0.1 0 0.1l-597.7-39.2c-1.7 26.5-1.7 52.7-0.1 78.5L399 400.1c0 0 0 0.1 0 0.1l-587.6 116.9c5.1 25.9 11.9 51.2 20.3 75.8l567.4-192.6c0 0 0 0.1 0 0.1l-537.3 265c11.6 23.5 24.8 46.2 39.3 67.9l498.1-332.8c0 0 0 0.1 0.1 0.1l-450.4 395c17.3 19.7 35.8 38.2 55.5 55.5l395-450.4c0 0 0.1 0 0.1 0.1L66.6 899c21.7 14.5 44.4 27.6 68 39.3l265-537.4c0 0 0.1 0 0.1 0L207.1 968.3c24.6 8.3 49.9 15.1 75.8 20.2L399.8 401c0 0 0.1 0 0.1 0l-39.2 597.7c26.5 1.7 52.7 1.7 78.5 0.1L400.1 401c0 0 0.1 0 0.1 0l116.9 587.6c25.9-5.1 51.2-11.9 75.8-20.3L400.3 400.9c0 0 0.1 0 0.1 0l265 537.3c23.5-11.6 46.2-24.8 67.9-39.3L400.5 400.8c0 0 0.1 0 0.1-0.1l395 450.4c19.7-17.3 38.2-35.8 55.5-55.5l-450.4-395c0 0 0-0.1 0.1-0.1L899 733.4c14.5-21.7 27.6-44.4 39.3-68l-537.4-265c0 0 0-0.1 0-0.1l567.4 192.6c8.3-24.6 15.1-49.9 20.2-75.8L401 400.2c0 0 0-0.1 0-0.1L998.7 439.2z'/%3E%3C/g%3E%3C/svg%3E");
//     background-attachment: fixed;
//     background-size: cover;*/
//     /*============================*/
//     /*background-color: #ffffff;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='400' cy='400' r='42.1%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%230EF'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='400' cy='400' r='0%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%230FF'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='800'/%3E%3Cg %3E%3Cpath fill='url(%23b)' d='M998.7 439.2c1.7-26.5 1.7-52.7 0.1-78.5L401 399.9c0 0 0-0.1 0-0.1l587.6-116.9c-5.1-25.9-11.9-51.2-20.3-75.8L400.9 399.7c0 0 0-0.1 0-0.1l537.3-265c-11.6-23.5-24.8-46.2-39.3-67.9L400.8 399.5c0 0 0-0.1-0.1-0.1l450.4-395c-17.3-19.7-35.8-38.2-55.5-55.5l-395 450.4c0 0-0.1 0-0.1-0.1L733.4-99c-21.7-14.5-44.4-27.6-68-39.3l-265 537.4c0 0-0.1 0-0.1 0l192.6-567.4c-24.6-8.3-49.9-15.1-75.8-20.2L400.2 399c0 0-0.1 0-0.1 0l39.2-597.7c-26.5-1.7-52.7-1.7-78.5-0.1L399.9 399c0 0-0.1 0-0.1 0L282.9-188.6c-25.9 5.1-51.2 11.9-75.8 20.3l192.6 567.4c0 0-0.1 0-0.1 0l-265-537.3c-23.5 11.6-46.2 24.8-67.9 39.3l332.8 498.1c0 0-0.1 0-0.1 0.1L4.4-51.1C-15.3-33.9-33.8-15.3-51.1 4.4l450.4 395c0 0 0 0.1-0.1 0.1L-99 66.6c-14.5 21.7-27.6 44.4-39.3 68l537.4 265c0 0 0 0.1 0 0.1l-567.4-192.6c-8.3 24.6-15.1 49.9-20.2 75.8L399 399.8c0 0 0 0.1 0 0.1l-597.7-39.2c-1.7 26.5-1.7 52.7-0.1 78.5L399 400.1c0 0 0 0.1 0 0.1l-587.6 116.9c5.1 25.9 11.9 51.2 20.3 75.8l567.4-192.6c0 0 0 0.1 0 0.1l-537.3 265c11.6 23.5 24.8 46.2 39.3 67.9l498.1-332.8c0 0 0 0.1 0.1 0.1l-450.4 395c17.3 19.7 35.8 38.2 55.5 55.5l395-450.4c0 0 0.1 0 0.1 0.1L66.6 899c21.7 14.5 44.4 27.6 68 39.3l265-537.4c0 0 0.1 0 0.1 0L207.1 968.3c24.6 8.3 49.9 15.1 75.8 20.2L399.8 401c0 0 0.1 0 0.1 0l-39.2 597.7c26.5 1.7 52.7 1.7 78.5 0.1L400.1 401c0 0 0.1 0 0.1 0l116.9 587.6c25.9-5.1 51.2-11.9 75.8-20.3L400.3 400.9c0 0 0.1 0 0.1 0l265 537.3c23.5-11.6 46.2-24.8 67.9-39.3L400.5 400.8c0 0 0.1 0 0.1-0.1l395 450.4c19.7-17.3 38.2-35.8 55.5-55.5l-450.4-395c0 0 0-0.1 0.1-0.1L899 733.4c14.5-21.7 27.6-44.4 39.3-68l-537.4-265c0 0 0-0.1 0-0.1l567.4 192.6c8.3-24.6 15.1-49.9 20.2-75.8L401 400.2c0 0 0-0.1 0-0.1L998.7 439.2z'/%3E%3C/g%3E%3C/svg%3E");
//     background-attachment: fixed;
//     background-size: cover;*/
//     /*=============================*/
//     font-size: 2rem;
//     display: flex;
//     justify-content: space-between;
//     padding-left: 5rem;
//     padding-right: 5rem;
//   }

//   #city-name {
//     font-size: 6rem;
//     margin: 0;
//     padding-top: 3rem;
//     padding-bottom: 3rem;
//     /*background-color: var(--main-bg-color);*/
//     /*=====================================*/
//     background-color: #8bc2ff;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23BFE0FF' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%239D969C'%3E%3Ccircle cx='769' cy='229' r='6'/%3E%3Ccircle cx='539' cy='269' r='6'/%3E%3Ccircle cx='603' cy='493' r='6'/%3E%3Ccircle cx='731' cy='737' r='6'/%3E%3Ccircle cx='520' cy='660' r='6'/%3E%3Ccircle cx='309' cy='538' r='6'/%3E%3Ccircle cx='295' cy='764' r='6'/%3E%3Ccircle cx='40' cy='599' r='6'/%3E%3Ccircle cx='102' cy='382' r='6'/%3E%3Ccircle cx='127' cy='80' r='6'/%3E%3Ccircle cx='370' cy='105' r='6'/%3E%3Ccircle cx='578' cy='42' r='6'/%3E%3Ccircle cx='237' cy='261' r='6'/%3E%3Ccircle cx='390' cy='382' r='6'/%3E%3C/g%3E%3C/svg%3E");
//     /*=====================================*/
//   }

//   #daily-low {
//   }

//   #daily-high {
//   }

//   #city-name {
//     display: flex;
//     justify-content: center;
//   }

//   .temps {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//   }

//   .temps h3 {
//     margin-bottom: 0;
//     padding-right: 0.5rem;
//   }
//   .temps h2 {
//     margin-top: 1rem;
//     font-size: 4rem;
//   }

//   #weather-facts {
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-start;
//     align-items: center;
//     /*background-color: var(--secondary-bg-color);*/
//     box-shadow: 4px 4px 0px rgba(212, 245, 251, 1);
//     height: 40vh;
//     font-size: 2rem;
//     margin-left: 20rem;
//     margin-right: 20rem;
//     background-color: #a4e1f7;
//     /*===============================*/
//     /*background-color: #cccccc;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 1200'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='100%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23bcc2cf'/%3E%3Cstop offset='0.02' stop-color='%23cccccc'/%3E%3Cstop offset='0.02' stop-color='%23c3c4c7'/%3E%3Cstop offset='0.032' stop-color='%23cccccc'/%3E%3Cstop offset='0.032' stop-color='%23a5b4d5'/%3E%3Cstop offset='0.056' stop-color='%23cccccc'/%3E%3Cstop offset='0.056' stop-color='%23a9aab1'/%3E%3Cstop offset='0.07' stop-color='%23cccccc'/%3E%3Cstop offset='0.07' stop-color='%23bfc0c3'/%3E%3Cstop offset='0.1' stop-color='%23cccccc'/%3E%3Cstop offset='0.1' stop-color='%239baed7'/%3E%3Cstop offset='0.126' stop-color='%23cccccc'/%3E%3Cstop offset='0.126' stop-color='%23b4b6bc'/%3E%3Cstop offset='0.142' stop-color='%23cccccc'/%3E%3Cstop offset='0.142' stop-color='%23a6b6da'/%3E%3Cstop offset='0.159' stop-color='%23cccccc'/%3E%3Cstop offset='0.159' stop-color='%23aeb8d0'/%3E%3Cstop offset='0.17' stop-color='%23cccccc'/%3E%3Cstop offset='0.17' stop-color='%23c9c9c9'/%3E%3Cstop offset='0.197' stop-color='%23cccccc'/%3E%3Cstop offset='0.197' stop-color='%23cacacc'/%3E%3Cstop offset='0.218' stop-color='%23cccccc'/%3E%3Cstop offset='0.218' stop-color='%23a9abb2'/%3E%3Cstop offset='0.239' stop-color='%23cccccc'/%3E%3Cstop offset='0.239' stop-color='%239395a1'/%3E%3Cstop offset='0.254' stop-color='%23cccccc'/%3E%3Cstop offset='0.254' stop-color='%23b0b3bb'/%3E%3Cstop offset='0.283' stop-color='%23cccccc'/%3E%3Cstop offset='0.283' stop-color='%23bec2cb'/%3E%3Cstop offset='0.294' stop-color='%23cccccc'/%3E%3Cstop offset='0.294' stop-color='%239aa7c7'/%3E%3Cstop offset='0.305' stop-color='%23cccccc'/%3E%3Cstop offset='0.305' stop-color='%23cbcbcc'/%3E%3Cstop offset='0.332' stop-color='%23cccccc'/%3E%3Cstop offset='0.332' stop-color='%239facca'/%3E%3Cstop offset='0.346' stop-color='%23cccccc'/%3E%3Cstop offset='0.346' stop-color='%23c5c6ca'/%3E%3Cstop offset='0.362' stop-color='%23cccccc'/%3E%3Cstop offset='0.362' stop-color='%23b6b8bd'/%3E%3Cstop offset='0.381' stop-color='%23cccccc'/%3E%3Cstop offset='0.381' stop-color='%23a9aebf'/%3E%3Cstop offset='0.415' stop-color='%23cccccc'/%3E%3Cstop offset='0.415' stop-color='%239aa8c8'/%3E%3Cstop offset='0.428' stop-color='%23cccccc'/%3E%3Cstop offset='0.428' stop-color='%23bec1ca'/%3E%3Cstop offset='0.442' stop-color='%23cccccc'/%3E%3Cstop offset='0.442' stop-color='%23a0a5b3'/%3E%3Cstop offset='0.456' stop-color='%23cccccc'/%3E%3Cstop offset='0.456' stop-color='%23bbc3d5'/%3E%3Cstop offset='0.498' stop-color='%23cccccc'/%3E%3Cstop offset='0.498' stop-color='%23aebbd9'/%3E%3Cstop offset='0.511' stop-color='%23cccccc'/%3E%3Cstop offset='0.511' stop-color='%23b1b7c8'/%3E%3Cstop offset='0.532' stop-color='%23cccccc'/%3E%3Cstop offset='0.532' stop-color='%239cb0dd'/%3E%3Cstop offset='0.541' stop-color='%23cccccc'/%3E%3Cstop offset='0.541' stop-color='%23b2b6bf'/%3E%3Cstop offset='0.56' stop-color='%23cccccc'/%3E%3Cstop offset='0.56' stop-color='%23c5c7cb'/%3E%3Cstop offset='0.581' stop-color='%23cccccc'/%3E%3Cstop offset='0.581' stop-color='%23a1a4b1'/%3E%3Cstop offset='0.6' stop-color='%23cccccc'/%3E%3Cstop offset='0.6' stop-color='%2394aad9'/%3E%3Cstop offset='0.618' stop-color='%23cccccc'/%3E%3Cstop offset='0.618' stop-color='%23bcc0cb'/%3E%3Cstop offset='0.656' stop-color='%23cccccc'/%3E%3Cstop offset='0.656' stop-color='%23c8c9ce'/%3E%3Cstop offset='0.679' stop-color='%23cccccc'/%3E%3Cstop offset='0.679' stop-color='%2396aad6'/%3E%3Cstop offset='0.689' stop-color='%23cccccc'/%3E%3Cstop offset='0.689' stop-color='%23a3b4d9'/%3E%3Cstop offset='0.720' stop-color='%23cccccc'/%3E%3Cstop offset='0.720' stop-color='%23b6bbca'/%3E%3Cstop offset='0.734' stop-color='%23cccccc'/%3E%3Cstop offset='0.734' stop-color='%23a4b7df'/%3E%3Cstop offset='0.748' stop-color='%23cccccc'/%3E%3Cstop offset='0.748' stop-color='%239aadd5'/%3E%3Cstop offset='0.764' stop-color='%23cccccc'/%3E%3Cstop offset='0.764' stop-color='%23c9cacd'/%3E%3Cstop offset='0.788' stop-color='%23cccccc'/%3E%3Cstop offset='0.788' stop-color='%23a3a5ad'/%3E%3Cstop offset='0.808' stop-color='%23cccccc'/%3E%3Cstop offset='0.808' stop-color='%23bbc0cc'/%3E%3Cstop offset='0.831' stop-color='%23cccccc'/%3E%3Cstop offset='0.831' stop-color='%239fa4b3'/%3E%3Cstop offset='0.856' stop-color='%23cccccc'/%3E%3Cstop offset='0.856' stop-color='%23a9b8d9'/%3E%3Cstop offset='0.872' stop-color='%23cccccc'/%3E%3Cstop offset='0.872' stop-color='%23b5bfd6'/%3E%3Cstop offset='0.894' stop-color='%23cccccc'/%3E%3Cstop offset='0.894' stop-color='%23a5a6ad'/%3E%3Cstop offset='0.914' stop-color='%23cccccc'/%3E%3Cstop offset='0.914' stop-color='%2394a8d3'/%3E%3Cstop offset='0.942' stop-color='%23cccccc'/%3E%3Cstop offset='0.942' stop-color='%2394a2c2'/%3E%3Cstop offset='0.957' stop-color='%23cccccc'/%3E%3Cstop offset='0.957' stop-color='%23b4b5ba'/%3E%3Cstop offset='0.973' stop-color='%23cccccc'/%3E%3Cstop offset='0.973' stop-color='%239da8c3'/%3E%3Cstop offset='1' stop-color='%23cccccc'/%3E%3Cstop offset='1' stop-color='%239a9da8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' x='0' y='0' width='100%25' height='100%25'/%3E%3C/svg%3E");
//     background-attachment: fixed;
//     background-size: cover;
//     /*===============================*/
//   }

//   #weather-facts-instructions {
//     display: flex;
//     justify-content: center;
//   }

//   #feels-like-fact-name,
//   #wind-speed-fact-name,
//   #humidity-fact-name {
//     padding-right: 0.5rem;
//     font-size: 3rem;
//     margin-top: 6rem;
//     margin-bottom: 5rem;
//   }

//   #feels-like-fact-detail,
//   #wind-speed-fact-detail,
//   #humidity-fact-detail {
//     font-size: 4rem;
//   }

//   /*========  CITY BANNER WEATHER CLASSES  ===================*/

//   .clear {
//     background-image: url("./images/clear-banner.jpg");
//     background-size: cover;
//     background-repeat: no-repeat;
//     font-size: 5rem;
//     font-style: italic;
//     font-family: cursive;
//     font-weight: bolder;
//     color: rgb(255, 255, 255);
//     text-shadow: 0 0 10px rgb(73, 73, 73);
//     padding-right: 3rem;
//   }

//   .clouds {
//     background-image: url("./images/clouds-banner.jpg");
//     background-size: cover;
//     background-repeat: no-repeat;
//     font-size: 5rem;
//     font-style: italic;
//     font-family: cursive;
//     font-weight: bolder;
//     color: rgb(255, 255, 255);
//     text-shadow: 0 0 10px rgb(73, 73, 73);
//     padding-right: 3rem;
//   }

//   .rain {
//     background-image: url("./images/rain-banner.jpg");
//     background-size: cover;
//     background-repeat: no-repeat;
//     font-size: 5rem;
//     font-style: italic;
//     font-family: cursive;
//     font-weight: bolder;
//     color: rgb(255, 255, 255);
//     text-shadow: 0 0 10px rgb(73, 73, 73);
//     padding-right: 3rem;
//   }

//   .mist {
//     background-image: url("./images/mist-banner.jpg");
//     background-size: cover;
//     background-repeat: no-repeat;
//     font-size: 5rem;
//     font-style: italic;
//     font-family: cursive;
//     font-weight: bolder;
//     color: rgb(255, 255, 255);
//     text-shadow: 0 0 10px rgb(73, 73, 73);
//     padding-right: 3rem;
//   }

//   .snow {
//     background-image: url("./images/snow-banner.jpg");
//     background-size: cover;
//     background-repeat: no-repeat;
//   }
