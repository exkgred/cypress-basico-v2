/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  
    })
    it('Preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend, magna eget consequat convallis, nunc ante pulvinar augue, sollicitudin pellentesque mi urna sed nisl. Donec ultricies convallis diam quis pulvinar. Donec imperdiet sed turpis non pretium. Integer tellus ligula, venenatis id ex at, sollicitudin convallis velit. Nam posuere mollis lorem, nec vulputate orci pulvinar iaculis. Vivamus imperdiet elementum neque, sit amet tincidunt felis gravida et. In et laoreet ligula. Suspendisse bibendum ornare viverra. Phasellus vel mi nec dolor consequat blandit. Sed faucibus tempor ligula quis dignissim. Donec porta, augue ac vulputate mollis, ipsum felis porta dui, quis maximus odio lectus.'
        
        cy.clock()

        cy.get('#firstName').type('Joshua')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('jooaxe@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('be.not.visible')
        
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend, magna eget consequat convallis, nunc ante pulvinar augue, sollicitudin pellentesque mi urna sed nisl. Donec ultricies convallis diam quis pulvinar. Donec imperdiet sed turpis non pretium. Integer tellus ligula, venenatis id ex at, sollicitudin convallis velit. Nam posuere mollis lorem, nec vulputate orci pulvinar iaculis. Vivamus imperdiet elementum neque, sit amet tincidunt felis gravida et. In et laoreet ligula. Suspendisse bibendum ornare viverra. Phasellus vel mi nec dolor consequat blandit. Sed faucibus tempor ligula quis dignissim. Donec porta, augue ac vulputate mollis, ipsum felis porta dui, quis maximus odio lectus.'
        cy.clock()
        cy.get('#firstName').type('Joshua')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('9997')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('be.not.visible')
    })
    it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone')
        .type('ALO').should('have.value', '')

    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Nulla eleifend, magna eget consequat convallis, nunc ante pulvinar augue, sollicitudin pellentesque mi urna sed nisl. Donec ultricies convallis diam quis pulvinar. Donec imperdiet sed turpis non pretium. Integer tellus ligula, venenatis id ex at, sollicitudin convallis velit. Nam posuere mollis lorem, nec vulputate orci pulvinar iaculis. Vivamus imperdiet elementum neque, sit amet tincidunt felis gravida et. In et laoreet ligula. Suspendisse bibendum ornare viverra. Phasellus vel mi nec dolor consequat blandit. Sed faucibus tempor ligula quis dignissim. Donec porta, augue ac vulputate mollis, ipsum felis porta dui, quis maximus odio lectus.'
        cy.clock()
        cy.get('#firstName').type('Joshua')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('jooaxe@gmail.com')
        cy.get('#phone-checkbox').check()
        //cy.get('#phone').type('Alo')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        
        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('be.not.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
        .type('Joshua')
        .should('have.value','Joshua')
        .clear
        ().should('have.value', '')
        cy.get('#lastName').type('Silva')
        .should('have.value','Silva')
        .clear
        ().should('have.value', '')
        cy.get('#email').type('jooaxe@gmail.com')
        .should('have.value','jooaxe@gmail.com')
        .clear
        ().should('have.value', '')
        cy.get('#phone').type('41997277164')
        .should('have.value','41997277164')
        .clear
        ().should('have.value', '')
        cy.get('#open-text-area').type('Teste')
        .should('have.value','Teste')
        .clear
        ().should('have.value', '')


    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.clock()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('be.not.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('be.not.visible')

    })
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]').should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .last().uncheck()
        .should('not.be.checked')

    })
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })     

    })
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })    

    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })    
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')

    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()

        cy.contains('Talking About Testing').should('be.visible')
    })
    it('testa a página da política de privacidade de forma independente', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains( 'CAC TAT - Política de privacidade').should('be.visible',)

    })
    it('exibe mensagem por 3 segundos', function() {
        cy.clock() // congela o relógio do navegador
      
        cy.contains('button', 'Enviar').click()// (...) // ação que dispara algo que exibe uma mensagem por três segundos
      
        cy.get('.error').should('be.visible')// (...) // verificação de que a mensagem está visível
      
        cy.tick(3000) // avança o relógio três segundos (em milissegundos). Avanço este tempo para não perdê-lo esperando.
      
        cy.get('.error').should('be.not.visible')// (...) // verificação de que a mensagem não está mais visível
      })
    
  })
  