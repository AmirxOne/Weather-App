const input = document.querySelector("input");
const submit = document.querySelector("button");
const msg = document.querySelector(".msg");
const cities = document.querySelector(".container .cities");

const apiKey = "bb63df65ce5ae5424fcd2403b12c8b09"

submit.addEventListener("click", e => {
    e.preventDefault();
    const inputValue = input.value
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const {name, main, sys, weather} = data
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
            const li = document.createElement("li");
            li.classList.add("city")
            li.setAttribute("data-name", name)
            li.innerHTML = `
            <h1 class="city-name" data-name=${name},${sys.country}>
                <span>${name}</span>
                <span>${sys.country}</span>
            </h1>
            <div class="city-temp">${Math.round(main.temp)}</div>
            <figure>
                <img src="${icon}" class="city-icon" alt="">
                <figcaption>${weather[0]["description"]}</figcaption>
            </figure> 
            `
            cities.appendChild(li)

            msg.innerText = ""
            input.value = ""

        })
        .catch(function () {
            msg.innerText = "search for valid city"
            input.value = ""
        })
})