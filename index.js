var form = document.querySelector('form')
const key = "a4e4c14d565d00a304ba45db3784b12a"
var URL = "https://api.openweathermap.org/data/2.5/weather?q="
var search = "&units=imperial&appid=" + key
var weather = document.getElementById('weather')


form.onsubmit = function(e) {
    e.preventDefault()
    var searchTerm = this.search.value.trim()
    if(!searchTerm) return
    fetch(URL + searchTerm + search)
    .then(function(res) {
        if (res.status !== 200){
            form.search.value = ""
            throw new Error("Location not found")
        }
        return res.json()
        
    })
    .then(function(data) {
        weather.innerHTML = ""
        form.search.value = ""
        var h2 = document.createElement('h2')
        h2.textContent = data.name + ", " + data.sys.country
        weather.appendChild(h2)
        var a = document.createElement('a')
        a.href = 'https://www.google.com/maps/search/?api=1&query=' + data.coord.lat + "," + data.coord.lon
        a.target = "__BLANK"
        a.innerHTML = "Click to view map"
        weather.appendChild(a)
        var icon = document.createElement('img')
        icon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        weather.appendChild(icon)
        var description = document.createElement('p')
        description.style.textTransform = "capitalize"
        description.textContent = data.weather[0].description
        weather.appendChild(description)
        weather.appendChild(document.createElement('br'))
        var current = document.createElement('p')
        current.textContent = "Current: " + data.main.temp + "° F"
        weather.appendChild(current)
        var feelsLike = document.createElement('p')
        feelsLike.textContent = "Feels Like: " + data.main.feels_like + "° F"
        weather.appendChild(feelsLike)
        weather.appendChild(document.createElement('br'))
        var date = new Date(data.dt)
        var timeString = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        })
        var update = document.createElement('p')
        update.textContent = "Last updated: " + timeString
        weather.appendChild(update)
    })
    .catch(function(err){
        weather.innerHTML = err.message
    })
}