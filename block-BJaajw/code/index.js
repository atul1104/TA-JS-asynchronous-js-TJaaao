let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=50`;
let newsElm = document.querySelector('.news');
let select = document.querySelector('select');
let allNews = [];
let errorElm = document.querySelector('.error_msg');
let main = document.querySelector('.main');

function handleErrorMsg(message = 'Something Went Wrong') {
  main.style.display = 'none';
  errorElm.style.display = 'block';
  errorElm.innerText = message;
}

function handleSpinner(status = false) {
  if (status) {
    newsElm.innerHTML = `<div class="donut"></div>`;
  }
}

//<div class="donut"></div>;

function renderNews(news) {
  newsElm.innerHTML = '';
  news.forEach((newsItem) => {
    let li = document.createElement('li');
    li.classList.add('flex');
    let img = document.createElement('img');
    img.src = newsItem.imageUrl;
    img.alt = newsItem.title;
    let div = document.createElement('div');
    let span = document.createElement('span');
    span.classList.add('source');
    span.innerText = newsItem.newsSite;
    let h3 = document.createElement('h3');
    h3.innerText = newsItem.title;
    let a = document.createElement('a');
    let button = document.createElement('button');
    a.append(button);
    button.innerText = 'Read More';
    a.href = newsItem.url;
    div.append(span, h3, a);
    li.append(img, div);
    newsElm.append(li);
  });
}

function displaySources(allSources) {
  allSources.forEach((source) => {
    let option = document.createElement('option');
    option.innerText = source;
    option.value = source;
    select.append(option);
  });
}

function init() {
  isLoading = true;
  handleSpinner(true);
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Response is not OK!');
      }
    })
    .then((news) => {
      console.log(news);
      allNews = news;
      renderNews(news);
      let allSources = Array.from(new Set(news.map((n) => n.newsSite)));
      displaySources(allSources);
    })
    .catch((error) => {
      handleErrorMsg(error);
    })
    .finally(() => {
      handleSpinner();
    });
}

select.addEventListener('change', (event) => {
  let source = event.target.value.trim();
  let filteredNews;
  if (source) {
    filteredNews = allNews.filter((news) => news.newsSite === source);
  } else {
    filteredNews = allNews;
  }
  renderNews(filteredNews);
});

if (navigator.onLine) {
  init();
} else {
  handleErrorMsg('Check Your Internet Connection!');
}
