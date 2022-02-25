let modalWindow = document.querySelector('.modal_window');
let modalClose = document.querySelector('.modal_close');
let openButton = document.querySelector('.btn');
let booksUL = document.querySelector('.book--list');
let charactersUL = document.querySelector('.characters');
const booksURL = 'https://www.anapioficeandfire.com/api/books';

function handleSpinner(rootElm, status = false) {
  if (status) {
    rootElm = `<div class="spinner"> <div class="donut"></div> </div>`;
  }
}

function displayCharacters(characters) {
  handleSpinner(charactersUL, true);
  Promise.all(
    characters.map((character) =>
      fetch(character).then((response) => response.json())
    )
  ).then((charactersData) => {
    charactersUL.innerHTML = '';
    charactersData.forEach((ch) => {
      let li = document.createElement('li');
      li.innerText = `${ch.name} : (${ch.aliases.join(' ')})`;
      charactersUL.append(li);
    });
  });
}

function displayBooks(data) {
  booksUL.innerHTML = '';
  data.forEach((book) => {
    let li = document.createElement('li');
    let h3 = document.createElement('h3');
    h3.innerText = book.name;
    let p = document.createElement('p');
    p.innerText = book.authors.join(' ');
    let button = document.createElement('button');
    button.classList.add('btn');
    button.innerText = `Show Characters (${book.characters.length})`;
    button.addEventListener('click', () => {
      console.log('clicked');
      modalWindow.style.display = 'block';
      displayCharacters(book.characters);
      modalWindow.querySelector('.btn').addEventListener('click', () => {
        console.log('close-clicked');
        modalWindow.style.display = 'none';
      });
    });
    li.append(h3, p, button);
    booksUL.append(li);
  });
}

function fetchBooks() {
  handleSpinner(booksUL, true);
  fetch(booksURL)
    .then((response) => response.json())
    .then((booksData) => {
      displayBooks(booksData);
    })
    .finally(() => {
      handleSpinner(booksUL);
    });
}
fetchBooks();
