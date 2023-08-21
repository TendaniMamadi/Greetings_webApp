export default function FrontEnd(dblogic) {

    let greetingMsg = "";
    let selectedLanguage = "";


    function greet(username, selectedLanguage) {
        if (!username) {
            return;
        }

        // Validate username with regex
        const regex = /^[A-Za-z]+$/;
        if (!regex.test(username)) {
            return; // Return an error or handle it as needed
        }

        username = username.toLowerCase();

        let greeting = "";

        if (selectedLanguage === "Eng") {
            greeting = "Hello!";
        } else if (selectedLanguage === "Esp") {
            greeting = "Ola!";
        } else if (selectedLanguage === "Ven") {
            greeting = "Ndaa!";
        }
        dblogic.setGreeting(username, selectedLanguage)
        greetingMsg = `${greeting} ${username}`;
    }

    function errorMessage(radioBtn, inputType) {

        if (!inputType && !radioBtn) {

            errorMsg = "Please enter your name & select language!";

        }


        if (!radioBtn) {
            errorMsg = "Please select language!";

        }

        else if (!inputType) {

            if (radioBtn === "Eng") {
                errorMsg = "Please enter your name!"

            } else if (radioBtn === "Esp") {
                errorMsg = "Introduzca su nombre!"

            } else if
                (radioBtn === "Ven") {
                errorMsg = "Dzhenisani dzina!"

            }

        }


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


    return {
        greet,
        setName,
        getName,
        setSelectedLanguage,
        getSelectedLanguage,
        getGreetingMsg,
        errorMessage,
    }

}