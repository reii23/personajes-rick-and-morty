class Personaje {
  constructor(nombre, especie, imagen) {
      this._nombre = nombre;
      this._especie = especie;
      this._imagen = imagen;
  }

  get nombre() {
      return this._nombre;
  }

  get especie() {
      return this._especie;
  }

  get imagen() {
      return this._imagen;
  }

  show() {
      let card = `
        <div class="col-sm-12 col-md-6 col-lg-4">
          <div class="card">
            <img src="${this._imagen}" class="card-img-top" alt="${this._nombre}">
            <div class="card-body">
              <h5 class="card-title">${this._nombre}</h5>
              <p class="card-text">${this._especie}</p>
            </div>
          </div>
        </div>`;
      document.getElementById('cards-container').innerHTML += card;
  }
}

const personajesCargados = [];

async function cargarPersonajes() {
  for (let i = 1; i <= 6; i++) {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${i}`);
      const data = await response.json();
      data.results.forEach(result => {
          const personaje = new Personaje(result.name, result.species, result.image);
          personajesCargados.push(personaje);
      });
  }
  mostrarPersonajes(personajesCargados);
}

function filtrarPersonajes(personajes, filtro) {
  return personajes.filter(personaje =>
      personaje.nombre.toLowerCase().includes(filtro.toLowerCase())
  );
}

document.getElementById('search-button').addEventListener('click', function () {
  const filtro = document.getElementById('search-bar-input').value;
  const personajesFiltrados = filtrarPersonajes(personajesCargados, filtro);
  mostrarPersonajes(personajesFiltrados);
});

function mostrarPersonajes(personajes) {
  const cardsContainer = document.getElementById('cards-container');
  cardsContainer.innerHTML = '';

  personajes.forEach(personaje => {
      personaje.show();
  });
}

cargarPersonajes();
