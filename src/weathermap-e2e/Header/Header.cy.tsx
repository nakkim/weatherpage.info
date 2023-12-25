
describe('Header', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: 'https://opendata.fmi.fi/timeseries**',
    }).as('timeseries')
  });

  it('should display current observations', () => {
    cy.visit('/');
    cy.wait('@timeseries')
    cy.get('[data-testid="get-current-observations-button"]').should('have.class', 'MuiButton-contained')
    cy.get('[data-testid="get-historical-observations-button"]').should('have.class', 'MuiButton-outlined')

    cy.get('[data-testid="get-historical-observations-button"]').click()
    // cy.wait('@timeseries')
    // cy.get('[data-testid="get-current-observations-button"]').should('have.class', 'MuiButton-outlined')
    // cy.get('[data-testid="get-historical-observations-button"]').should('have.class', 'MuiButton-contained')

  });

});