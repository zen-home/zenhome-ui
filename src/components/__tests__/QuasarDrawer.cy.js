import LayoutContainer from 'app/test/cypress/wrappers/LayoutContainer.vue'
import QuasarDrawer from '../QuasarDrawer.vue'

describe('QuasarDrawer', () => {
  it('should show a drawer', () => {
    cy.mount(LayoutContainer, {
      props: { component: QuasarDrawer }
    })
    cy.dataCy('drawer')
      .should('exist')
      .dataCy('button')
      .should('not.be.visible')
    cy.get('.q-scrollarea .scroll')
      .scrollTo('bottom', { duration: 500 })
    cy.get('.q-scrollarea .scroll')
      .dataCy('button')
      .should('be.visible')
  })

  it('should toggle the drawer', () => {
    cy.mount(LayoutContainer, {
      props: { component: QuasarDrawer }
    })
    cy.dataCy('drawer').should('exist')

    // Assuming there's a button or other element with a data-cy attribute that toggles the drawer
    cy.dataCy('toggle-drawer-button').click()
    cy.dataCy('drawer').should('not.be.visible')

    // Click again to toggle it back
    cy.dataCy('toggle-drawer-button').click()
    cy.dataCy('drawer').should('be.visible')
  })
})
