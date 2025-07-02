const search = document.getElementById("search");
const body = document.body;
const key = "1bd18fddc71240e0883134147240107";
const windDirections = {
  N: "North",
  NNE: "North-Northeast",
  NE: "Northeast",
  ENE: "East-Northeast",
  E: "East",
  ESE: "East-Southeast",
  SE: "Southeast",
  SSE: "South-Southeast",
  S: "South",
  SSW: "South-Southwest",
  SW: "Southwest",
  WSW: "West-Southwest",
  W: "West",
  WNW: "West-Northwest",
  NW: "Northwest",
  NNW: "North-Northwest",
};
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//API data here
let state = "";
let icon;
let city = "";
let country = "";
let celsius;
let fahrenheit;
let dayDate;
let dayName;
let month;
let date;
let wind;
let windDirection = "";
let uv;
let perception;
let humidity;
let keyword;
let futureCards = "";
let futureIconSrc;
let c = true;
let f = false;
let dayIndex;
let userLocation;
let data = {};

//API values in DoM here
let stateDom = document.getElementById("state");
let iconDom = document.getElementById("stateIcon");
let cityDom = document.getElementById("city");
let countryDom = document.getElementById("country");
let temp = document.getElementById("temp");
let dayNameDom = document.getElementById("dayName");
let dayDateDom = document.getElementById("dayDate");
let monthDom = document.getElementById("month");
let windDom = document.getElementById("wind");
let windDirectionDom = document.getElementById("windDirection");
let uvDom = document.getElementById("uvIndex");
let uvDescDom = document.getElementById("uvDesc");
let perceptionDom = document.getElementById("perceptions");
let humidityDom = document.getElementById("humidity");
let humidityBar = document.getElementById("humidityBar");
let stateIconDom = document.getElementById("stateIcon");

