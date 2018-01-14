let person4XHR = new XMLHttpRequest();
person4XHR.addEventListener(`load`, function(event) {
  let data = fetchData(event, ['name', 'homeworld']);
  document.getElementById(`person4Name`).innerHTML = data.name;

  let person4HomeworldXHR = new XMLHttpRequest();
  person4HomeworldXHR.addEventListener(`load`, function(event) {
    let data = fetchData(event, [`name`]);
    document.getElementById(`person4HomeWorld`).innerHTML = data.name;
  });
  person4HomeworldXHR.open(`GET`, data.homeworld);
  person4HomeworldXHR.send();
});
person4XHR.open('GET', 'https://swapi.co/api/people/4/');
person4XHR.send();

let person14XHR = new XMLHttpRequest();
person14XHR.addEventListener(`load`, function(event) {
  let data = fetchData(event, [`name`, `species`]);
  document.getElementById(`person14Name`).innerHTML = data.name;

  let person14SpeciesXHR = new XMLHttpRequest();
  person14SpeciesXHR.addEventListener(`load`, function(event) {
    let data = fetchData(event, [`name`]);
    document.getElementById(`person14Species`).innerHTML = data.name;
  });
  person14SpeciesXHR.open(`GET`, data.species[0]);
  person14SpeciesXHR.send();
})
person14XHR.open('GET', 'https://swapi.co/api/people/14/');
person14XHR.send();

let filmsXHR = new XMLHttpRequest();
filmsXHR.addEventListener(`load`, function(event) {
  let data = fetchData(event, [`results`]);
  data.results.forEach((curr) => {
    let film = createElement(`li`, `film`);

    let filmTitle = createElement(`h2`, `filmTitle`, curr.title);
    film.appendChild(filmTitle);

    let planets = createElement(`h3`, false, `Planets`);
    film.appendChild(planets);

    let filmPlanets = createElement(`ul`, `filmPlanets`);
    curr.planets.forEach((curr) => {
      let planet = createElement(`li`, `planet`);
      let planetXHR = new XMLHttpRequest();
      planetXHR.addEventListener(`load`, function(event) {
        let data = fetchData(event, [`name`]);
        let planetName = createElement(`h4`, `planetName`, data.name);
        planet.appendChild(planetName);
        filmPlanets.appendChild(planetName);
      });
      planetXHR.open(`GET`, curr);
      planetXHR.send();
    });
    film.appendChild(filmPlanets);

    document.getElementById(`filmList`).appendChild(film);
  });
});
filmsXHR.open(`GET`, `https://swapi.co/api/films/`);
filmsXHR.send();

function fetchData(event) {
  let args = arguments[1];
  let data = JSON.parse(event.target.responseText);
  let results = {};
  args.forEach((curr) => {
    results[curr] = data[curr];
  });
  return results;
}

function createElement(type, className, innerHTML) {
  let element = document.createElement(type);
  if (className) {
    element.className = className;
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  return element;
}