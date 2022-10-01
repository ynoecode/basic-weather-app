/** 
 * ? Open Weather API Key: bc35684529577c8cf28ff5e301937112 
 */ 
const key = {
  "weather_key": "bc35684529577c8cf28ff5e301937112",
}

/**
 * ? Document querySelector variables.
 */
let city = document.querySelector(".city")
let weatherIcon = document.querySelector(".weather-description-icon")
let humidPercentage = document.querySelector(".weather-humidity-percentatge-text")
let temperature = document.querySelector(".temperature-text")
let weatherDescription = document.querySelector(".weather-description-text")
let weatherWindSpeed = document.querySelector(".weather-wind-speed-text")
let searchBar = document.querySelector(".search-bar")
let searchButton = document.querySelector(".search button")
let weatherCard = document.querySelector(".weather-card")
let weatherPreloader = document.querySelector(".weather-preloader")

let weather = {
  /** 
   * ? Fetching data from the weather Open Weather API.
   */ 
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" 
      + city 
      + "&units=metric&APPID=" 
      + key.weather_key
    )
    .then((response) => response.json())
    .then((data) => this.displayWeather(data))
    .catch(error => {
      console.log("Error: ", error)
    })
  },
  /** 
   * ? Displaying data from the weather Open Weather API. 
   */ 
  displayWeather: function (data) {
    const { name } = data
    const { description, icon } = data.weather[0];
    const { temp, humidity } = data.main
    const { speed } = data.wind

    const displayWeatherIcon = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"

    /**
     * ? Displaying `name, icon, description, temp, humidity, speed` to 
     * ? the browser's console.
     */
    console.log(name, icon, description, temp, humidity, speed)

    /**
     * ? Displaying location.
     */
    city.innerText = name

    /**
     * ? Displaying temperature.
     */
    temperature.innerText = temp

    /**
     * ? Displaying weather description.
     */
     weatherDescription.innerText = description

    /**
     * ? Displaying cloud icon.
     */
    weatherIcon.src = displayWeatherIcon

    /**
     * ? Displaying humidity percentage.
     */
    humidPercentage.innerText = humidity

    /**
     * ? Displaying wind speed.
     */
    weatherWindSpeed.innerText = speed

    weatherPreloader.remove()
    weatherCard.classList.remove("loading");
  },
  /**
   * ? Fetches the value that users input.
   * ? Then It passes the value to the function `fetchWeather`.
   * ? Then the fucntion `fetchWeather` do the logic/algorithm.
   */
  search: function () {
    this.fetchWeather(searchBar.value)

    /**
     * ? After the button was clicked, the value will be cleared.
     */
    searchBar.value = ""
  }
}

/**
 * ? When users clicked the "🔍"
 */
searchButton
  .addEventListener("click", function () {
    weather.search()
  })

/**
 * ? When users pressed the "🔘" or enter key.
 */
searchBar
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weather.search()
    }
  })


