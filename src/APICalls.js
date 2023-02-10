
const getRequest = (id, videos) => {
  let url;
  if (videos) {
    url = `https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}/videos`
  } else {
    url = `https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`
  }
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } 
        throw new Error();
    }
  );
}


export default getRequest;