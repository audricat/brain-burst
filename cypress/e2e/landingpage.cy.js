describe("landing Page Test", () => {
  const mydata = require("../fixtures/example.json");
  beforeEach(() => {
    cy.visit("https://brain-burst-quiz.netlify.app/");
  });

  it("LP_TS001_TC001", () => {
    cy.contains("h1", "WELCOME TO").should("be.visible");
    cy.get(".music-btn-img").should("be.visible");
    cy.get("#banner-image").should("be.visible");
    cy.contains("span", "FIRST NAME").should("be.visible");
    cy.get('input[placeholder*="ENTER YOUR FIRST NAME"]').should("be.visible");
    cy.contains("span", "LAST NAME").should("be.visible");
    cy.get('input[placeholder*="ENTER YOUR LAST NAME"]').should("be.visible");
    cy.contains("span", "THIS INPUT FIELD IS REQUIRED").should("not.visible");
    cy.contains("button", "START QUIZ").should("be.visible");
    cy.contains("button", "START QUIZ").should("be.disabled");
  });

  it("LP_TS003_TC001", () => {
    cy.get('input[placeholder*="ENTER YOUR FIRST NAME"]').type(mydata.first);
    cy.get('input[placeholder*="ENTER YOUR LAST NAME"]').type(mydata.last);
    cy.get('input[placeholder*="ENTER YOUR FIRST NAME"]').clear();
    cy.get('input[placeholder*="ENTER YOUR LAST NAME"]').clear();
    cy.get(".input-error-message").should("be.visible");
    cy.get(".global-button").should("be.disabled");
  });

  it("LP_TS003_TC002", () => {
    cy.get('input[placeholder*="ENTER YOUR FIRST NAME"]').type(mydata.first);
    cy.get('input[placeholder*="ENTER YOUR LAST NAME"]').type(mydata.last);
    cy.get('input[placeholder*="ENTER YOUR FIRST NAME"]').clear();
    cy.get(".input-error-message").should("be.visible");
    cy.get(".global-button").should("be.disabled");
  });

  it("LP_TS003_TC003", () => {
    cy.get('input[placeholder*="ENTER YOUR FIRST NAME"]').type(mydata.first);
    cy.get('input[placeholder*="ENTER YOUR LAST NAME"]').type(mydata.last);
    cy.get('input[placeholder*="ENTER YOUR LAST NAME"]').clear();
    cy.get(".input-error-message").should("be.visible");
    cy.get(".global-button").should("be.disabled");
  });

  it("LP_TS003_TC004", () => {
    cy.get('input[placeholder*="ENTER YOUR FIRST NAME"]').type(mydata.first);
    cy.get('input[placeholder*="ENTER YOUR LAST NAME"]').type(mydata.last);
    cy.get('input[placeholder*="ENTER YOUR FIRST NAME"]').clear();
    cy.get('input[placeholder*="ENTER YOUR LAST NAME"]').clear();
    cy.get(".input-error-message").should("be.visible");
    cy.get(".global-button").should("be.disabled");
    cy.get('input[placeholder*="ENTER YOUR FIRST NAME"]').type(mydata.first);
    cy.get('input[placeholder*="ENTER YOUR LAST NAME"]').type(mydata.last);
    cy.get(".global-button").should("be.enabled");
  });

  it.only("LP_TS004_TC001", () => {
    cy.get('input[placeholder*="ENTER YOUR FIRST NAME"]').type(mydata.first);
    cy.get('input[placeholder*="ENTER YOUR LAST NAME"]').type(mydata.last);
    cy.get(".global-button").should("be.enabled");
    cy.get(".global-button").click();
    cy.url().should("eq", "https://brain-burst-quiz.netlify.app/quiz");
  });
});