search.addEventListener("input", function (e) {
  keyword = e.target.value;
});
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  getCurrent(keyword);
});
function background(state) {
  switch (state) {
    case "rain":
      body.style.cssText = `
    background-image: url("./media/rain-bg.jpg");
    background-position: center center;
    background-size: cover;
            `;
      break;
    case "sunny":
      body.style.cssText = `
    background-image: url("./media/sunny-bg.jpg");
    background-position: center center;
    background-size: cover;
    background-attachment:fixed;
    transition: all 1s;
            `;
      break;
    case "storm":
      body.style.cssText = `
    background-image: url("./media/storm-bg.jpg");
    background-position: center center;
    background-size: cover;
        background-attachment:fixed;

    transition: all 1s;
            `;
      break;
    case "cold":
      body.style.cssText = `
    background-image: url("./media/cold-bg.jpg");
    background-position: center center;
    background-size: cover;
        background-attachment:fixed;

    transition: all 1s;
            `;
      break;
    case "cloud":
      body.style.cssText = `
    background-image: url("./media/cloud-bg.jpg");
    background-position: center center;
    background-size: cover;
        background-attachment:fixed;

    transition: all 1s;
            `;
      break;
    case "clear":
      body.style.cssText = `
    background-image: url("./media/clear-bg.jpg");
    background-position: center center;
    background-size: cover;
        background-attachment:fixed;

    transition: all 1s;
            `;
      break;

    case "fog":
      body.style.cssText = `
    background-image: url("./media/fog-bg.jpg");
    background-position: center center;
    background-size: cover;
        background-attachment:fixed;

    transition: all 1s;
            `;
      break;

    default:
      body.style.cssText = `
  background-color: #8bc6ec;
  background-image: linear-gradient(192deg, #8bc6ec 0%, #565886 44%);
  color: white;
  transition: all 1s;
            `;
      break;
  }
}
async function getCurrent(search = "london") {
  try {
    let res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${search}&days=7`,
      { method: "GET" }
    );
    data = await res.json();
    city = data.location.name;
    country = data.location.country;
    state = data.current.condition.text;
    icon = data.current.condition.icon;
    humidity = data.current.humidity;
    perception = data.current.precip_mm;
    celsius = data.current.temp_c;
    fahrenheit = data.current.temp_f;
    uv = data.current.uv;
    wind = data.current.wind_kph;
    windDirection = data.current.wind_dir;
    date = new Date(data.forecast.forecastday[0].date);
    console.log(date.getDay());

    setDom();
    console.log(data);
    document.getElementById("errr").classList.add("d-none");
  } catch (error) {
    console.log("not found error");
    document.getElementById("errr").innerText = "Invalid City Name";
    document.getElementById("errr").classList.remove("d-none");
  }
}
function setDom() {
  switch (
    true //icon and background
  ) {
    case state.toLowerCase() == "sunny":
      stateIconDom.setAttribute("src", "media/sun.png");
      background("sunny");
      break;
    case state.toLowerCase() == "clear":
      stateIconDom.setAttribute("src", "media/moon.png");
      background("clear");
      break;

    case state.toLowerCase().includes("thunder"):
      stateIconDom.setAttribute("src", "media/thunderstorm.png");
      background("storm");
      break;

    case state.toLowerCase().includes("snow") ||
      state.toLowerCase().includes("ice") ||
      state.toLowerCase().includes("blizzard") ||
      state.toLowerCase().includes("sleet") ||
      state.toLowerCase().includes("freezing"):
      stateIconDom.setAttribute("src", "media/snow.png");
      background("cold");
      break;

    case state.toLowerCase().includes("rain") ||
      state.toLowerCase().includes("drizzle"):
      stateIconDom.setAttribute("src", "media/rainy.png");
      background("rain");
      break;

    case state.toLowerCase().includes("cloud") ||
      state.toLowerCase().includes("overcast"):
      stateIconDom.setAttribute("src", "media/cloudy.png");
      background("cloud");
      break;

    case state.toLowerCase().includes("fog") ||
      state.toLowerCase().includes("mist"):
      stateIconDom.setAttribute("src", "media/fog.png");
      background("fog");
      break;

    default:
      stateIconDom.setAttribute("src", icon);
      break;
  }

  switch (
    true //uv description
  ) {
    case uv >= 0 && uv <= 2:
      uvDescDom.innerHTML = "Low Risk";
      break;

    case uv >= 3 && uv <= 5:
      uvDescDom.innerHTML = "Moderate Risk";
      break;
    case uv >= 6 && uv <= 7:
      uvDescDom.innerHTML = "High Risk";
      break;

    case uv >= 8 && uv <= 10:
      uvDescDom.innerHTML = "Very High Risk";
      break;

    case uv >= 11:
      uvDescDom.innerHTML = "Extreme Risk";
      break;

    default:
      break;
  }

  stateDom.innerHTML = state;
  cityDom.innerHTML = city;
  countryDom.innerHTML = country;
  if (c) {
    temp.innerHTML = celsius + `<sup>o</sup>` + `C`;
  } else if (f) {
    temp.innerHTML = fahrenheit + `<sup>o</sup>` + `F`;
  }
  dayIndex = date.getDay();
  dayNameDom.innerHTML = days[dayIndex];
  dayDateDom.innerHTML = `${date.getDate()} <small id="month">${
    months[date.getMonth() - 1]
  }</small>`;
  windDom.innerHTML = wind + `<span class="h6">Km/h</span>`;
  windDirectionDom.innerHTML =
    `<i class="fa-solid fa-compass"></i> ` + windDirections[windDirection];
  uvDom.innerHTML = uv;
  perceptionDom.innerHTML = perception;
  humidityDom.innerHTML = humidity.toString() + "%";
  humidityBar.style.width = humidity.toString() + "%";
  future();
}
function future(obj) {
  futureCards = "";
  let stat = "";
  let fDate;
  let futureIconSrcT;
  let stateT = data.forecast.forecastday[1].day.condition.text;
  let fDateT = new Date(data.forecast.forecastday[1].date);
  switch (
    true //icons
  ) {
    case stateT.toLowerCase() == "sunny":
      futureIconSrcT = "media/sun.png";
      break;
    case stateT.toLowerCase() == "clear":
      futureIconSrcT = "media/moon.png";
      break;

    case stateT.toLowerCase().includes("thunder"):
      futureIconSrcT = "media/thunderstorm.png";
      break;

    case stateT.toLowerCase().includes("snow") ||
      stateT.toLowerCase().includes("ice") ||
      stateT.toLowerCase().includes("blizzard") ||
      stateT.toLowerCase().includes("sleet") ||
      stateT.toLowerCase().includes("freezing"):
      futureIconSrcT = "media/snow.png";
      break;

    case stateT.toLowerCase().includes("rain") ||
      stateT.toLowerCase().includes("drizzle"):
      futureIconSrcT = "media/rainy.png";
      break;

    case stateT.toLowerCase().includes("cloud") ||
      stateT.toLowerCase().includes("overcast"):
      futureIconSrcT = "media/cloudy.png";
      break;

    case stateT.toLowerCase().includes("fog") ||
      stateT.toLowerCase().includes("mist"):
      futureIconSrcT = "media/fog.png";
      break;

    default:
      futureIconSrcT = icon;
      break;
  }
  document.getElementById("tomorrow").innerHTML = `
<div class="current h-100 d-flex mx-1">
          <div class="card h-100 p-3 d-flex flex-row gap-1 glass align-self-end w-100" >
          <div class="left w-50">
            <div class="row h-100 g-0">
              <div class="col-md-9">
                <div class="card-body h-100  d-flex flex-column justify-content-between pb-0">
                  <div class="card-title d-flex justify-content-between">
                    <small class="h6" id="dayNameT">${
                      days[fDateT.getDay()]
                    }</small>
                    <small class="h6" >Tomorrow</small>
                  </div>
                  <span class="card-text d-flex align-items-center justify-content-between">
                    <h1 id="tempT">
                    ${
                      c
                        ? data.forecast.forecastday[1].day.avgtemp_c
                        : data.forecast.forecastday[1].day.avgtemp_f
                    }<sup>o</sup>
                    </h1>
                  </span>
                  <p class="card-text">
                    <small class="fs-5 text-nowrap" id="stateT">${stateT}</small>
                  </p>
                </div>
              </div>
              <div
                class="col-md-3 d-flex justify-content-center align-items-center"
              >
                <img id="stateIconT" src="${futureIconSrcT}" class="w-100 rounded-start" alt="..." />
              </div>
            </div>
  </div>



            <div class="right w-50">
            <div class="row justify-content-end g-0">
              <div class="col-md-12">
                <div class="card-body pb-0">
                  <div class="card-title d-flex justify-content-between">
                    <small class="h6" >Chance Of Raining</small>
                  </div>
                  <span class="card-text d-flex align-items-center justify-content-center">
                <div class="pie" style="--p:${
                  data.forecast.forecastday[1].day.daily_chance_of_rain
                };--c:darkblue;--b:10px"> ${
    data.forecast.forecastday[1].day.daily_chance_of_rain
  }%</div>

                  </span>
   
                </div>
              </div>
          
            </div>
  </div>


          </div>
        </div>
