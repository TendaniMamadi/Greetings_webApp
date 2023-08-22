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

        username = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();

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

        let errorMsg = ""

        if (!inputType && !radioBtn) {

            errorMsg = "Please enter your name & select language!";

        } else if (!radioBtn) {
            errorMsg = "Please select language!";

        } else if (!inputType) {

            errorMsg = "Please enter your name!"
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


    return {
        greet,
        setName,
        getName,
        setSelectedLanguage,
        getSelectedLanguage,
        getGreetingMsg,
        errorMessage
    }

}