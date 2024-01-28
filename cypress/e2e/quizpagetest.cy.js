describe("Quiz Page Page Test", () => {
  const mydata = require("../fixtures/example.json");
  const question = require("../../src/database/Questions");
  beforeEach(() => {
    cy.visit("https://brain-burst-quiz.netlify.app/");
    cy.get('input[placeholder*="ENTER YOUR FIRST NAME"]').type(mydata.first);
    cy.get('input[placeholder*="ENTER YOUR LAST NAME"]').type(mydata.last);
    cy.get(".global-button").click();
    cy.contains("button", "OK").click();
  });
  it("QP_TS001_TC001", () => {
    cy.get(".music-btn-img").should("be.visible");
    cy.contains(
      "#item-count-wrapper",
      `${"Question"}${question.Questions[0].itemNumber}/${
        question.Questions.length
      }`
    ).should("be.visible");
    cy.contains(
      ".question-text-wrapper",
      `${question.Questions[0].itemNumber}. ${question.Questions[0].question}`
    ).should("be.visible");
    cy.contains(".quiz-button", "PREVIOUS").should("be.disabled");
    cy.contains(".quiz-button", "NEXT").should("be.enabled");
    cy.get(".quiz-icon").should("exist");
    cy.contains(".medium-button", "Review").should("exist");
    cy.get(".flag-img").should("exist");
  });
  it("QP_TS003_TC001", () => {
    cy.get(":nth-child(1) > #span-unselected").click();
    cy.contains("button", "A.Java").should("have.id", "button-selected");
    cy.get(":nth-child(2) > #span-unselected").click();
    cy.contains("button", "B.Swift").should("have.id", "button-selected");
    cy.get(":nth-child(3) > #span-unselected").click();
    cy.contains("button", "C.Python").should("have.id", "button-selected");
    cy.get(":nth-child(4) > #span-unselected").click();
    cy.contains("button", "D.C++").should("have.id", "button-selected");
  });

  it("QP_TS004_TC001", () => {
    cy.get(".quiz-icon").click();
    cy.contains("h2", "INSTRUCTIONS").should("be.visible");
  });
  it("QP_TS005_TC001", () => {
    cy.contains(".medium-button", "Review").click();
    cy.get(".navigator-header").should("exist");
    cy.contains("span", "Question Navigator").should("exist");
    cy.contains("span", "Legend:").should("exist");
    cy.contains("span", "Answered").should("exist");
    cy.contains("span", "Skipped").should("exist");
    cy.get(".navigator-center").should("exist");
    for (let i = 1; i <= 50; i++) {
      cy.contains(".number-grid-button", `${i}`).should("exist");
    }
    cy.get(".navigator-footer").should("exist");
    cy.contains("button", "BACK").should("exist");
  });
  it("QP_TS005_TC002", () => {
    cy.contains(".medium-button", "Review").click();
    cy.contains("button", "BACK").click();
    cy.get(".question-navigator").should("not.exist");
  });
  it("QP_TS005_TC003", () => {
    for (let i = 1; i <= 50; i++) {
      cy.contains(".medium-button", "Review").click();
      cy.contains(".number-grid-button", `${i}`).click();

      cy.get("#question-text")
        .should("contain", `${i}.`)
        .and("contain", question.Questions[i - 1].question);
    }
  });
  it("QP_TS005_TC004", () => {
    cy.contains("button", "A.Java").click();
    cy.contains(".quiz-button", "NEXT").click();
    cy.contains(".quiz-button", "NEXT").click();
    cy.contains(".medium-button", "Review").click();
    cy.contains("#Answered", "1")
      .should("have.css", "background-color")
      .and("eq", "rgb(81, 255, 19)");
    cy.contains("#Skipped", "2")
      .should("have.css", "background-color")
      .and("eq", "rgb(255, 255, 0)");
  });
  it("QP_TS006_TC001, QP_TS006_TC002", () => {
    for (let i = 0; i < question.Questions.length; i++) {
      cy.get("#question-text")
        .should("contain", question.Questions[i].itemNumber)
        .and("contain", question.Questions[i].question);
      if (i === 49) {
        cy.get(".quiz-span").should("contain", "SUBMIT");
      } else {
        cy.contains(".quiz-span", "NEXT").click();
      }
    }
  });
  it("QP_TS006_TC003", () => {
    for (let i = 0; i < question.Questions.length - 1; i++) {
      cy.contains(".quiz-span", "NEXT").click();
    }
    for (let i = question.Questions.length - 1; i >= 0; i--) {
      cy.get("#question-text")
        .should("contain", question.Questions[i].itemNumber)
        .and("contain", question.Questions[i].question);
      cy.get(".quiz-span").contains("PREVIOUS").click();
    }
    cy.contains(".quiz-button", "PREVIOUS").should("be.disabled");
  });
  it("QP_TS007_TC001", () => {
    cy.get(".flag-button").click();
    cy.get(".swal2-container").should("exist");
    cy.get(".swal2-cancel").click();
    cy.get(".swal2-container").should("not.exist");
    cy.get(".flag-button").click();
    cy.get(".swal2-confirm").click();
    cy.get(".swal2-container").should("not.exist");
  });
  it.only("QP_TS008_TC001, QP_TS008_TC002, QP_TS008_TC003", () => {
    for (let i = 1; i < question.Questions.length; i++) {
      cy.get(".quiz-span").contains("NEXT").click();
    }
    // QP_TS008_TC001
    cy.get(".quiz-span").contains("SUBMIT").click();
    cy.get(".swal2-popup").should("be.visible");
    // QP_TS008_TC002
    cy.get(".swal2-cancel").click();
    cy.get(".swal2-popup").should("not.exist");
    // QP_TS008_TC003
    cy.get(".quiz-span").contains("SUBMIT").click();
    cy.get(".swal2-popup").should("be.visible");
    cy.get(".swal2-confirm").click();
    cy.url().should("eq", "https://brain-burst-quiz.netlify.app/score");
  });
});
