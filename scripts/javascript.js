// const fetch = require('node-fetch');
const currCity = document.querySelector('.currCity');
const cityName = currCity.innerText;
const apiKey = '391cb458afed314af5e9f1fad92b26c1';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
const apiUrlDaily = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function renderTemp(className, data) {
  let element = document.querySelector(`.${className}`);
  element.innerText = `${parseInt(data)}° C`;
}

function showDate(className, data) {
  let element = document.querySelector(`.${className}`);
  element.innerText = `${data}`;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createImage(imageSource) {
  const img = document.createElement('img');
  img.className = 'weather-image';
  img.src = imageSource;
  return img;
}

function createWeatherCard(iconUrl, temperature, monthlyDate) {
  const card = document.createElement('div');
  card.className = 'weather-column';
  
  card.appendChild(createImage(iconUrl));
  card.appendChild(createCustomElement('span', 'temperature', temperature));
  card.appendChild(createCustomElement('p', 'week-day', monthlyDate));
  
  return card;
}
const containerForecast = document.querySelector('.forecast');
const mainIcon = document.querySelector('#main-icon');
async function fetchApi() {
  try {
    const response = await fetch(`${apiUrl}`);
    const jsonFetch = await response.json();
    const temp = jsonFetch.main.temp;

    const response1 = await fetch(`${apiUrlDaily}`);
    const jsonFetch1 = await response1.json()
    .then((e) => {
      for (i=0;i<3;i+=1){
        let date = new Date(e.list[((i+1)*8)-1].dt * 1000);
        let monthlyDate = date.toLocaleDateString();
        let weather = e.list[((i+1)*8)-1].weather[0].description;
        let iconCode= e.list[((i+1)*8)-1].weather[0].icon;
        let iconUrl=`https://openweathermap.org/img/wn/${iconCode}.png`;
        let temperature = e.list[((i+1)*8)-1].main.temp;
        let minTemp = e.list[((i+1)*8)-1].main.temp_min;
        let maxTemp = e.list[((i+1)*8)-1].main.temp_max;
        let humidity = e.list[((i+1)*8)-1].main.humidity;
        console.log(monthlyDate, weather, temperature, minTemp, maxTemp, humidity);
        containerForecast.appendChild(createWeatherCard(iconUrl, `${parseInt(temperature)}° C`, monthlyDate));
      };
    });

    let mainIconCode= jsonFetch.weather[0].icon;
    let mainIconUrl=`https://openweathermap.org/img/wn/${mainIconCode}.png`;
    mainIcon.appendChild(createImage(mainIconUrl));
    let todayDate = new Date(jsonFetch.dt * 1000);
    let todayIs = todayDate.toDateString();
    console.log(todayIs);
    showDate('currDate', todayIs);
    renderTemp('big-weather', temp);
  } catch (error) {
    console.log(error);
  }
}


window.onload = () => {
  fetchApi();
};
