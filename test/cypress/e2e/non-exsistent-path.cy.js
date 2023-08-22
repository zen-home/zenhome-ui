/// <reference types="cypress" />
// Use `cy.dataCy` custom command for more robust tests
// See https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements

describe('Routing', () => {
  it('should redirect to ErrorNotFound.vue for unknown paths', () => {
    // Navigate to an unknown path
    cy.visit('/non-existent-path')

    // Add an assertion to check the contents of the ErrorNotFound.vue page
    // Replace this with an appropriate assertion for your specific error page
    cy.get('[data-cy="code"]').should('contain', '404')
  })
})
