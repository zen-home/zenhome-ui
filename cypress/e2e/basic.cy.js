describe('Basic Test', () => {
  it('should visit the homepage', () => {
    cy.visit('/')
    cy.get('body').should('exist')
  })
}) 