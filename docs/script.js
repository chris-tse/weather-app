let celcius = true;
let degrees;
let sunset;

function getWeather (position) {
    let lat = position.coords.latitude
    let long = position.coords.longitude
    let url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`
    axios.get(url)
        .then( res => {
            degrees = res.data.main.temp
            sunset = res.data.sys.sunset
            document.getElementById("loading").classList.add("hidden")
            document.getElementById("app").classList.remove("hidden")
            document.getElementById("app").classList.add("fadein")
            document.getElementById("locname").innerText = res.data.name
            document.getElementById("desc").innerText = res.data.weather[0].main
            updateIcon(res.data.weather[0].id)
            updateTemp(degrees)
            console.log(res.data)
        })
}

function updateTemp(deg) {
    let temp = document.getElementById("temp")
    if (celcius) {
        temp.innerText = parseInt(deg)
        temp.innerHTML += "&deg;C"
    } else {
        temp.innerText = parseInt((deg * 9 / 5) + 32)
        temp.innerHTML += "&deg;F"
    }
}

function updateIcon(id) {
    let idArr = id.toString().split('')
    let icon = "wi"
    let daytime = isDaytime()

    if (daytime) {
        icon += "-day"
    } else {
        icon += "-night"
    }

    switch(idArr[0]) {
        case '8':
            if (idArr[2] === '0') {
                if (daytime){ 
                    icon += '-sunny'
                    console.log("Sunny")
                } else {
                    icon += '-clear'
                    console.log("Night")
                }
            }
            else {
                icon += '-cloud'
            }
            break;


        case '2':
        case '3':
        case '5':
            icon += '-rain'
            break;

        case '6':
            icon = 'wi-snow'
            break;


    }
    document.getElementById("icon").classList.add(icon)
}

function isDaytime() {
    return (new Date).getHours() < 19
}

function toggleUnits() {
    celcius = !celcius
    updateTemp(degrees)
}


window.onload = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition( getWeather, err => {
            console.log("Could not retrieve location")
        })
    } else {
        console.log("rip geolocation")
    }
}



