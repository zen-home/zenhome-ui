import LayoutContainer from 'app/test/cypress/wrappers/LayoutContainer.vue'
import IndexPage from '../IndexPage.vue'

describe('Index Page', () => {
  it('should display QuasarButton and handle click event', () => {
    cy.mount(LayoutContainer, {
      props: { component: IndexPage }
    })

    // Check if QuasarButton exists
    cy.get('[data-cy=button]').should('exist')

    // Spy on console.log to check if event is emitted
    cy.window().then(win => {
      cy.spy(win.console, 'log').as('consoleLog')
    })

    // Click the button and check for console log
    cy.get('[data-cy=button]').click()
    cy.get('@consoleLog').should('be.calledWith', 'Test event emitted!')
  })

  it('should fetch and display users', () => {
    // Mock the API response
    const mockUsers = { data: { users: [{ name: 'John', id: 1 }] } }
    cy.intercept('POST', '/graphql', mockUsers).as('fetchUsers')

    // Mount the component to trigger the API call
    cy.mount(LayoutContainer, {
      props: { component: IndexPage }
    })

    // Wait for the API call and check the displayed data
    cy.wait('@fetchUsers')
    cy.get('pre code').should('contain', 'John')
  })
})
