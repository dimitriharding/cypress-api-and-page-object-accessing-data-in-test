![api in cypress runner](https://raw.githubusercontent.com/dimitriharding/cypress-api-and-page-object-accessing-data-in-test/main/media/api-with-page-objects.png)

I currently browse the TAU slack and if I have time I will answer a few questions. 

There was this one where someone was stuck on using Cypress with Page Objects to essentially make an API call, get a user object and do some assertion in the test. 

![issue in slack](https://raw.githubusercontent.com/dimitriharding/cypress-api-and-page-object-accessing-data-in-test/main/media/issue-tau-slack.png)

On closer look I realized that they were trying to add the response to a property and then call that property from their test to access the data. 

This didn't work mainly because of the nature of Async calls and how they are used in Cypress. 

So I put together this example that shows how it could be done in 3 ways:

1. Just returning the async call from a method on your page object and in your test use the `.then` method to access the data (cypress will resolve the promise accordingly)

> In the example notice we are using return for the cy.api and also for the response data

```ts
//method in page object
getSingleUser() {
        return cy.api({
            method: 'GET',
            url: this.baseUrl + '/users/2',
        }).then((response) => {
            return response.body.data
        })
    }

// test
it('Verify user object with return promise method', () => {
    user.getSingleUser().then((user) => {
      expect(user).to.have.property('id', 2)
    })
  })
```

2. Using cypress Aliases this one is neat

```ts
// method in page object
 getSingleUserWithAlias() {
        cy.api({
            method: 'GET',
            url: this.baseUrl + '/users/2',
        }).as('user')
    }

// test
it('Verify user object with alias method', () => {
    user.getSingleUserWithAlias()
    cy.get('@user').then((response) => {
      expect(response.body.data).to.have.property('id', 2)
    })
  })
```

3. Using callbacks, I wouldn't recommend this one but it works

```ts
// method in page object 
 getSingleUserCallback(cb) {
        cy.api({
            method: 'GET',
            url: this.baseUrl + '/users/2',
        }).then((response) => {
            cb(response)
        })
    }

// test
it('Verify user object with callback method', () => {
    user.getSingleUserCallback((response) => {
      expect(response.body.data).to.have.property('id', 2)
    })
  })
```

