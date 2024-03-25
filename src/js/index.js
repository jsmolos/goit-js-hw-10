import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_neNdeucoC6cUreSoJqNEk0gES1wbTzVXVn1HyXnuK3c5R6cVJpFz6AWjvfuIZ50H";

const breedSelectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

function chooseBreed() {
  loaderEl.classList.remove('is-hidden');
  breedSelectEl.classList.add('is-hidden');
  catInfoEl.classList.add('is-hidden');

  fetchBreeds()
    .then(data => {
      populateBreeds(data);
      loaderEl.classList.add('is-hidden');
      breedSelectEl.classList.remove('is-hidden');
    })
    .catch(error => {
      console.error('Error fetching cat breeds:', error);
      errorEl.classList.remove('is-hidden');
    });
}

function createMarkup(event) {
  loaderEl.classList.remove('is-hidden');
  breedSelectEl.classList.add('is-hidden');
  catInfoEl.classList.add('is-hidden');

  const breedId = event.target.value;

  fetchCatByBreed(breedId)
    .then(data => {
      const { url, breeds } = data[0];
      const { name, description, temperament } = breeds[0];

      catInfoEl.innerHTML = `
        <img src="${url}" alt="${name}" width="400">
        <div class="box">
          <h2>${name}</h2>
          <p>${description}</p>
          <p><strong>Temperament:</strong> ${temperament}</p>
        </div>
      `;
      loaderEl.classList.add('is-hidden');
      catInfoEl.classList.remove('is-hidden');
    })
    .catch(error => {
      console.error('Error fetching cat data:', error);
      errorEl.classList.remove('is-hidden');
    });
}
function onError() {
  errorEl.classList.remove('is-hidden');
  loaderEl.classList.add('is-hidden');
  breedSelectEl.classList.remove('is-hidden');

  Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!');
}