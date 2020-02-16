/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />


describe('Login',() => {
    it('input login creds', function () {
        cy.visit('/');
        cy.login('test@davy.co.ke', 'password')
    })
});
