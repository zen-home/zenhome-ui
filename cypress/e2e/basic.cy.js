describe('Basic Test', () => {
  it('should visit the homepage', () => {
    cy.visit('/')
    cy.get('body', { timeout: 1000 }).should('exist')
  })
}) 