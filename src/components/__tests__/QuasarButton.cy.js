import QuasarButton from '../QuasarButton.vue'

describe('QuasarButton', () => {
  it('renders a message', () => {
    const label = 'Hello there'
    cy.mount(QuasarButton, {
      props: {
        label
      }
    })

    cy.dataCy('button')
    cy.should('contain', label)
  })

  it('renders another message', () => {
    const label = 'test emit'
    cy.mount(QuasarButton, {
      props: { label }
    })

    cy.dataCy('button')
    cy.should('contain', label)
  })

  it('should have a `positive` color', () => {
    cy.mount(QuasarButton)

    cy.dataCy('button')
    cy.should('have.backgroundColor', 'var(--q-positive)')
    cy.should('have.color', 'white')
  })

  it('should emit `test` upon click', () => {
    cy.mount(QuasarButton)

    cy.dataCy('button').click()
    cy.should(() => {
      expect(Cypress.vueWrapper.emitted('test')).to.have.length(1)
    })
  })
})
