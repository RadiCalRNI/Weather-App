const input = document.querySelector("input");
const form = document.querySelector("form");
const list = document.querySelector(".cities");
const msg = document.querySelector(".msg");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = input.value;
  const apiKey = "bcee59f5eee40936fa0d5b52e9fbeeaf";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { name, sys, weather, main } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
      addCity(name, sys, weather, main, icon);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city";
    });
});

function addCity(name, sys, weather, main, icon) {
  let li = document.createElement("li");
  li.className = "listItem";
  li.innerHTML = `
          <p>${name} <span>${sys.country}</span></p>
          <span class="temp">${Math.round(main.temp)}&#8451;</span>
          <img src="${icon}" alt="condition">
          <p>${weather[0]["description"]}</p>
        `;
  list.appendChild(li);
  msg.innerHTML = "";
  input.value = "";
}
