'use strict';

describe('Employees table', () => {
  beforeEach('Open site', () => {
    cy.visit('https://artemlav.github.io/js_employees_table_DOM/');
  });

  it('should sort by name ASC', () => {
    cy.get('th').contains('Name').click();

    cy.get('tbody > :nth-child(1) > :nth-child(1)')
      .contains('Airi Satou').should('exist');
  });

  it('should sort by name DESC', () => {
    cy.get('th').contains('Name').dblclick();

    cy.get('tbody > :nth-child(1) > :nth-child(1)')
      .contains('Zorita Serrano').should('exist');
  });

  it('should sort by position ASC', () => {
    cy.get('th').contains('Position').click();

    cy.get('tbody > :nth-child(1) > :nth-child(2)')
      .contains('Accountant').should('exist');
  });

  it('should sort by position DESC', () => {
    cy.get('th').contains('Position').dblclick();

    cy.get('tbody > :nth-child(1) > :nth-child(2)')
      .contains('Technical Author').should('exist');
  });

  it('should sort by office ASC', () => {
    cy.get('th').contains('Office').click();

    cy.get('tbody > :nth-child(1) > :nth-child(3)')
      .contains('Edinburgh').should('exist');
  });

  it('should sort by office DESC', () => {
    cy.get('th').contains('Office').dblclick();

    cy.get('tbody > :nth-child(1) > :nth-child(3)')
      .contains('Tokyo').should('exist');
  });

  it('should sort by age ASC', () => {
    cy.get('th').contains('Age').click();

    cy.get('tbody > :nth-child(1) > :nth-child(4)')
      .contains(20).should('exist');
  });

  it('should sort by age DESC', () => {
    cy.get('th').contains('Age').dblclick();

    cy.get('tbody > :nth-child(1) > :nth-child(4)')
      .contains(66).should('exist');
  });

  it('should sort by salary ASC', () => {
    cy.get('th').contains('Salary').click();

    cy.get('tbody > :nth-child(1) > :nth-child(5)')
      .contains('$98,540').should('exist');
  });

  it('should sort by salary DESC', () => {
    cy.get('th').contains('Salary').dblclick();

    cy.get('tbody > :nth-child(1) > :nth-child(5)')
      .contains('$452,500').should('exist');
  });

  it('row should have class active after click', () => {
    cy.get('tbody > :nth-child(1) > :nth-child(1)').click();
    cy.get('tr').should('have.class', 'active');
  });

  it('should be able to edit name by double click', () => {
    cy.get('body').then(($body) => {
      cy.get('tbody > tr:nth-child(1) > td:nth-child(1)').dblclick()
        .then(() => {
          if ($body.find('[class="cell-input"]').length > 0) {
            cy.get('[class="cell-input"]').clear().type('Ihor Oliinyk{enter}');
            cy.contains('Ihor Oliinyk');
          } else {
            cy.get(' tbody > tr:nth-child(1) > td:nth-child(1)');
          }
        });
    });
  });

  it('should be able to edit position by double click', () => {
    cy.get('body').then(($body) => {
      cy.get('tbody > tr:nth-child(1) > td:nth-child(2)').dblclick()
        .then(() => {
          if ($body.find('[class="cell-input"]').length > 0) {
            cy.get('[class="cell-input"]').clear().type('COO{enter}');
            cy.contains('COO');
          } else {
            cy.get(' tbody > tr:nth-child(1) > td:nth-child(2)');
          }
        });
    });
  });

  it('should be able to edit office by double click', () => {
    cy.get('body').then(($body) => {
      cy.get('tbody > tr:nth-child(1) > td:nth-child(3)').dblclick()
        .then(() => {
          if ($body.find('[class="cell-input"]').length > 0) {
            cy.get('[class="cell-input"]').clear().type('Kyiv{enter}');
            cy.contains('Kyiv');
          } else {
            cy.get(' tbody > tr:nth-child(1) > td:nth-child(3)');
          }
        });
    });
  });

  it('should be able to edit age by double click', () => {
    cy.get('body').then(($body) => {
      cy.get('tbody > tr:nth-child(1) > td:nth-child(4)').dblclick()
        .then(() => {
          if ($body.find('[class="cell-input"]').length > 0) {
            cy.get('[class="cell-input"]').clear().type('29{enter}');
            cy.contains(29);
          } else {
            cy.get(' tbody > tr:nth-child(1) > td:nth-child(4)');
          }
        });
    });
  });

  it('should be able to edit salary by double click', () => {
    cy.get('body').then(($body) => {
      cy.get('tbody > tr:nth-child(1) > td:nth-child(5)').dblclick()
        .then(() => {
          if ($body.find('[class="cell-input"]').length > 0) {
            cy.get('[class="cell-input"]').clear().type('$120,000{enter}');
            cy.contains('$120,000');
          } else {
            cy.get(' tbody > tr:nth-child(1) > td:nth-child(5)');
          }
        });
    });
  });

  it('should be able to add a new employee', () => {
    cy.get('[name="name"]').type('Adam{enter}');
    cy.get('[name="position"]').type('QA Engineer{enter}');
    cy.get('select').select('San Francisco');
    cy.get('[name="age"]').type('18{enter}');
    cy.get('[name="salary"]').type('50000{enter}');
    cy.get('button').contains('Save to table').click();

    cy.get('.notification').contains('Success!').should('exist');

    cy.get('tbody').contains('Adam');
    cy.get('tbody').contains('QA Engineer');
    cy.get('tbody').contains('18');
    cy.get('tbody').contains('$50,000');
  });

  it('should have validation notification on name field', () => {
    cy.get('[name="name"]').then(($input) => {
      expect($input[0].validationMessage).to.exist;
    });
  });

  it('should have validation notification on position field', () => {
    cy.get('[name="name"]').type('Adam{enter}');

    cy.get('[name="position"]').then(($input) => {
      expect($input[0].validationMessage).to.exist;
    });
  });

  it('should have validation notification on age field', () => {
    cy.get('[name="name"]').type('Adam{enter}');
    cy.get('[name="position"]').type('QA Engineer{enter}');

    cy.get('[name="age"]').then(($input) => {
      expect($input[0].validationMessage).to.exist;
    });
  });

  it('should have validation notification on age field', () => {
    cy.get('[name="name"]').type('Adam{enter}');
    cy.get('[name="position"]').type('QA Engineer{enter}');

    cy.get('[name="age"]').then(($input) => {
      expect($input[0].validationMessage).to.exist;
    });
  });

  it('should have validation notification on salary field', () => {
    cy.get('[name="name"]').type('Adam{enter}');
    cy.get('[name="position"]').type('QA Engineer{enter}');
    cy.get('select').select('San Francisco');
    cy.get('[name="age"]').type('30{enter}');

    cy.get('[name="salary"]').then(($input) => {
      expect($input[0].validationMessage).to.exist;
    });
  });

  it('should have validation notification on age field if the age less than 18', () => {
    cy.get('[name="name"]').type('Adam{enter}');
    cy.get('[name="position"]').type('QA Engineer{enter}');
    cy.get('select').select('San Francisco');
    cy.get('[name="age"]').type('17{enter}');
    cy.get('[name="salary"]').type('300000{enter}');
    cy.get('button').contains('Save to table').click();

    cy.get('.notification').contains('Error').should('exist');
  });

  it('should have validation notification on age field if the age bigger than 90', () => {
    cy.get('[name="name"]').type('Adam{enter}');
    cy.get('[name="position"]').type('QA Engineer{enter}');
    cy.get('select').select('San Francisco');
    cy.get('[name="age"]').type('91{enter}');
    cy.get('[name="salary"]').type('300000{enter}');
    cy.get('button').contains('Save to table').click();

    cy.get('.notification').contains('Error').should('exist');
  });

  it('should have validation notification on age field if the salary less than $50000', () => {
    cy.get('[name="name"]').type('Adam{enter}');
    cy.get('[name="position"]').type('QA Engineer{enter}');
    cy.get('select').select('San Francisco');
    cy.get('[name="age"]').type('23{enter}');
    cy.get('[name="salary"]').type('49999{enter}');
    cy.get('button').contains('Save to table').click();

    cy.get('.notification').contains('Error').should('exist');
  });
});
