class User {
    baseUrl = 'https://reqres.in/api'

    getSingleUser() {
        return cy.api({
            method: 'GET',
            url: this.baseUrl + '/users/2',
        }).then((response) => {
            return response.body.data
        })
    }

    getSingleUserWithAlias() {
        cy.api({
            method: 'GET',
            url: this.baseUrl + '/users/2',
        }).as('user')
    }

    getSingleUserCallback(cb) {
        cy.api({
            method: 'GET',
            url: this.baseUrl + '/users/2',
        }).then((response) => {
            cb(response)
        })
    }
}

module.exports = new User()