import './style.css';
import {
  mainSection, timeOut, showDescription, closeDescription, btn
} from './popup'

const baseURL = 'https://pokeapi.co/api/v2/';

const element = document.getElementById('grid-layout');

const fetchPokeman = async (name) => {
  const fetchPokemanName = [];
  const result = await fetch(`${baseURL}pokemon/${name}`);
  const data = await result.json();
  fetchPokemanName.push(data.sprites.front_default, data.name);
  return fetchPokemanName;
};

const createCard = (imagePara) => {
  const html = `
  <img src="${imagePara[0]}" alt="wireframe-image">
  <p class='name'>${imagePara[1]}</p>
  <i class="far fa-heart"></i>
  <p>5 Likes</p>
  <button>Comments</button>
  `;
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = html;
  element.appendChild(div);
};

const fetchAllPokemonNames = async () => {
  const result = await fetch(`${baseURL}pokemon?limit=9`);
  const data = await result.json();

  data.results.forEach(async (pokeman) => {
    const image = await fetchPokeman(pokeman.name);
    createCard(image);
  });
};
fetchAllPokemonNames();
timeOut();

export {
  fetchPokeman, createCard, fetchAllPokemonNames
}