import LayoutContainer from 'app/test/cypress/wrappers/LayoutContainer.vue'
import QuasarDrawer from '../QuasarDrawer.vue'

describe('QuasarDrawer', () => {
  it('should show a drawer', () => {
    cy.mount(LayoutContainer, {
      props: {
        component: QuasarDrawer
      }
    })
    cy.dataCy('drawer')
    cy.should('exist')
    cy.dataCy('button')
    cy.should('not.be.visible')
    cy.get('.q-scrollarea .scroll')
      .scrollTo('bottom', { duration: 500 })
    cy.dataCy('button')
    cy.should('be.visible')
  })
})
