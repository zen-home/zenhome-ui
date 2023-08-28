import ErrorNotFound from '../ErrorNotFound.vue'

describe('ErrorNotFound Page', () => {
  it('should display 404 and a Go Home button', () => {
    cy.mount(ErrorNotFound)

    // Check if 404 is displayed
    cy.get('[data-cy=code]').should('contain', '404')

    // Check if "Oops. Nothing here..." text is displayed
    cy.get('.text-h2').should('contain', 'Nothing here...')

    // Check if Go Home button exists and has correct attributes
    cy.get('.q-btn')
      .should('exist')
      .should('contain', 'Go Home')
  })
})
