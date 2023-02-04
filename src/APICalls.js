
const getRequest = (id) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`).then(
    (response) => response.json()
  );
}


export default getRequest;