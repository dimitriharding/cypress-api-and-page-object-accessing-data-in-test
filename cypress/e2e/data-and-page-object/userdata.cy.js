/// <reference types="cypress" />

import user from '../../support/page-objects/user'

describe('Using different method to get data from a pageObject in Cypress', () => {

  it('Verify user object with return promise method', () => {
    user.getSingleUser().then((user) => {
      expect(user).to.have.property('id', 2)
    })
  })

  it('Verify user object with alias method', () => {
    user.getSingleUserWithAlias()
    cy.get('@user').then((response) => {
      expect(response.body.data).to.have.property('id', 2)
    })
  })

  it('Verify user object with callback method', () => {
    user.getSingleUserCallback((response) => {
      expect(response.body.data).to.have.property('id', 2)
    })
  })

})
