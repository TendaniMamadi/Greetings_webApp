import assert from 'assert'
import importing_frontEnd from '../importing_frontEnd.js';

describe("test my greet button function", function () {
    let greeting = importing_frontEnd();

    it("should return name of person and greeting in selected language", function () {
       
        assert.equal("", greeting.getGreetingMsg("Hello! Tendani"));
       
    });

    it("should return name of person and greeting in spanish", function () {
    
       
        assert.equal("", greeting.getGreetingMsg("Ola! Luiz"));
      
    });

    it("should return name of person and greeting in Tshivenda", function () {

      
        assert.equal("", greeting.getGreetingMsg("Ndaa! Mashudu"));
    });


});


describe("test inputType and Radio button error messages", function () {
    let greeting = importing_frontEnd();

    it("should return please enter your name and select language if name is not entered & language not checked", function () {

        assert.equal("Please enter your name & select language!", greeting.errorMessage());
    });

    it("should return please select language if radio button is not checked", function () {
       
        assert.equal("Please select language!", greeting.errorMessage("","tendani"));
    });

    it("should return please enter your name if name is not entered", function () {
        
       
        assert.equal("Please enter your name!", greeting.errorMessage("Eng",""));
    });
});

describe("Test my counter", function () {
    let greeting = importing_frontEnd();
   
    it("It should return number of people greeted", function () {

        greeting.counter("Tendani")
        greeting.counter("Luiz")
        greeting.counter("Mashudu")
        
        assert.equal(0, greeting.counter())
    })

    it("It should not increase number when greeting same user twice", function () {
        let greeting = importing_frontEnd();
        greeting.counter("Mashudu","Ven")
        greeting.counter("Mashudu","Ven")
        assert.equal(0, greeting.counter())
    })
})

describe("Test my clear button", function () {
    
    it("It should clear the contents on screen and local storage", function () {
        let greeting = importing_frontEnd();
        greeting.clearButton();
        assert.equal(0, greeting.getClearButton())
    })

    it("It should display the message once everything cleared", function () {
        let greeting = importing_frontEnd();
        greeting.setClearMsg();
        assert.equal("Successfully cleared!", greeting.getClearMsg())
    })
})

