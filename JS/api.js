//API for generate random quotes
const quote = document.querySelector('#quote');
const author = document.querySelector('#author');
const newQuote = document.querySelector('#new-quote');

const newAdvice = async () => {
  try {
    const quoteURL = await fetch('https://api.quotable.io/random');

    if (!quoteURL.ok) {
      if (quoteURL.status === 404) {
        throw new Error('Data not found');
      } else if (quoteURL.status === 500) {
        throw new Error('Server error');
      } else {
        throw new Error('Network response was not ok');
      }
    }
    
    const adviceJSON = await quoteURL.json();
    const data = adviceJSON;
    const currentAuthor = data.author;
    const currentQuote = data.content;
    quote.textContent = `${currentQuote}`
    author.textContent = `"${currentAuthor}"`
  }

  catch (e) {
    console.error(e)
  }
}

newQuote.addEventListener('click', () => {
  newAdvice();
})


let country = document.querySelector('#location');
let countryCode = document.querySelector('#state');
let timezone = document.querySelector('#timezone');
let dayYear = document.querySelector('#day-year');
let dayWeek = document.querySelector('#day-week');
let numberWeek = document.querySelector('#number-week');
let sun = document.querySelector('#sun');
let moon = document.querySelector('#moon');
let hour = document.querySelector('#hour');
let minutes = document.querySelector('#minutes');
let partDay = document.querySelector('#part-day');
let dayPics = Array.from(document.querySelectorAll('img[data-variant="day"]'))
let nightPics = Array.from(document.querySelectorAll('img[data-variant="night"]'))
let typeHour = document.querySelector('#type-hour')


window.addEventListener('load', () => {
  newDate();
  newIP();
})

setInterval(newDate, 30000)

function newDate () {
  let date = new Date();
  updateCounters(date);
  updateHours(date)
  isBst(date)
}

function updateCounters(date){
  //To know current day of the year
  let start = new Date(date.getFullYear(), 0, 0);
  let diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  let oneDay = 1000 * 60 * 60 * 24;
  let day = Math.floor(diff / oneDay);

  //To know current week of the year
  const onejan = new Date(date.getFullYear(), 0, 1);
  const week = Math.ceil((((date.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);

  //To know the number of the week
  const currentDay = date.getDay();

  //To update day of the year and week's number of the year
  dayYear.innerText = day;
  numberWeek.innerText = week;

    if(currentDay === 0){
      dayWeek.innerText = 7;
    } else {
      dayWeek.innerText = currentDay;
    }
}

function updateHours(date){
  let time = date.getHours();
  let minute = date.getMinutes();
  hour.innerText = time
  
  if(time >= 6 && time < 15) {
    partDay.innerText = 'GOOD MORNING';
    dayPics.forEach((day) => {
    day.setAttribute('data-active', true)
    })

    nightPics.forEach((night) => {
      night.setAttribute('data-active', false)
    })

    sun.style.display = 'block';
    moon.style.display = 'none';
  }
  
  if(time >= 15 && time < 18) {
    partDay.innerText = 'GOOD AFTERNOON';
    console.log('ciao')
  }
  
  if(time >= 18 && time < 21) {
    partDay.innerText = 'GOOD EVENING';
  }

  if(time >= 0 && time < 6){
    partDay.innerText = 'GOOD NIGHT'

    dayPics.forEach((day) => {
      day.setAttribute('data-active', false)
    })

    nightPics.forEach((night) => {
      night.setAttribute('data-active', true)
    })

    sun.style.display = 'none';
    moon.style.display = 'block';
  }

  if(minute === 0){
    minutes.innerText = '00';
  } else if(minute > 0 && minute < 10){
    minutes.innerText = `0${minute}`
  } else {
    minutes.innerText = minute;
  }
}
  
//API for get info by user's connection
const newIP = async () => {
  try {
    const adress = await fetch('https://api.ipdata.co?api-key=ce8b25fe26333da4178307ae207058301d45954bc52704733c2742eb&fields=city,country_code,time_zone');

    if (!adress.ok) {
      if (adress.status === 404) {
        throw new Error('Data not found');
      } else if (adress.status === 500) {
        throw new Error('Server error');
      } else {
        throw new Error('Network response was not ok');
      }
    }
    
    const adressJSON = await adress.json();
    const data = adressJSON;
    const currentCity = data.city;
    const currentCode = data.country_code;
    const currentTimezone = data.time_zone.name;
    console.log(currentTimezone)

    country.textContent = `${currentCity}`
    countryCode.textContent = `${currentCode}`
    timezone.textContent = `${currentTimezone}`
  }

  catch (e) {
    console.error(e)
  }
} 

function isBst(date){
  let currentMonth = date.getMonth();
  let currentDay = date.getDate();

  function getLastSunday(year, month) {
    let d = new Date(year, month, 0);
    d.setDate(d.getDate() - d.getDay());
    let correctMonth = d.getMonth();
    let correctDay = d.getDate();

    if((currentMonth === 2 && correctMonth === 2) && (currentDay === correctDay)){
      typeHour.innerText = 'BST'
    }else if((currentMonth === 9 && correctMonth === 9) && (currentDay === correctDay)){
      typeHour.innerText = 'GMT'
    }
  }


  for (let y=new Date().getFullYear(), i=1; i<=12; i++) {
    getLastSunday(y, i);
  }
}
