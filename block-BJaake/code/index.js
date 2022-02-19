let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=50`;
let newsElm = document.querySelector('.news');
let select = document.querySelector('select');
let allNews = [];

//   <li class="flex">
//     <img
//       src="https://media.istockphoto.com/photos/breaking-news-3d-rendering-virtual-set-studio-picture-id1219965949?k=20&m=1219965949&s=612x612&w=0&h=9yXmM0qrzrAtVCn3p2F8RwVzsFn-qD44jIWAFyK8wGM="
//       alt=""
//     />
//     <div>
//       <span class="source">NDTV News</span>
//       <h3>
//         Hijab not essential religious practice, Karnataka government tells HC
//       </h3>
//       <button>Read More</button>
//     </div>
//   </li>;

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

fetch(url)
  .then((response) => response.json())
  .then((news) => {
    console.log(news);
    allNews = news;
    renderNews(news);
    let allSources = Array.from(new Set(news.map((n) => n.newsSite)));
    displaySources(allSources);
  });

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
