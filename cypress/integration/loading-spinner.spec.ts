describe("Spinner", () => {
  context("desktop resolution", () => {
    it("renders the projects", () => {
      // open projects page
      cy.visit("http://localhost:3000/dashboard");

      // checks if loading spinner is visible before get request is resolved
      cy.get(".spinner").as("spinner").should("be.visible");

      // wait 6 seconds
      cy.wait(6000);

      // spinner should not be visable after 6 seconds
      cy.get("@spinner").should("not.exist");
    });
  });
});
