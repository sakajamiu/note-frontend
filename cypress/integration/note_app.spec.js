describe('Note app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'jamiu',
            username: 'folu',
            password: 'pass1234'
        }
      cy.request('POST', 'http://localhost:3001/api/users/', user)   
      cy.visit('http://localhost:3000')
    })
    it('front page can be opened', function() {
        cy.contains('Notes')
    })
    it('login form can be opened', function() {
      cy.contains('log in').click()
    })
    it('user can log in', function() {
        cy.contains('log in').click()
        cy.get('#username').type('folu')
        cy.get('#password').type('pass1234')
        cy.get('#login-button').click()
    
        cy.contains('jamiu logged in')
    })
    describe('when logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'jamiu', password: 'pass1234' })
        })
        it('a new note can be created', function() {
            cy.contains('new note').click()
            cy.get('input').type('a note created by cypress')
            cy.contains('save').click()
            cy.contains('a note created by cypress')
        })
        describe('and several notes exist', function () {
            beforeEach(function () {
              cy.createNote({ content: 'first note', important: false })
              cy.createNote({ content: 'second note', important: false })
              cy.createNote({ content: 'third note', important: false })
            })
        
            it('one of those can be made important', function () {
              cy.contains('second note')
                .contains('make important')
                .click()
        
              cy.contains('second note')
                .contains('make not important')
            })
        })
    
        
    })
    it('login fails with wrong password', function() {
        cy.contains('log in').click()
        cy.get('#username').type('folu')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
    
        cy.contains('WrongCredentials')
      })
    
   
})