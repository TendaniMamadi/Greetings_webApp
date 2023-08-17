// import assert from 'assert';

// import Greetings from '../Greetings_factory_function.js';


// describe("test my greet button function", function () {
//     let greeting = Greetings();

//     it("should return name of person and greeting in english", function () {
       
//         assert.equal("", greeting.greetings1("Hello! Tendani","Eng"));
       
//     });

//     it("should return name of person and greeting in spanish", function () {
    
       
//         assert.equal("", greeting.greetings1("Ola! Luiz","Esp"));
      
//     });

//     it("should return name of person and greeting in Tshivenda", function () {

      
//         assert.equal("", greeting.greetings1("Ndaa! Mashudu","Ven"));
//     });


// });


// // describe("test inputType and Radio button error messages", function () {
// //     let greeting = Greetings();

// //     it("should return please enter your name and select language if name is not entered & language not checked", function () {

// //         assert.equal("Please enter your name & select language!", greeting.errorMessage());
// //     });

// //     it("should return please select language if radio button is not checked", function () {
       
// //         assert.equal("Please select language!", greeting.errorMessage("","tendani"));
// //     });

// //     it("should return please enter your name if name is not entered", function () {
        
       
// //         assert.equal("Please enter your name!", greeting.errorMessage("Eng",""));
// //     });
// // });

// describe("Test my counter", function () {

//     it("It should return number of people greeted", function () {

//         let greeting = Greetings()
//         greeting.greetings1("Tendani","Eng")
//         greeting.greetings1("Luiz","Esp")
//         greeting.greetings1("Mashudu","Ven")
        
//         assert.equal(3, greeting.counter())
//     })

//     it("It should not increase number when greeting same user twice", function () {
//         let greeting = Greetings()
//         greeting.greetings1("Mashudu","Ven")
//         greeting.greetings1("Mashudu","Ven")
//         assert.equal(1, greeting.counter())
//     })
// })

// describe("Test my clear button", function () {

//     it("It should clear the contents on screen and local storage", function () {
//         let greeting = Greetings()
//         greeting.clearButton();
//         assert.equal(0, greeting.getClearButton())
//     })

//     it("It should display the message once everything cleared", function () {
//         let greeting = Greetings()
//         greeting.setClearMsg();
//         assert.equal("Successfully cleared!", greeting.getClearMsg())
//     })
// })

// describe("Testing Regex validation functionality", function () {

//     it("It should return no numbers & characters allowed if name has number", function () {
//         let greeting = Greetings()

//         assert.equal("no numbers & characters allowed!", greeting.greetings1("2pac"))
//     })
// })