import './style.css';
// eslint-disable-next-line import/no-cycle
import { timeOut } from './popup.js';
import { apiLikes, involvemntApi, appId } from './api-likes.js';

// newApp();
const baseURL = 'https://pokeapi.co/api/v2/';
const element = document.getElementById('grid-layout');

const fetchPokeman = async (name) => {
  const fetchPokemanName = [];
  const result = await fetch(`${baseURL}pokemon/${name}`);
  const data = await result.json();
  fetchPokemanName.push(data.sprites.front_default, data.name, data.id);
  return fetchPokemanName;
};

const createCard = (imagePara, numberOfLikes) => {
  const html = `
  <img src="${imagePara[0]}" alt="wireframe-image">
  <p class='name'>${imagePara[1]}</p>
  <i class="heart-icon far fa-heart"></i>
  <p class="likes">${numberOfLikes} Likes</p>
  <button class='btn'>Comments</button>
  `;
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = html;

  const heartIcon = div.querySelector('.heart-icon');
  heartIcon.addEventListener('click', async () => {
    await fetch(`${involvemntApi}apps/${appId}/likes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_id: imagePara[2],
      }),
    });
    const likes = div.querySelector('.likes');
    const pokemonLikes = await apiLikes();
    const obj = pokemonLikes.find((x) => {
      if (x.item_id === imagePara[2]) return true;
      return false;
    });

    likes.innerHTML = `${obj.likes} Likes`;
  });

  element.appendChild(div);
};

const itemCalculator = (itemArray) => itemArray.length;

const fetchAllPokemonNames = async () => {
  const result = await fetch(`${baseURL}pokemon?limit=9`);
  const data = await result.json();
  const allLikes = await apiLikes();
  const spaceship = document.querySelector('.spaceship');
  spaceship.textContent = `Spacehips (${itemCalculator(data.results)})`;

  data.results.forEach(async (pokeman) => {
    const image = await fetchPokeman(pokeman.name);
    const particularId = allLikes.find((item) => item.item_id === image[2]);
    let likes = 0;
    if (particularId) {
      likes = particularId.likes;
    }
    createCard(image, likes);
  });
};

fetchAllPokemonNames();
timeOut();

export {
  fetchPokeman, createCard, fetchAllPokemonNames, baseURL,
};
