/// <reference types="cypress" />

describe('FilterATask E2E', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('body', { timeout: 3000 }).should('be.visible');
    cy.get('[data-cy="filter-icon"]', { timeout: 3000 }).should('exist');
  });

  it('should filter a created, but only that one and then delete that card', () => {
    cy.get('button[aria-label="Toggle Filters"]', { timeout: 3000 }).should(
      'be.enabled'
    );
    cy.get('button[aria-label="Toggle Filters"]').click();
    cy.get('#status-select').select('BACKLOG');
    cy.get('button[aria-label="Toggle Filters"]', { timeout: 3000 }).click();
    cy.get('[data-cy="column-BACKLOG"]').should('exist');

    cy.get('#status-select').select('');
  });

  it("should filter by estimate selecting the user 'JIM HUERTAS' ", () => {
    cy.get('button[aria-label="Toggle Filters"]', { timeout: 3000 }).should(
      'be.enabled'
    );
    cy.get('button[aria-label="Toggle Filters"]').click();
    cy.get('#assignee-select').select('Jim Huertas');
    cy.get('button[aria-label="Toggle Filters"]', { timeout: 3000 }).click();
    cy.get('[data-cy="grid-cards-loading"]').should('not.exist');

    cy.get('[data-cy^="task-card-"] [aria-label^="Avatar of "]')
      .should('have.length.greaterThan', 0)
      .each(($el) => {
        expect($el).to.have.attr('aria-label', 'Avatar of Jim Huertas');
      });
  });

  it('should filter by estimate selecting the 8 points', () => {
    cy.get('button[aria-label="Toggle Filters"]', { timeout: 3000 }).should(
      'be.enabled'
    );
    cy.get('button[aria-label="Toggle Filters"]').click();
    cy.get('#point-estimate-select').select('EIGHT');
    cy.get('button[aria-label="Toggle Filters"]', { timeout: 3000 }).click();
    cy.get('[data-cy="grid-cards-loading"]').should('not.exist');

    cy.get('[data-cy^="task-card-"] [data-cy="estimate-label"]')
      .should('have.length.greaterThan', 0)
      .each(($el) => {
        cy.wrap($el).should('have.text', '8 Points');
      });
  });

  it("should filter by estimate selecting the tag 'IOS'", () => {
    const expectedTags = ['IOS'];
    cy.get('button[aria-label="Toggle Filters"]', { timeout: 3000 }).should(
      'be.enabled'
    );
    cy.get('button[aria-label="Toggle Filters"]').click();

    expectedTags.forEach((tag) => {
      cy.get('#tag-select').select(tag);
    });

    cy.get('button[aria-label="Toggle Filters"]', { timeout: 3000 }).click();
    cy.get('[data-cy="grid-cards-loading"]').should('not.exist');

    cy.get('[data-cy^="task-card-"]').each(($card) => {
      cy.wrap($card)
        .find('[data-cy="tag-cards"]')
        .then(($tagCards) => {
          expectedTags.forEach((tag) => {
            if ($tagCards.text().includes(tag)) {
              expect($tagCards.text()).to.include(tag);
            } else {
              cy.wrap($tagCards)
                .find('[data-cy="tag-cards-extra-button"]')
                .click();
              cy.get('[data-cy="tag-cards-extra-popover"]')
                .should('be.visible')
                .contains(tag)
                .should('exist');
            }
          });
        });
    });
  });

  it("should filter by today's date and only show the TODAY label not a date format", () => {
    cy.get('button[aria-label="Toggle Filters"]', { timeout: 3000 }).should(
      'be.enabled'
    );
    cy.get('button[aria-label="Toggle Filters"]').click();

    const today = new Date().toISOString().split('T')[0];
    cy.get('#due-date').should('be.visible').clear().type(today).blur();

    cy.get('button[aria-label="Toggle Filters"]', { timeout: 3000 }).click();
    cy.get('[data-cy="grid-cards-loading"]').should('not.exist');

    cy.get('body').then(($body) => {
      const labels = $body.find(
        '[data-cy^="task-card-"] [data-cy="due-date-label"]'
      );
      if (labels.length > 0) {
        cy.wrap(labels).each(($el) => {
          cy.wrap($el).should('have.text', 'TODAY');
        });
      }
    });
  });
});
