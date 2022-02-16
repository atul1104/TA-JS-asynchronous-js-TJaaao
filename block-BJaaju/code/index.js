const url =
  'https://api.unsplash.com/photos/?client_id=X1rowR_k5tezp4KvncEhbvcpQr_I1V-HG-29_rzxqGE';
let root = document.querySelector('.images');
let serachBar = document.querySelector('input');
let getSearchUrl = (query) =>
  `https://api.unsplash.com/search/photos?&query=${query}&client_id=X1rowR_k5tezp4KvncEhbvcpQr_I1V-HG-29_rzxqGE`;

function fetch(url, successHandler) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => successHandler(JSON.parse(xhr.response));
  xhr.onerror = function () {
    console.log(`Something went wrong`);
  };
  xhr.send();
}

function displayImages(images) {
  root.innerHTML = '';
  images.forEach((image) => {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = image.urls.regular;
    li.append(img);
    root.append(li);
  });
}

fetch(url, displayImages);

function handleSearch(event) {
  if (event.keyCode === 13 && serachBar.value) {
    fetch(getSearchUrl(serachBar.value), (searchResults) => {
      displayImages(searchResults.results);
    });
    serachBar.value = '';
  }
}

serachBar.addEventListener('keyup', handleSearch);
