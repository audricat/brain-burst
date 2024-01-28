describe("Result Page Test", () => {
  const mydata = require("../fixtures/example.json");
  const question = require("../../src/database/Questions");
  beforeEach(() => {
    cy.visit("https://brain-burst-quiz.netlify.app/");
    cy.get('input[placeholder*="ENTER YOUR FIRST NAME"]').type(mydata.first);
    cy.get('input[placeholder*="ENTER YOUR LAST NAME"]').type(mydata.last);
    cy.get(".global-button").click();
    cy.contains("button", "OK").click();
  });

  it("RP_TS001_TC001", () => {
    cy.contains(".medium-button", "Review").click();
    cy.contains(".number-grid-button", `50`).click();
    cy.get(".quiz-span").contains("SUBMIT").click();
    cy.get(".swal2-confirm").click();
    cy.get(".score-card-wrapper").should("exist");
    cy.get(".music-btn").should("exist");
    cy.get("h1").should("contain", "RESULTS");
    cy.get("h2").should("contain", `${mydata.first} ${mydata.last[0]}. SCORE:`);
    cy.get("#total-points").should("exist");
    cy.contains("span", "Passing Points: 35").should("exist");
    cy.get("#score-remarks").should("exist");
    cy.contains("button", "SUMMARY").should("exist");
    cy.contains("button", "RETAKE").should("exist");
  });
  it("RP_TS003_TC001", () => {
    cy.contains(".medium-button", "Review").click();
    cy.contains(".number-grid-button", `50`).click();
    cy.get(".quiz-span").contains("SUBMIT").click();
    cy.get(".swal2-confirm").click();
    cy.contains("button", "RETAKE").click();
    cy.url().should("eq", "https://brain-burst-quiz.netlify.app/");
  });
  it("RP_TS004_TC001", () => {
    cy.contains(".medium-button", "Review").click();
    cy.contains(".number-grid-button", `50`).click();
    cy.get(".quiz-span").contains("SUBMIT").click();
    cy.get(".swal2-confirm").click();
    cy.contains("button", "SUMMARY").click();
    cy.get(".summary-card").should("exist");
  });
  it("RP_TS004_TC002", () => {
    cy.contains(".medium-button", "Review").click();
    cy.contains(".number-grid-button", `50`).click();
    cy.get(".quiz-span").contains("SUBMIT").click();
    cy.get(".swal2-confirm").click();
    cy.contains("button", "SUMMARY").click();
    cy.contains("button", "Show explanation").click();
    cy.get(".summary-explanation-wrapper").should("exist");
    cy.contains("button", "Hide explanation").click();
    cy.get(".summary-explanation-wrapper").should("not.exist");
  });
  it("RP_TS004_TC004", () => {
    cy.contains(".medium-button", "Review").click();
    cy.contains(".number-grid-button", `50`).click();
    cy.get(".quiz-span").contains("SUBMIT").click();
    cy.get(".swal2-confirm").click();
    cy.contains("button", "SUMMARY").click();
    cy.get(".close-button").click();
    cy.get(".summary-card").should("not.exist");
  });
  it("RP_TS005_TC001", () => {
    for (let i = 0; i < question.Questions.length; i++) {
      cy.get(`:nth-child(${mydata.Perfect[i]}) > #span-unselected`).click();
      if (i === 49) {
        cy.get(".quiz-span").contains("SUBMIT").click();
      } else {
        cy.get(".quiz-span").contains("NEXT").click();
      }
    }
    cy.get(".swal2-confirm").click();
    cy.get("#total-points").should("contain", "50");
    cy.get("#passed-remarks").should("contain", "Congratulation!");
    cy.get("#score-remarks > :nth-child(2)").should(
      "contain",
      "You've Passed the Quiz!"
    );
  });
  it("RP_TS005_TC002", () => {
    for (let i = 0; i < question.Questions.length; i++) {
      cy.get(`:nth-child(${mydata[35][i]}) > #span-unselected`).click();
      if (i === 49) {
        cy.get(".quiz-span").contains("SUBMIT").click();
      } else {
        cy.get(".quiz-span").contains("NEXT").click();
      }
    }
    cy.get(".swal2-confirm").click();
    cy.get("#total-points").should("contain", "35");
    cy.get("#passed-remarks").should("contain", "Congratulation!");
    cy.get("#score-remarks > :nth-child(2)").should(
      "contain",
      "You've Passed the Quiz!"
    );
  });
  it("RP_TS005_TC003", () => {
    for (let i = 0; i < question.Questions.length; i++) {
      cy.get(`:nth-child(${mydata[34][i]}) > #span-unselected`).click();
      if (i === 49) {
        cy.get(".quiz-span").contains("SUBMIT").click();
      } else {
        cy.get(".quiz-span").contains("NEXT").click();
      }
    }
    cy.get(".swal2-confirm").click();
    cy.get("#total-points").should("contain", "34");
    cy.get("#failed-remarks").should("contain", "You failed.");
    cy.get("#score-remarks > :nth-child(2)").should(
      "contain",
      "But good effort, keep it up."
    );
  });
  it("RP_TS005_TC004", () => {
    for (let i = 0; i < question.Questions.length; i++) {
      cy.get(`:nth-child(${mydata[5][i]}) > #span-unselected`).click();
      if (i === 49) {
        cy.get(".quiz-span").contains("SUBMIT").click();
      } else {
        cy.get(".quiz-span").contains("NEXT").click();
      }
    }
    cy.get(".swal2-confirm").click();
    cy.get("#total-points").should("contain", "5");
    cy.get("#failed-remarks").should("contain", "You failed.");
    cy.get("#score-remarks > :nth-child(2)").should(
      "contain",
      "You can retake the quiz and improve!"
    );
  });
  it.only("RP_TS005_TC005", () => {
    for (let i = 0; i < question.Questions.length; i++) {
      cy.get(`:nth-child(${mydata.Retake[i]}) > #span-unselected`).click();
      if (i === 49) {
        cy.get(".quiz-span").contains("SUBMIT").click();
      } else {
        cy.get(".quiz-span").contains("NEXT").click();
      }
    }
    cy.get(".swal2-confirm").click();
    cy.get("#total-points").should("contain", "0");
    cy.get("#failed-remarks").should("contain", "You failed.");
    cy.get("#score-remarks > :nth-child(2)").should(
      "contain",
      "You can retake the quiz and improve!"
    );
  });
});
