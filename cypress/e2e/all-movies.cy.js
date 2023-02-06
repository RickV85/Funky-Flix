import movies from '../fixtures/all-movies.json'

describe('All Movies', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    
  });

  it('Should display the site title', () => {
    cy.intercept({
      method: 'GET',
      url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'
    },
    {
      statusCode: 200,
      body: {
        movies: [
          {
          id: 436270,
          poster_path: "https://image.tmdb.org/t/p/original//pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
          backdrop_path: "https://image.tmdb.org/t/p/original//bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
          title: "Black Adam",
          average_rating: 4,
          release_date: "2022-10-19"
          }
        ]
      }
    }
    )
    cy.get('h1').contains('Funky Flix')
  })

})