
let weatherUrl = 'https://api.weather.gov/gridpoints/MPX/116,72/forecast' // URL for the weather forecast API

// Find the table where the forecast will be displayed
let weatherTable = document.querySelector('#weather-forecast')

// Send a request to get the weather forecast
fetch(weatherUrl)
    .then(response => response.json()) // Convert the response to JSON
    .then( weatherJson => {
        displayWeatherTable(weatherJson)  // Pass the weather data to the function
    }).catch(error => {
        console.log(error)   // Show the error details in the console
        alert('Sorry, could not fetch the weather forecast')  // Tell the user the request failed
    })


// This function takes the weather data and adds it to the table
function displayWeatherTable(weatherJson) {
    console.log(weatherJson) // Check the full JSON response

    // Get the array containing the forecast for each time period
    let forecastArray = weatherJson.properties.periods
    console.log(forecastArray) // Check the forecast periods

    // Go through each forecast period in the array
    forecastArray.forEach( forecastPeriodData => {
        console.log(forecastPeriodData) // Check the current forecast period

        // Create a new table row for this period
        let tableRow = document.createElement('tr')

        // Create a table cell for the period name
        let periodNameTableData = document.createElement('td')
        let periodName = forecastPeriodData.name  // Get the name, like "Friday Night"
        periodNameTableData.innerHTML = periodName // Put the name in the cell
        tableRow.appendChild(periodNameTableData) // Add the cell to the row

        // Create a cell for the temperature
        let temperatureTableData = document.createElement('td')
        let temperature = forecastPeriodData.temperature // Get the temperature number
        let temperatureUnit = forecastPeriodData.temperatureUnit // Get the unit, like F
        temperatureTableData.innerHTML = temperature + temperatureUnit // Show the number and unit together
        tableRow.appendChild(temperatureTableData) // Add the temperature cell to the row

        // Create a cell for the weather icon
        let weatherIconTableData = document.createElement('td')
        let weatherIconImage = document.createElement('img') // Create an image element
        let weatherIconSource = forecastPeriodData.icon // Get the icon URL from the API
        weatherIconImage.src = weatherIconSource // Set the image to use that URL

        // Put the image inside its table cell
        weatherIconTableData.appendChild(weatherIconImage)
        // Add the icon cell to the row
        tableRow.appendChild(weatherIconTableData)

        // Create a cell for the full forecast description
        let detailForecastTableData = document.createElement('td')
        let detailedForecast = forecastPeriodData.detailedForecast // Get the forecast details
        detailForecastTableData.innerHTML = detailedForecast // Display the description
        tableRow.appendChild(detailForecastTableData) // Add the description cell to the row

        
        // Create a cell for the wind information
        let windTableData = document.createElement('td')
        // Get the wind speed and direction from the API
        let windSpeed = forecastPeriodData.windSpeed
        let windDirection = forecastPeriodData.windDirection

        // Combine the speed and direction into one string
        let wind = windSpeed + ' ' + windDirection
        // Put the wind information in the cell
        windTableData.innerHTML = wind
        // Add the wind cell to the row
        tableRow.appendChild(windTableData)


        // Add the finished row to the weather table
        weatherTable.appendChild(tableRow)
    })
}
