
const getRequest = (id) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } 
        throw new Error();
    }
  );
}


export default getRequest;