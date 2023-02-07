import movieData from '../fixtures/all-movies.json'

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
          movies: movieData
        }
      }
    )
    cy.get('h1').contains('Funky Flix');

    cy.get('div[id="436270"]').find("img").should('be.visible');
    cy.get('div[id="436270"] > h2:nth-of-type(1)').should('contain', 'Black Adam')
    cy.get('div[id="436270"] > h2:nth-of-type(2)').should('contain', 'Funk Score: 4')

    cy.get('div[id="724495"]').find("img").should('be.visible');
    cy.get('div[id="724495"] > h2:nth-of-type(1)').should('contain', 'The Woman King')
    cy.get('div[id="724495"] > h2:nth-of-type(2)').should('contain', 'Funk Score: 4')
  })

})