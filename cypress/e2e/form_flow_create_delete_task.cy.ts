/// <reference types="cypress" />

describe('FormNewTask E2E', () => {
  const uniqueTitle = `Test ${Date.now()}`;

  beforeEach(() => {
    cy.visit('/');
    cy.get('svg[aria-label="Add new task"]').click();
  });

  it('should fill and submit the new task form', () => {
    cy.get('span[aria-label="Task title"]').click();
    cy.get('input[aria-label="Task title input"]').type(uniqueTitle);

    cy.get('#estimate').click();
    cy.get('[data-cy="estimate-option-EIGHT"]').click();

    cy.get('#assignee').click();
    cy.get('[data-cy="assignee-option-Jhon-Doe"]').click();

    cy.get('#tag-label').click();
    cy.get('[data-cy="tag-option-IOS"]').click();
    cy.get('[data-cy="tag-option-ANDROID"]').click();
    cy.get('[data-cy="tag-option-NODE_JS"]').click();
    cy.get('[data-cy="tag-option-REACT"]').click();

    cy.get('[data-cy="due-date-trigger"]').click({ force: true });
    cy.get('[data-cy="calendar-picker"]').should('exist');
    cy.get('[data-cy="calendar-picker"]')
      .find('button')
      .contains(/^15$/)
      .click();

    cy.get('#submit-button').click();

    cy.get('form').should('not.exist');

    cy.contains(uniqueTitle)
      .should('exist')
      .parents('[data-cy^="task-card-"]')
      .within(() => {
        cy.get('[data-cy="task-options-button"]').click();
      });

    cy.get('[data-cy="delete-button"]').click();

    //validate that the same card must not exist
    cy.contains(uniqueTitle).should('not.exist');
  });

  it('should show validation errors if required fields are empty', () => {
    cy.get('#submit-button').click();
    cy.contains(/required/i).should('exist');
  });

  it('should close the form when cancel is clicked', () => {
    cy.get('#cancel-button').click();
    cy.get('form').should('not.exist');
  });
});
