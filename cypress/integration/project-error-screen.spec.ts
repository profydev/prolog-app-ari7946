import capitalize from "lodash/capitalize";
import mockProjects from "../fixtures/projects.json";

describe("Project Error Screen", () => {
  it("should checkout that error message exists when there is an error", () => {
    const languageNames = ["React", "Node.js", "Python"];
    const statusText = ["critical", "warning", "stable"];

    cy.intercept("GET", "https://prolog-api.profy.dev/project", (req) =>
      req.destroy()
    ).as("getProjectsFailed");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    cy.wait(6000);
    cy.wait("@getProjectsFailed");

    cy.get("[data-cy='project-error-message']")
      .contains("There was a problem whle loading the project data")
      .should("exist");

    // waits 2 seconds to be able to see the component render
    cy.wait(2000);
    cy.get("[data-cy='project-error-refetch']").contains("Try again").click();

    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjectsSuccess");

    cy.wait("@getProjectsSuccess");

    // get all project cards
    cy.get("main")
      .find("li")
      .each(($el, index) => {
        // check that project data is rendered
        cy.wrap($el).contains(mockProjects[index].name);
        cy.wrap($el).contains(languageNames[index]);
        cy.wrap($el).contains(mockProjects[index].numIssues);
        cy.wrap($el).contains(mockProjects[index].numEvents24h);
        cy.wrap($el).contains(capitalize(statusText[index]));
        cy.wrap($el).find("a").should("have.attr", "href", "/dashboard/issues");
      });
  });
});
