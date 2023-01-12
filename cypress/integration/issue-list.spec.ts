import mockIssues1 from "../fixtures/issues-page-1.json";
import mockIssues2 from "../fixtures/issues-page-2.json";
import mockIssues3 from "../fixtures/issues-page-3.json";
import mockIssuesByResolvedStatus from "../fixtures/issues-resolved.json";
import mockIssuesByErrorLevel from "../fixtures/issues-error.json";
import mockIssuesByBackendProject from "../fixtures/issues-backend.json";
import mockIssuesByBackendProjectAndWarningLevel from "../fixtures/issues-backend-and-warning.json";

describe("Issue List", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
    // setup request mocks
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=1", {
      fixture: "issues-page-1.json",
    }).as("getIssues");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=2", {
      fixture: "issues-page-2.json",
    });
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=3", {
      fixture: "issues-page-3.json",
    });

    // open issues page
    cy.visit(`http://localhost:3000/dashboard/issues`);

    // wait for request to resolve
    cy.wait("@getProjects");
    cy.wait("@getIssues");
    cy.wait(2000);

    // set button aliases
    cy.get("button").contains("Previous").as("prev-button");
    cy.get("button").contains("Next").as("next-button");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1440, 900);
    });

    it("renders the issues", () => {
      cy.get("main")
        .find("tbody")
        .find("tr")
        .each(($el, index) => {
          const issue = mockIssues1.items[index];
          const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();

          cy.wrap($el).contains(issue.name);
          cy.wrap($el).contains(issue.message);
          cy.wrap($el).contains(issue.numEvents);
          cy.wrap($el).contains(firstLineOfStackTrace);
        });
    });

    it("paginates the data", () => {
      // test first page
      cy.contains("Page 1 of 3");
      cy.get("@prev-button").should("have.attr", "disabled");

      // test navigation to second page
      cy.get("@next-button").click();
      cy.get("@prev-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);

      // test navigation to third and last page
      cy.get("@next-button").click();
      cy.get("@next-button").should("have.attr", "disabled");
      cy.contains("Page 3 of 3");
      cy.get("tbody tr:first").contains(mockIssues3.items[0].message);

      // test navigation back to second page
      cy.get("@prev-button").click();
      cy.get("@next-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);
    });

    it("number of events and users should not be the same", () => {
      cy.get("main")
        .find("tbody")
        .find("tr")
        .each(($el, index) => {
          const issue = mockIssues1.items[index];
          cy.wrap($el).then(() => {
            if (index < 4) {
              expect(issue.numUsers).to.not.equal(issue.numEvents);
            }
          });
        });
    });

    it("renders issues with resolved status only", () => {
      cy.dataCy("filter-by-status").click();
      cy.wait(2000);
      cy.contains("Resolved").click();
      cy.wait(3000);
      cy.validateIssues(mockIssuesByResolvedStatus);
    });

    it("renders issues with error level only", () => {
      cy.dataCy("filter-by-level").click();
      cy.wait(2000);
      cy.contains("Error").click();
      cy.wait(3000);
      cy.validateIssues(mockIssuesByErrorLevel);
    });

    it("renders issues with backend project level only", () => {
      cy.dataCy("filter-by-project")
        .within(() =>
          cy.get("input").should("have.attr", "placeholder", "Project Name")
        )
        .as("filter-input");

      cy.get("@filter-input").first().type("back");
      cy.wait(1000);
      cy.validateIssues(mockIssuesByBackendProject);
    });

    it("renders issues with backend project level AND warning level only, clear input for project name and change the status level", () => {
      // get the filter by 'partial' project name's input
      cy.dataCy("filter-by-project").within(() => {
        cy.get("input")
          .should("have.attr", "placeholder", "Project Name")
          .as("filter-input");
      });

      // type 'back', which is partial for "backend"
      cy.get("@filter-input").type("back");
      cy.wait(2000);
      cy.dataCy("filter-by-level").click();

      // set level to warning
      cy.contains("Warning").click();
      cy.wait(2000);

      // check that issues are filtered by both backend project and their level set to warning
      cy.validateIssues(mockIssuesByBackendProjectAndWarningLevel);

      // clear input field, projects should now not be filtered by any project name
      cy.get("@filter-input").clear().type("fr");
      cy.wait(1000);

      // change level to Error, with project name input filed empty
      cy.dataCy("filter-by-level").click();
      cy.contains("Error").click();
      cy.wait(1000);

      // check that issues are only filtered by error level and not project name, because the input field has been cleared
      cy.validateIssues(mockIssuesByErrorLevel);
    });

    it.only("should update URL with the correct project filters/url parameters", () => {
      // Click select component
      cy.dataCy("filter-by-status").click();
      // Select Resolved
      cy.contains("Resolved").click();
      cy.url().should("include", "/dashboard/issues?status=resolved");
      cy.dataCy("filter-by-level").click();

      // Error query param is added to the URL
      cy.contains("Error").click();
      cy.url().should(
        "include",
        "/dashboard/issues?status=resolved&level=error"
      );

      cy.dataCy("filter-by-status").click();
      // Removes status filter
      cy.contains("--None--").click();
      cy.url().should("include", "/dashboard/issues?level=error");
      cy.dataCy("filter-by-level").click();
      cy.contains("Warning").click();
      cy.url().should("include", "/issues?level=warning");

      cy.dataCy("filter-by-project").within(() => {
        cy.get("input").type("Back");
      });
      cy.url().should("include", "/issues?level=warning&project=backend");

      // Adds page 2 to the url
      cy.get("@next-button").click();
      cy.url().should(
        "include",
        "/issues?page=2&level=warning&project=backend"
      );
    });
  });
});
