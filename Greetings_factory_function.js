export default function Greetings(list) {
    let namesGreeted = list || [];
    let clearMsg = "";
    let greetingMsg = "";
    let selectedLanguage = "";
    let nameAndGreeting = "";
    let errorMsg = "";


    const regex = /^[A-Za-z]+$/;

    function prepareName(name) {
        return name
    }

    function greetings1(preparedName, selectedLanguage) {
        preparedName = prepareName(preparedName);

        // if (!regex.test(preparedName)) {
        //     return "No numbers & characters allowed!";
        // }


        if (greeted(preparedName)) {

            if (selectedLanguage === "Eng") {
                greetingMsg = "Hello!" + " " + preparedName
            }

            else if (selectedLanguage === "Esp") {
                greetingMsg = "Ola!" + " " + preparedName
            }

            else if (selectedLanguage === "Ven") {
                greetingMsg = "Ndaa!" + " " + preparedName
            }
        }

        return nameAndGreeting;
    }

    function setSelectedLanguage() {

        selectedLanguage = language
        return selectedLanguage
    }

    function displayGreetingMsg() {
        return greetingMsg
    }

    function greeted(preparedName) {
        //preparedName = prepareName(preparedName);

        if (!namesGreeted.includes(preparedName)) {
            namesGreeted.push(preparedName);
            return true;
        }
    }

    function getNamesThatAreGreeted() {
        return namesGreeted;
    }

   

    function counter() {
        return namesGreeted.length;
    }

    function errorMessage(radioBtn, inputType) {

        if (!inputType && !radioBtn) {

            errorMsg = "Please enter your name & select language!";

        }


        if (!radioBtn) {
            errorMsg =  "Please select language!";

        }

        else if (!inputType) {

            if (radioBtn === "Eng") {
                errorMsg =  "Please enter your name!"

            } else if (radioBtn === "Esp") {
                errorMsg =  "Introduzca su nombre!"

            } else if
                (radioBtn === "Ven") {
                    errorMsg = "Dzhenisani dzina!"

            }

        }


    }

    function clearButton() {
        namesGreeted.length = 0;
        clearMsg = "Successfully cleared!";
    }

    function getClearMsg() {
        return clearMsg;
    }

 
      

    return {
        greetings1,
        displayGreetingMsg,
        setSelectedLanguage,
        greeted,
        getNamesThatAreGreeted,
        counter,
        errorMessage,
        clearButton,
        getClearMsg        
    };
}
