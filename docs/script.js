const getWeather = position => {
    let lat = position.coords.latitude
    let long = position.coords.longitude
    let url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`
    axios.get(url)
        .then( res => {
            let name = res.data.name
            document.getElementById("locname").innerText = name
            console.log(res.data.name)
            console.log(res.data)
        })
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



