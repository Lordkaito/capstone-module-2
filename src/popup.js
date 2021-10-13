

const mainSection = document.querySelector('#grid-layout');
const btn = document.createElement('button');
btn.innerText = 'Click Me';

// create the button to show the description
mainSection.appendChild(btn);

// function to close the description
const closeDescription = () => {
  const itemSection = document.querySelector('.item-section');
  itemSection.remove();
  btn.style.display = 'block';
};

// function to show description
const showDescription = () => {
  // gets the image from API
  const itemImage = document.createElement('img');
  itemImage.src = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png';

  // create the item section
  const itemDescription = document.createElement('p');
  itemDescription.innerText = 'Bulbasaur is a small, quadruped Pokémon species that is native to the grassland. It evolves from Ivysaur when exposed to sunlight. It has a flower on its back.';

  const itemName = document.createElement('h2');
  itemName.innerText = 'Bulbasaur';

  // close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'fas fa-times';
  closeBtn.addEventListener('click', closeDescription);

  // append the elements to the item section
  const itemSection = document.createElement('div');
  const elemContainer = document.createElement('div');
  elemContainer.className = 'elem-container';
  elemContainer.appendChild(closeBtn);
  elemContainer.appendChild(itemName);
  elemContainer.appendChild(itemImage);
  elemContainer.appendChild(itemDescription);
  itemSection.classList.add('item-section');
  itemSection.appendChild(elemContainer);

  const bigContainer = document.querySelector('#grid-layout');
  bigContainer.appendChild(itemSection);
  btn.style.display = 'none';
};

// add event listener to the button
btn.addEventListener('click', showDescription);

export {
  mainSection, btn, showDescription, closeDescription,
};
