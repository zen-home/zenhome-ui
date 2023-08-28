import QuasarDate from '../QuasarDate.vue'

const targetDate = '2023/02/23'

describe('QuasarDate', () => {
  it('selects a date by date string', () => {
    cy.mount(QuasarDate)

    cy.dataCy('date-picker').selectDate(targetDate)
    cy.dataCy('date-value').should('have.text', targetDate)
  })

  it('selects a date by date object', () => {
    cy.mount(QuasarDate)

    cy.dataCy('date-picker').selectDate(new Date(targetDate))
    cy.dataCy('date-value').should('have.text', targetDate)
  })

  it('selects a date displayed into a popup proxy', () => {
    cy.mount(QuasarDate)

    cy.dataCy('open-date-picker-popup-button').click()
    cy.withinDialog(() => {
      cy.get('.q-date').selectDate(targetDate)
    })
    cy.dataCy('date-value').should('have.text', targetDate)

    // When dealing with a nested dialog, or a popup proxy within a dialog,
    // add a data-cy on the dialog/popup-proxy containing the QDate and use the `withinDialog` extended signature:
    // Example: cy.withinDialog({ dataCy: 'date-picker-popup', fn: () => { cy.get('.q-date').selectDate(targetDate); } })
  })

  it('should reflect selected date in the input field', () => {
    cy.mount(QuasarDate)

    cy.dataCy('date-picker').selectDate(targetDate)

    // Assuming you have a data-cy attribute or another selector for the input field
    cy.get('[data-cy="date-input-field"]').should('have.value', targetDate)
  })

  it('should update date when typing into the input field', () => {
    cy.mount(QuasarDate)

    const typedDate = '2023/04/15'
    cy.get('[data-cy="date-input-field"]').type(typedDate)
    cy.dataCy('date-value').should('have.text', typedDate)
  })
})
