import QuasarCheckComponents from '../QuasarCheckComponents.vue'

const testComponent = (description, selector) => {
  describe(description, () => {
    it('can be used with normal Cypress commands', () => {
      cy.mount(QuasarCheckComponents)

      cy.dataCy(selector).check()
      cy.dataCy(selector).should('be.checked')

      cy.dataCy(selector).uncheck()
      cy.dataCy(selector).should('not.be.checked')
    })
  })
}

testComponent('QuasarCheckbox', 'checkbox')
testComponent('QuasarToggle', 'toggle')

describe('QuasarToggle', () => {
  it('can be used with normal Cypress commands', () => {
    cy.mount(QuasarCheckComponents)

    cy.dataCy('radio-1').check()
    cy.dataCy('radio-1').should('be.checked')

    cy.dataCy('radio-2').check()
    cy.dataCy('radio-2').should('be.checked')
    cy.dataCy('radio-1').should('not.be.checked')
  })
})
