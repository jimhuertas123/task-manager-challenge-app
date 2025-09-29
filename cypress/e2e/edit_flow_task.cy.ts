/// <reference types="cypress" />

describe('Create, Edit and Delete Task E2E', () => {
  const uniqueTitle = `Test ${Date.now()}`;

  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy="grid-cards-loading"]').should('not.exist');
    cy.get('svg[aria-label="Add new task"]')
      .should('be.visible')
      .click({ force: true });
  });

  it('Create, edit and delete a task', () => {
    //create the custom task
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

    //edit the task created (changing date for TODAY's date and validate it)
    cy.contains(uniqueTitle)
      .should('exist')
      .parents('[data-cy^="task-card-"]')
      .within(() => {
        cy.get('[data-cy="task-options-button"]').click();
      });

    cy.get('[data-cy="edit-button"]').click();

    cy.get('[data-cy="due-date-trigger"]').click({ force: true });
    cy.get('[data-cy="calendar-picker"]').should('exist');
    cy.get('[data-cy="due-date-today-button"]').click();
    cy.get('#submit-button').click();

    cy.contains(uniqueTitle)
      .parents('[data-cy^="task-card-"]')
      .find('[data-cy="due-date-label"]')
      .should('have.text', 'TODAY');

    //delete the task created
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
});
