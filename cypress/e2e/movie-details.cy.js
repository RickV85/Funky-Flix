import singleMovie from "../fixtures/single-movie.json";
import movieData from "../fixtures/all-movies.json";

describe("Single Movie View", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "https://rancid-tomatillos.herokuapp.com/api/v2/movies/436270",
      },
      {
        statusCode: 200,
        body: singleMovie,
      }
    );

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

    cy.visit("http://localhost:3000");
    cy.get('div[id="436270"]').click();
  });

  it("Should display the movie name, tagline, poster, and overview ", () => {
    cy.get("h2").contains("Black Adam");
    cy.get('p[class="movie-tagline"]').contains('"The world needed a hero. It got Black Adam."');
    cy.get("section[class='poster-details-section']").find("img").should("be.visible");
    cy.get("section[class='poster-details-section']").find("img").should("have.attr", "src").should(
        "include",
        "https://image.tmdb.org/t/p/original//pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg"
      );
    cy.get('p[class="movie-overview"]').contains(
      "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods"
    );
  });

  it("Should display the movie's details", () => {
    cy.get("div[class='movie-details-divider']").contains("Movie Details")
    cy.get("p:nth-of-type(1)").contains("Funk rating: 4")
    cy.get("p:nth-of-type(2)").contains("125 minutes");
    cy.get("p:nth-of-type(3)").contains("Action, Fantasy, Science Fiction");
  });

  it("Should display the production details", () => {
    cy.get("div[class='production-details-divider']").contains("Production Details");
    cy.get("p:nth-of-type(1)").contains("Budget: $200,000,000");
    cy.get("p:nth-of-type(2)").contains("Revenue: $384,571,691");
    cy.get("p:nth-of-type(3)").contains("Release date: 10/19/2022");
  });

  it("Should display the movie's trailer", () => {
    cy.get("iframe")
      .should("be.visible")
      .should("have.attr", "src", "https://www.youtube.com/embed/mkomfZHG5q4");
  });

  it("Should have a 'Go Back' button to bring the user back to the all movies view", () => {
    cy.get("button").click();
    cy.get('div[id="436270"]').find("img").should("be.visible");
    cy.get('div[id="436270"] > h2:nth-of-type(1)').should(
      "contain",
      "Black Adam"
    ); 
  });
});
