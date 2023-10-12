

/* add event listener to update button */
const update_btn = document.getElementById('update_data');
update_btn.addEventListener('click', function() {
    /* get lat and long */
    let latitude = document.getElementById('latitude_input').value;
    let longitude = document.getElementById('longitude_input').value;
    
    /* get & store goe information */
    let data = fetchGeoInfo(latitude, longitude);
    console.log(data);
    console.log('update button was pressed');

    clearContainers();
});

/* add event listener to clear button */
const clear_button = document.getElementById('clear_data');
clear_button.addEventListener('click', clearContainers);


/** 
 * Fetch geolocation information. This information is needed before any weather data
 * can be obtained.
 * 
 * @param {number} latitude
 * @param {number} longitude
 * 
 * @returns {none}
 */
async function fetchGeoInfo(latitude, longitude) {
    try {
        /* send response & parse rescieved data */
        const response = await fetch(`https://api.weather.gov/points/${longitude},${latitude}`);
        const data = await response.json();
        
        /* glean all data from the request */
        const city = data['properties']['relativeLocation']['properties']['city'];
        const state = data['properties']['relativeLocation']['properties']['state'];
        const gridId = data['properties']['gridId'];
        const gridX = data['properties']['gridX'];
        const gridY = data['properties']['gridY'];
        const forecast = data['properties']['forecast'];
        const forcastHourly = data['properties']['forecastHourly'];
        

        /* update page information */
        document.getElementById('seven_day_header').textContent = `7 Day Forecast | ${city}, ${state}`;
        document.getElementById('hourly_header').textContent = `Hourly Forecast (48 Hours) | ${city}, ${state}`;
        setTabName(`${city}, ${state}`);

        /* call other methods */
        fetchSevenDay(gridId, gridX, gridY);
        fetchHourly(gridId, gridX, gridY);
    }
    catch {
        console.log('There was an error loading the goelocation data.');
    }
}


/** 
 * Fetch 7 day forecast for the desired location.
 * 
 * @param {string} gridId
 * @param {string} gridX
 * @param {string} gridY
 * 
 * @returns {none}
 */
async function fetchSevenDay(gridId, gridX, gridY) {
    try {
        const response = await fetch(`https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`);
        const data = await response.json();

        const periods = data['properties']['periods'];

        /* the existing, parent div */
        const seven_day_container = document.getElementById('seven_day_container');

        /* setup HTML for each period */
        periods.forEach(period => {
            /* obtain the period data */
            const number = period['number'];
            const name = period['name'];
            const start_time = period['startTime'];
            const end_time = period['endTime'];
            const is_day_time = period['isDaytime'];
            const temperature = period['temperature'];
            const temperature_unit = period['temperatureUnit'];
            const temperature_trend = period['temperatureTrend'];
            const precipitation_unit_code = period['probabilityOfPrecipitation']['unitCode'];
            const precipitation_value = period['probabilityOfPrecipitation']['value'];
            const dewpoint_unit_code = period['dewpoint']['unitCode'];
            const dewpoint_value = period['dewpoint']['value'];
            const relative_humidity_unit_code = period['relativeHumidity']['unitCode'];
            const relative_humidity_value = period['relativeHumidity']['value'];
            const wind_speed = period['windSpeed'];
            const wind_direction = period['windDirection'];
            const short_forecast = period['shortForecast'];
            const detailed_forecast = period['detailedForecast'];

            /* create the new HTML elements */
            const period_container = document.createElement('div');
            period_container.setAttribute('class',`seven_day_period`);
            period_container.setAttribute('id',`seven_day_p${number}`);

            const sliced_name = name.slice(-5);
            if (sliced_name === 'Night' || sliced_name === 'night') {
                period_container.style.backgroundColor = 'rgba(0, 0, 30, 0.5)';
            }

            const period_name = document.createElement('h3');
            period_name.setAttribute('id',`p${number}_name`);
            period_name.textContent = `${name} | ${temperature} ${temperature_unit}`;
            
            const peroid_forecast_short = document.createElement('p');
            peroid_forecast_short.setAttribute('id',`p${number}_forecast_short`);
            peroid_forecast_short.textContent = `${short_forecast}`;
            
            const peroid_forecast_detailed = document.createElement('p');
            peroid_forecast_detailed.setAttribute('id',`p${number}_forecast_detailed`);
            peroid_forecast_detailed.textContent = `${detailed_forecast}`;
            
            const period_precipitation = document.createElement('p');
            period_precipitation.setAttribute('id',`p${name}_precipitation`);
            if (precipitation_value === null) {
                period_precipitation.textContent = 'Precipitation: 0%';
            }
            else {
                period_precipitation.textContent = `Precipitation: ${precipitation_value}%`;
            }

            const period_wind = document.createElement('p');
            period_wind.setAttribute('id',`p${number}_wind`);
            period_wind.textContent = `Wind Speed: ${wind_speed} (${wind_direction})`;

            const period_humidity = document.createElement('p');
            period_humidity.setAttribute('id',`p${number}_humidity`);
            period_humidity.textContent = `Humidity: ${relative_humidity_value}%`;

            /* format HTML elements */
            period_container.appendChild(period_name);
            period_container.appendChild(peroid_forecast_short);
            period_container.appendChild(peroid_forecast_detailed);
            period_container.appendChild(period_precipitation);
            period_container.appendChild(period_wind);
            period_container.appendChild(period_humidity);
            seven_day_container.appendChild(period_container);
        });
    }
    catch(error) {
        alert('There was an error loading the 7 day forecast data.');
        console.log(error.message);
    }
}


