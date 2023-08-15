export default function Greetings(list) {
    let namesGreeted = {};
    let clearMsg = "";
    let greetingMsg = "";
    let selectedLanguage = "";
    let nameAndGreeting = "";
    let namesCounted = 0;



    // const regex = /^[A-Za-z]+$/;

    function prepareName(name) {
        return name
    }

    function greetings1(preparedName, selectedLanguage) {
        preparedName = prepareName(preparedName);

        //  if (!regex.test(preparedName)) {
        //     return "No numbers & characters allowed!";
        //  }


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

        //console.log(namesGreeted.includes(preparedName));
        //loop over list
        //have access to an object
        //check names that already there 
        //if there increment the count
        // if not push
        for (const user in namesGreeted) {
            if (namesGreeted.hasOwnProperty(namesGreeted, user)) {
                const element = namesGreeted[user];

            }
        }

        if (namesGreeted[preparedName] === undefined) {
            namesGreeted[preparedName] = 0;
            namesCounted++
        }

        namesGreeted[preparedName] += 1;


        // if (namesGreeted.includes(preparedName) === false) {
        //     namesGreeted.push({ names: preparedName, number: 1 });
        //     // return true;
        // }
        //  else {
        //      console.log("user already exist");
        //  }
    }

    //console.log(getNamesThatAreGreeted());

    function getNamesThatAreGreeted() {
        return namesGreeted;
    }

    function getGreetCount(name) {
        const preparedName = prepareName(name);

        for (const user of namesGreeted) {
            if (user.names === preparedName)
                return user.number;
        }

    }


    function counter() {
        return namesCounted;
    }

    function savedNames() {
        var newListOfNamesSaved = Object.keys(namesGreeted)
        // console.log(newList);
        return newListOfNamesSaved;
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
        getGreetCount,
        counter,
        savedNames,
        errorMessage,
        clearButton,
        getClearMsg
    };
}