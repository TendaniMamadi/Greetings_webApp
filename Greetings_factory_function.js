export default function Greetings(list) {
    let namesGreeted = [];
    let clearMsg = "";
    let greetingMsg = "";
    let selectedLanguage = "";
    


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

    function setGreeting(username, selectedLanguage) {

        if (username) {

            if (selectedLanguage === "Eng") {
                greetingMsg = "Hello!" + " " + username;
                namesGreeted.push({names: username, number: 1})
            }


            else if (selectedLanguage === "Esp") {
                greetingMsg = "Ola!" + " " + username;
                namesGreeted.push({names: username, number: 1})
            }

            else if (selectedLanguage === "Ven") {
                greetingMsg = "Ndaa!" + " " + username;
                namesGreeted.push({names: username, number: 1})
            }
        }

    }


    function getGreetingMsg() {
        return greetingMsg
    }


    function greetedNames() {

       return namesGreeted
    }




    function counter() {
        return namesGreeted.length;
    }

   

   



    // function errorMessage(radioBtn, inputType) {

    //     if (!inputType && !radioBtn) {

    //         errorMsg = "Please enter your name & select language!";

    //     }


    //     if (!radioBtn) {
    //         errorMsg = "Please select language!";

    //     }

    //     else if (!inputType) {

    //         if (radioBtn === "Eng") {
    //             errorMsg = "Please enter your name!"

    //         } else if (radioBtn === "Esp") {
    //             errorMsg = "Introduzca su nombre!"

    //         } else if
    //             (radioBtn === "Ven") {
    //             errorMsg = "Dzhenisani dzina!"

    //         }

    //     }


    // }

    // function clearButton() {
    //     namesGreeted.length = 0;
    //     clearMsg = "Successfully cleared!";
    // }

    // function getClearMsg() {
    //     return clearMsg;
    // }




    return {
        setName,
        getName,
        setSelectedLanguage,
        getSelectedLanguage,
        setGreeting,
        getGreetingMsg,
        greetedNames,
        counter,
        // errorMessage,
        // clearButton,
        // getClearMsg
    };
}