const BASE_URL = 'https://api.thecatapi.com/v1';
 const API_KEY ='live_neNdeucoC6cUreSoJqNEk0gES1wbTzVXVn1HyXnuK3c5R6cVJpFz6AWjvfuIZ50H';

 export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
}