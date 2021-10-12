import './style.css';

const baseURL = 'https://pokeapi.co/api/v2/';
// const involvementAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

const element = document.getElementById('grid-layout');

const fetchPokeman = async (name) => {
  const result = await fetch(`${baseURL}pokemon/${name}`);
  const data = await result.json();
  // console.log(data)
  return data.sprites.back_default;
};
fetchPokeman('ditto');

const createCard = (imagePara) => {
  const html = `
  <img src="${imagePara}" alt="wireframe-image">
  <p>Space 1</p>
  <i class="far fa-heart"></i>
  <p>5 Likes</p>
  <button>Comments</button>
  `;
  const div = document.createElement('div');
  div.innerHTML = html;
  element.appendChild(div);
};

const fetchAllPokemonNames = async () => {
  const result = await fetch(`${baseURL}pokemon?limit=6`);
  const data = await result.json();
  data.results.forEach(async (pokeman) => {
    const image = await fetchPokeman(pokeman.name);
    createCard(image);
  });
};
fetchAllPokemonNames();
