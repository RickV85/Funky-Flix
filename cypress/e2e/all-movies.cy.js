import movieData from '../fixtures/all-movies.json'
import singleMovie from '../fixtures/single-movie.json'

describe('All Movies', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    
  });

  it('Should display the site title, movie posters, titles and funk scores', () => {
    cy.intercept({
        method: 'GET',
        url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'
      },
      {
        statusCode: 200,
        body: {
          movies: movieData
        }
      }
    )
    cy.get('h1').contains('Funky Flix');

    cy.get('div[id="436270"]').find("img").should('be.visible');
    cy.get('div[id="436270"] > h2:nth-of-type(1)').should('contain', 'Black Adam')
    cy.get('div[id="436270"] > h2:nth-of-type(2)').should('contain', 'Funk Factor: 4')

    cy.get('div[id="724495"]').find("img").should('be.visible');
    cy.get('div[id="724495"] > h2:nth-of-type(1)').should('contain', 'The Woman King')
    cy.get('div[id="724495"] > h2:nth-of-type(2)').should('contain', 'Funk Factor: 4')
  })

  it("Should be able to search for a movie by title", () => {
    cy.intercept(
      {
        method: "GET",
        url: "https://rancid-tomatillos.herokuapp.com/api/v2/movies",
      },
      {
        statusCode: 200,
        body: {
          movies: movieData,
        },
      }
    );
    cy.get('input[class="search-input"]').type("Woman")
    cy.get('div[id="436270"]').should("not.exist")
    cy.get('div[id="724495"]').should("be.visible")
  })

  it("Should be able to sort the movies", () => {
    cy.intercept(
      {
        method: "GET",
        url: "https://rancid-tomatillos.herokuapp.com/api/v2/movies",
      },
      {
        statusCode: 200,
        body: {
          movies: movieData,
        },
      }
    );
    cy.get("select").select(4);
    cy.get('input[class="sort-button"]').click();
    cy.get('section[class="all-movies-view"] > a:nth-of-type(1)').should("contain", "The Woman King");
    cy.get('section[class="all-movies-view"] > a:nth-of-type(2)').should("contain", "Black Adam");
  });

  it('Should show the user an error message if the server is down', () => {
    cy.intercept({
      method: 'GET',
      url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'
    },
    {
      statusCode: 500,
      ok: false,
      body: {
        movies: ''
      }
    })

    cy.get('h2').should('contain', 'Sorry - We are having server issues. Please try again later.')
  })

  it('Should direct a user to the movie details page for the movie they click', () => {
    cy.intercept({
      method: 'GET',
      url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'
    },
    {
      statusCode: 200,
      body: {
        movies: movieData
      }
    }
  )
    cy.intercept({
      method: 'GET',
      url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/436270'
    },
    {
      statusCode: 200,
      body: singleMovie
    }
  )
  cy.get('div[id="436270"]').click()
  cy.get('section[class="single-movie-display"]')
  .contains('Black Adam')

  })
})