/** 
 * Fetch hourly forecast for the desired location. This is a lot of data. All data is stored (cached), but only the 
 * next 48 hours are shown.
 * 
 * @param {string} gridId
 * @param {string} gridX
 * @param {string} gridY
 * 
 * @returns {none}
 */
async function fetchHourly(gridId, gridX, gridY) {
    try {
        const response = await fetch(`https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast/hourly`);
        const data = await response.json();

        const all_periods = data['properties']['periods'];
        const periods = all_periods.slice(0,48);

        /* the existing, parent div */
        const hourly_container = document.getElementById('hourly_container');

        /* setup HTML for each period */
        periods.forEach(period => {
            /* obtain the period data */
            const number = period['number'];
            const name = period['name'];
            const start_time = period['startTime'];
            const end_time = period['endTime'];
            const is_day_time = period['isDaytime'];
            const temperature = period['temperature'];
            const temperature_unit = period['temperatureUnit'];
            const precipitation_unit_code = period['probabilityOfPrecipitation']['unitCode'];
            const precipitation_value = period['probabilityOfPrecipitation']['value'];
            const dewpoint_unit_code = period['dewpoint']['unitCode'];
            const dewpoint_value = period['dewpoint']['value'];
            const relative_humidity_unit_code = period['relativeHumidity']['unitCode'];
            const relative_humidity_value = period['relativeHumidity']['value'];
            const wind_speed = period['windSpeed'];
            const wind_direction = period['windDirection'];
            const short_forecast = period['shortForecast'];
            const detailed_forecast = period['detailedForecast'];
            
            /* create the new HTML elements */
            const period_container = document.createElement('div');
            period_container.setAttribute('class','hourly_period');
            period_container.setAttribute('id',`hourly_p${number}`);
            
            // const timestamp = Date.parse(start_time); /* formatted in IOS 8601 */
            // const corrected_timezone = timestamp.toLocaleString('en-US')
            const period_name = document.createElement('h3');
            period_name.setAttribute('id',`p${number}_name`);
            const formatted_time = getReadableTime(start_time);
            period_name.textContent = `${formatted_time} | ${temperature} ${temperature_unit}`;
            
            const peroid_forecast_short = document.createElement('p');
            peroid_forecast_short.setAttribute('id',`p${number}_forecast_short`);
            peroid_forecast_short.textContent = `${short_forecast}`;
            
            /* const peroid_forecast_detailed = document.createElement('p');
            peroid_forecast_detailed.setAttribute('id',`p${number}_forecast_detailed`);
            peroid_forecast_detailed.textContent = `${detailed_forecast}`; */

            const period_precipitation = document.createElement('p');
            period_precipitation.setAttribute('id',`p${name}_precipitation`);
            period_precipitation.textContent = `Precipitation: ${precipitation_value}%`;

            const period_wind = document.createElement('p');
            period_wind.setAttribute('id',`p${number}_wind`);
            period_wind.textContent = `Wind Speed: ${wind_speed} (${wind_direction})`;

            const period_humidity = document.createElement('p');
            period_humidity.setAttribute('id',`p${number}_humidity`);
            period_humidity.textContent = `Humidity: ${relative_humidity_value}%`;

            /* format HTML elements */
            period_container.appendChild(period_name);
            period_container.appendChild(peroid_forecast_short);
            // period_container.appendChild(peroid_forecast_detailed);
            period_container.appendChild(period_precipitation);
            period_container.appendChild(period_wind);
            period_container.appendChild(period_humidity);
            hourly_container.appendChild(period_container);
        });
    }
    catch(error) {
        alert('There was an error loading the hourly forecast data.');
        console.log(error.message);
    }
}


/**
 * Set the name of the tab.
 * 
 * @param {string} [text=null]
 */
function setTabName(text = null) {
    const tab_name = document.getElementById('tab_name');

    if (text != null) {
        tab_name.textContent = `Weather | ${text}`;
    }
    else {
        tab_name.textContent = 'Weather';
    }
}


/**
 * Convert ISO 8601 (`2023-10-11T22:00:00-04:00`) formatted date to:
 * `Thursday 10 PM`
 * 
 * @param {string} input_date
 * 
 * @returns {string}
 */
function getReadableTime(input_date) {
    const date = new Date(input_date);
    const weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const day_of_week = weekdays[date.getUTCDay()];
    const day_of_month = date.getUTCDate();
    const month = months[date.getMonth()];
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const formatted_time = hours >= 12 ? `${hours % 12} PM` : `${hours} AM`;
    const formatted_output = `${day_of_week} ${formatted_time}`;

    return formatted_output;
}


/**
 * Clear the containers for new data.
 */
function clearContainers() {
    try {
        const seven_day_container = document.getElementById('seven_day_container');
        const hourly_container = document.getElementById('hourly_container');

        /* clear 7 day container */
        while (seven_day_container.firstChild) {
            seven_day_container.removeChild(seven_day_container.firstChild);
        }
        
        /* clear hourly container */
        while (hourly_container.firstChild) {
            hourly_container.removeChild(hourly_container.firstChild);
        }

        console.log('containers were cleared.');
    }
    catch(error) {
        alert('There was an error clearing the containers.');
        // console.log(error.message);
    }
}