const commentAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/gggCBSax83rR3Kv2Y5vr/';

const mainSection = document.querySelector('#grid-layout');

// function to close the description
const closeDescription = () => {
  const itemSection = document.querySelector('.item-section');
  itemSection.remove();
};

const getComments = async (id, commentSection) => {
  const response = await fetch(`${commentAPI}${'comments?item_id='}${id}`);
  const data = await response.text();
  const parsedData = JSON.parse(data);
  const elemContainer = document.querySelector('.elem-container');
  let counter = 0;
  const counterDiv = document.createElement('div');
  counterDiv.className = 'counter';
  parsedData.forEach((comment) => {
    counter += 1;
    console.log(elemContainer);
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    const commentName = document.createElement('h3');
    const commentP = document.createElement('p');
    commentName.innerText = comment.username;
    commentP.innerText = comment.comment;
    commentDiv.appendChild(commentName);
    commentDiv.appendChild(commentP);
    commentSection.appendChild(commentDiv);
  });
  counterDiv.innerText = `${counter} comments`;
  elemContainer.appendChild(counterDiv);
};
// function to show description
const showDescription = (e) => {
  // gets the image from API
  const itemImage = document.createElement('img');
  const parentCard = e.target.parentElement;
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
  const nameInput = document.createElement('input');
  const commentInput = document.createElement('input');

  const submitBtn = document.createElement('button');

  const commentSection = document.createElement('div');

  const getImage = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${parentCard.childNodes[3].textContent}`)
      .then((res) => res.json())
      .then((data) => {
        itemImage.src = data.sprites.front_default;
        parentCard.id = data.id;
        getComments(data.id, commentSection);
      });
  };
  getImage();

  const clearValues = () => {
    const commentValue = document.querySelector('.comment-input');
    const nameValue = document.querySelector('.name-input');
    commentValue.value = '';
    nameValue.value = '';
  };

  const sendComment = () => {
    const commentValue = document.querySelector('.comment-input').value;
    const nameValue = document.querySelector('.name-input').value;

    const sendToApi = async () => {
      const response = await fetch(`${commentAPI}${'comments'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: commentValue,
          username: nameValue,
          item_id: parentCard.id,
        }),
      });
      const data = await response.text();
      return data;
    };
    sendToApi();
    clearValues();
  };

  submitBtn.addEventListener('click', sendComment);

  elemContainer.className = 'elem-container';
  elemContainer.appendChild(closeBtn);
  elemContainer.appendChild(itemName);
  elemContainer.appendChild(itemImage);

  commentSection.className = 'comment-section';
  nameInput.className = 'name-input';
  nameInput.placeholder = 'Name';
  commentInput.className = 'comment-input';
  commentInput.placeholder = 'Type your comment here...';
  submitBtn.className = 'submit-btn';
  submitBtn.innerText = 'Submit';

  elemContainer.appendChild(nameInput);
  elemContainer.appendChild(commentInput);
  elemContainer.appendChild(submitBtn);
  elemContainer.appendChild(commentSection);
  itemSection.classList.add('item-section');
  itemSection.appendChild(elemContainer);

  const bigContainer = document.querySelector('#grid-layout');
  bigContainer.appendChild(itemSection);
};

let btn;
const timeOut = () => {
  setTimeout(() => {
    btn = document.querySelectorAll('.btn');
    btn.forEach((button) => {
      button.addEventListener('click', (e) => showDescription(e));
    });
  }, 1000);
};

export {
  mainSection, timeOut, showDescription, closeDescription,
};