`;

  for (let i = 1; i < 6; i++) {
    stat = data.forecast.forecastday[i + 1].day.condition.text;
    fDate = new Date(data.forecast.forecastday[i + 1].date);
    switch (
      true //icons
    ) {
      case stat.toLowerCase() == "sunny":
        futureIconSrc = "media/sun.png";
        break;
      case stat.toLowerCase() == "clear":
        futureIconSrc = "media/moon.png";
        break;

      case stat.toLowerCase().includes("thunder"):
        futureIconSrc = "media/thunderstorm.png";
        break;

      case stat.toLowerCase().includes("snow") ||
        stat.toLowerCase().includes("ice") ||
        stat.toLowerCase().includes("blizzard") ||
        stat.toLowerCase().includes("sleet") ||
        stat.toLowerCase().includes("freezing"):
        futureIconSrc = "media/snow.png";
        break;

      case stat.toLowerCase().includes("rain") ||
        stat.toLowerCase().includes("drizzle"):
        futureIconSrc = "media/rainy.png";
        break;

      case stat.toLowerCase().includes("cloud") ||
        stat.toLowerCase().includes("overcast"):
        futureIconSrc = "media/cloudy.png";
        break;

      case stat.toLowerCase().includes("fog") ||
        stat.toLowerCase().includes("mist"):
        futureIconSrc = "media/fog.png";
        break;

      default:
        futureIconSrc = icon;
        break;
    }

    futureCards += `
            <div class="card  py-1 text-center glass d-flex align-items-center flex-row w-100">
          <div class="card-header p-0 fs-3 w-25">
            ${days[fDate.getDay()]}
          </div>
          <div class="card-body h-auto p-0 w-50 d-flex flex-row justify-content-evenly align-items-center">
            <span class="text-wrap flex-grow-1 fs-4">${stat}</span>
            <img src="${futureIconSrc}" class="flex-grow-0" style="width:10%" alt="..." />
          </div>
          <div class="card-footer d-flex justify-content-center align-items-center w-25  h2 m-0 p-0">
            ${
              c
                ? data.forecast.forecastday[i + 1].day.avgtemp_c
                : data.forecast.forecastday[i + 1].day.avgtemp_f
            }<sup>o</sup>
          </div>
        </div>`;
  }

  document.getElementById("forecasting").innerHTML = futureCards;
  console.log("inserted");
}
document.getElementById("vbtn-radio1").addEventListener("click", function (e) {
  console.log(e.target.value);
  c = true;
  f = false;
  setDom();
});
document.getElementById("vbtn-radio2").addEventListener("click", function (e) {
  console.log(e.target.value);
  f = true;
  c = false;
  setDom();
});
async function getLocation() {
  try {
    let loc = await fetch(
      "https://api.weatherapi.com/v1/ip.json?key=1bd18fddc71240e0883134147240107&q=auto:ip"
    );
    let d = await loc.json();
    userLocation = d.city;
    if (userLocation) {
      getCurrent(userLocation);
    } else {
      getCurrent("london");
    }
  } catch (error) {
    console.log("Error getting location, defaulting to London", error);
    getCurrent("london");
  }
}

getLocation();
