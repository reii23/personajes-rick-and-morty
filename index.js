class Personaje {
    constructor(nombre, especie, imagen) { /* se define la clase personaje con las variables nombre, especie e imagen */
      this._nombre = nombre;
      this._especie = especie;
      this._imagen = imagen;
    }

    get nombre() { // traemos el nombre con la función get //
      return this._nombre;
    }
  
    get especie() { //traemos la especie con la función get //
      return this._especie;
    }
  
    get imagen() { // traemos la imagen con la gunción get 
      return this._imagen;
    }
  
    show() { // se crea la carta con las variables nombre,imagen y especie//
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

  //función para crear y cargar los personajes en la página //
    async function cargarPersonajes() { 
        for (let i = 1; i <= 6; i++) { // cantidad de páginas cargadas (6) = 20 x 6 = 120 personajes (se puede ajustar para mostrar más)
          const response = await fetch(`https://rickandmortyapi.com/api/character?page=${i}`);
          const data = await response.json(); // ponemos un await para esperar la respuesta //
          for (let j = 0; j < data.results.length; j++) { 
            const personaje = new Personaje(    //extraemos los datos del api en una constante personaje que los almacenará//
              data.results[j].name, 
              data.results[j].species,
              data.results[j].image);
            personaje.show(); // mostramos el personaje
          }
        }
      }
      cargarPersonajes();
