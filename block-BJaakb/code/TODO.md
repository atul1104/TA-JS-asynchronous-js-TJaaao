## XMLHttpRequest + Promise

- Create a function named `fetch` which can accept one parameter an `url` and returns a promise.
- Use `XMLHttpRequest` to make a network request using the `url` from parameter
- When the data is loaded resolve the promise with the value
- If there is any issue loading data reject the promise with an error message

```js
function fetch(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => resolve(JSON.parse(xhr.response));
    xhr.onerror = () => reject('Something went wrong');
    xhr.send();
  });
}
```

Add-on:

- Refactor the image search app you created (in previous exercise) to use the function `fetch` you created above.
