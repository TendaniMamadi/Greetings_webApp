export default function FrontEnd(dblogic) {
    
    var namesGreeted = [];
    let clearMsg = "";
    let greetingMsg = "";
    let selectedLanguage = "";


    async function greet(username, selectedLanguage) {
        if (!username) {
            return;
        }

        username = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();

        let greeting = "";

        if (selectedLanguage === "Eng") {
            greeting = "Hello!";
        } else if (selectedLanguage === "Esp") {
            greeting = "Ola!";
        } else if (selectedLanguage === "Ven") {
            greeting = "Ndaa!";
        }
        await dblogic.setGreeting(username, selectedLanguage)
        greetingMsg = `${greeting} ${username}`;
    }


    function errorMessage(radioBtn, inputType, rgTest) {

        let errorMsg = ""

        if (radioBtn && inputType && rgTest) {

            errorMsg = "Input should not contain numbers or special characters.";

        } else if (!inputType && !radioBtn) {

            errorMsg = "Please enter your name & select language!";

        } else if (!radioBtn) {

            errorMsg = "Please select language!";

        } else if (!inputType) {

            errorMsg = "Please enter your name!";
        }

        return errorMsg

    }


    

    function setName(username) {
        enteredName = username
    };


    function getName() {
        return enteredName
    };


    function setSelectedLanguage(language) {

        selectedLanguage = language

    }

    function getSelectedLanguage() {
        return selectedLanguage
    }

    function getGreetingMsg() {
        return greetingMsg
    }

    function counter() {

        return namesGreeted.length

    }

    function clearButton() {
        namesGreeted.length = 0
    }

    function getClearButton() {
        return namesGreeted.length
    }


    function setClearMsg() {
        clearMsg = "Successfully cleared!"
    }

    function getClearMsg() {
        return clearMsg
    }



    return {
        greet,
        setName,
        getName,
        setSelectedLanguage,
        getSelectedLanguage,
        getGreetingMsg,
        errorMessage,
        counter,
        clearButton,
        getClearButton,
        setClearMsg,
        getClearMsg

    }

}