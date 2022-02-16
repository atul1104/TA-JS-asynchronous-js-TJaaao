const input = document.querySelector('input');
const profileImg = document.querySelector('.profile-img');
const name = document.querySelector('.name');
const userid = document.querySelector('.userid');
const followers = document.querySelector('.followers');
const following = document.querySelector('.following');

function createUI(data) {
  profileImg.src = data.avatar_url;
  name.innerText = data.name;
  userid.innerText = data.login;
}

function createFollowersUI(data) {
  followers.innerHTML = '';
  console.log(data.length);
  if (data.length > 4) {
    for (let i = 0; i < 5; i++) {
      let img = document.createElement('img');
      img.src = data[i].avatar_url;
      followers.append(img);
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      let img = document.createElement('img');
      img.src = data[i].avatar_url;
      followers.append(img);
    }
  }
}

function createFollowingUI(data) {
  following.innerHTML = '';
  // let h2 = document.createElement("h2");
  // h2.innerText = "Following: "
  // following.append(h2);
  console.log(data.length);
  if (data.length > 4) {
    for (let i = 0; i < 5; i++) {
      let img = document.createElement('img');
      img.src = data[i].avatar_url;
      following.append(img);
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      let img = document.createElement('img');
      img.src = data[i].avatar_url;
      following.append(img);
    }
  }
}

input.addEventListener('keyup', handleKeyup);

function handleKeyup(event) {
  if (event.keyCode === 13) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/users/${event.target.value}`);
    xhr.onload = () => {
      let userData = JSON.parse(xhr.response);
      // console.log(userData);
      createUI(userData);
    };
    xhr.send();

    let xhr1 = new XMLHttpRequest();
    xhr1.open(
      'GET',
      `https://api.github.com/users/${event.target.value}/followers`
    );
    xhr1.onload = () => {
      let userData = JSON.parse(xhr1.response);
      console.log(userData[0].avatar_url);
      createFollowersUI(userData);
    };
    xhr1.send();

    let xhr2 = new XMLHttpRequest();
    xhr2.open(
      'GET',
      `https://api.github.com/users/${event.target.value}/following`
    );
    xhr2.onload = () => {
      let userData = JSON.parse(xhr2.response);
      console.log(userData[0].avatar_url);
      createFollowingUI(userData);
    };
    xhr2.send();
  }
}

const button = document.querySelector('button');

button.addEventListener('click', handleClick);

function handleClick(event) {
  let xhr1 = new XMLHttpRequest();
  xhr1.open(
    'GET',
    `https://api.thecatapi.com/v1/images/search?limit=1&size=full`
  );
  xhr1.onload = () => {
    let userData = JSON.parse(xhr1.response);
    console.log(userData[0].url);
    document.querySelector('.cat-img').src = userData[0].url;
  };
  xhr1.send();
}
