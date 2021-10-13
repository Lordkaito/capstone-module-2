import { isEmpty } from "lodash";
import { fetchAllPokemonNames } from "./index";


const mainSection = document.querySelector('#grid-layout');
let btn;
const timeOut = () => {
  setTimeout(() => {
    btn = document.querySelectorAll('button');
    btn.forEach((button) => {
      button.addEventListener('click', (e) => showDescription(e));
    });
  }, 1000);
};

// function to close the description
const closeDescription = () => {
  const itemSection = document.querySelector('.item-section');
  itemSection.remove();
};
// function to show description
const showDescription = (e) => {
  // gets the image from API
  const itemImage = document.createElement('img');
  itemImage.src = ''
  const getImage = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${e.target.parentElement.childNodes[3].textContent}`)
      .then(res => res.json())
      .then((data) => {
        itemImage.src = data.sprites.front_default;
      });
  };
  getImage();

  // // create the item section

  const itemName = document.createElement('h2');
  itemName.innerText = e.target.parentElement.childNodes[3].textContent;

  // // close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'fas fa-times';
  closeBtn.addEventListener('click', closeDescription);

  // // append the elements to the item section
  const itemSection = document.createElement('div');
  const elemContainer = document.createElement('div');
  elemContainer.className = 'elem-container';
  elemContainer.appendChild(closeBtn);
  elemContainer.appendChild(itemName);
  elemContainer.appendChild(itemImage);
  itemSection.classList.add('item-section');
  itemSection.appendChild(elemContainer);

  const bigContainer = document.querySelector('#grid-layout');
  bigContainer.appendChild(itemSection);
};

export {
  mainSection, timeOut, showDescription, closeDescription, btn
};
