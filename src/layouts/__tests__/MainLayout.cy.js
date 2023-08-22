import MainLayout from '../MainLayout.vue'

describe('MainLayout', () => {
  it('should toggle the drawer', () => {
    cy.mount(MainLayout)
    cy.dataCy('drawer').should('exist')

    // Assuming there's a button or other element with a data-cy attribute that toggles the drawer
    cy.dataCy('toggle-drawer-button').click()
    cy.dataCy('drawer').should('be.visible')

    // Click again to toggle it back
    cy.get('.fullscreen.q-drawer__backdrop').then(($el) => {
      cy.wrap($el).click({ force: true })
    })
    cy.dataCy('drawer').should('not.be.visible')
  })
})
