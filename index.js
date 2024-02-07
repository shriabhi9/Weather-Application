const head1 = document.querySelector("[data-header1]");
const head2 = document.querySelector("[data-header2]");
const searchBtn1 = document.querySelector("[data-searchBtn1]");
const searchBtn2 = document.querySelector("[data-searchBtn2]");
const weatherBtn = document.querySelector("[weather-btn]");
const backBtn = document.querySelector("[data-backBtn]");
const dataInput = document.querySelector("[data-input]");
const InfoContainer = document.querySelector("[data-infoContainer]");
const WeatherImg = document.querySelector("[data-weatherImg]");
const temprature = document.querySelector("[data-temprature]");
const WeatherType = document.querySelector("[data-weatherType]");
const Flag = document.querySelector("[data-flagImg]");
const CityName = document.querySelector("[data-cityName]");
const time = document.querySelector("[data-time]");
const loading = document.querySelector("[data-loading]");
const clouds = document.querySelector("[data-cloud]");
const humidity = document.querySelector("[data-humidity]");
const wind = document.querySelector("[data-wind]");
const accesContainer = document.querySelector("[data-location-container]");
const accesBtn = document.querySelector("[data-access-btn]");

let Api_Key = "07bdb9191708da3cf8ce9fa764ecd950";
getLocation();    
// switching the tab
searchBtn1.addEventListener('click',()=>{
    setTimeout(() => {
        head2.classList.remove("scale-0");
        backBtn.classList.remove("scale-0");
        loading.classList.add("scale-0");
    }, 200);
    InfoContainer.classList.add("scale-0");
    searchBtn1.classList.add("scale-0");
    loading.classList.remove("scale-0");
});

backBtn.addEventListener('click',()=>{
    InfoContainer.classList.remove("scale-0");
    searchBtn1.classList.remove("scale-0");
    backBtn.classList.add("scale-0");
    head2.classList.add("scale-0");
});

function kelvinToCelsius(kelvin) {
    var celsius = (kelvin - 273.15);
    return celsius.toFixed(2);
  }
  
function showData(data){
    CityName.innerText = data?.name;
    WeatherImg.src = `https://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`;
    Flag.src = `https://flagcdn.com/16x12/${data?.sys?.country.toLowerCase()}.png`;
    temprature.innerText = kelvinToCelsius(data?.main?.temp) + " °C";
    WeatherType.innerText = data?.weather[0]?.main;
    clouds.innerText = "CLOUD " + data?.clouds.all+"%";
    humidity.innerText = "HUMIDITY " + data?.main.humidity +"%";
    wind.innerText = "WIND " + data?.wind?.speed +" kmph";
    time.innerText = Date();

}
async function fetchUserWeather(lat,lon){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Api_Key}`);
        let data = await response.json();
        console.log(data);
        showData(data);
    }catch(e){
        console.log("pie")
    }
    
}
// will check if coordinates are already present in session storage
function getlocationfromSessionStorage(){
    if (sessionStorage.getItem("latitude") && sessionStorage.getItem("longitude")) {
        // Coordinates exist in session storage
        var latitude = sessionStorage.getItem("latitude");
        var longitude = sessionStorage.getItem("longitude");

        fetchUserWeather(latitude,longitude);
    }
}
weatherBtn.addEventListener('click',()=>{
    getlocationfromSessionStorage();
});

// Finding Geolocation
function showPositon(position){
    if (!sessionStorage.getItem("latitude") && !sessionStorage.getItem("longitude")){
        sessionStorage.setItem('longitude',position.coords.longitude);
        sessionStorage.setItem('latitude',position.coords.latitude);
    }
    getlocationfromSessionStorage();
}
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPositon)
    }else{
        alert("Invalid Location")
    }
}
let ci = "";
dataInput.addEventListener('input',(e)=>{
    if(e.target.value){
        ci = e.target.value;
    }
});
searchBtn2.addEventListener('click',()=>{
    if(ci){
        fetchCityData(ci);
    }
});
async function fetchCityData(ci){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ci}&appid=${Api_Key}`);
        let data = await response.json();
        showData(data);
        InfoContainer.classList.remove("scale-0");
        head2.classList.add("scale-0");
        searchBtn1.classList.remove("scale-0");
        backBtn.classList.add("scale-0");
        
    }catch(e){
        console.log("pie")
    }
}


