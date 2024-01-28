describe("Instruction Page Test", () => {
  const mydata = require("../fixtures/example.json");
  const question = require("../../src/database/Questions");
  beforeEach(() => {
    cy.visit("https://brain-burst-quiz.netlify.app/");
    cy.get('input[placeholder*="ENTER YOUR FIRST NAME"]').type(mydata.first);
    cy.get('input[placeholder*="ENTER YOUR LAST NAME"]').type(mydata.last);
    cy.get(".global-button").click();
  });

  it("IP_TS001_TC001", () => {
    cy.get(".music-btn-img").should("be.visible");
    cy.contains("h2", "INSTRUCTIONS").should("be.visible");

    for (let i = 0; i < mydata.instruction.length; i++) {
      cy.get(`.instructions-list > :nth-child(${i + 1})`)
        .should("be.visible")
        .and(
          "contain",
          `${mydata.instruction[i].id}. ${mydata.instruction[i].details}`
        );
    }
    cy.contains("button", "OK").should("be.visible").and("be.enabled");
  });

  it.only("IP_TS003_TC001", () => {
    cy.contains("button", "OK").should("be.visible").and("be.enabled").click();
    cy.contains(
      "#question-text",
      `${question.Questions[0].itemNumber}. ${question.Questions[0].question}`
    ).should("be.visible");
  });
});
