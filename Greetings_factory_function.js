export default function Greetings(list) {
    var namesGreeted = list || [];
    let clearMsg = "";

    const regex = /^[A-Za-z]+$/;

    function prepareName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }

    function greetings1(preparedName, language) {
        preparedName = prepareName(preparedName);

        if (!regex.test(preparedName)) {
            return "No numbers & characters allowed!";
        }

        if (greeted(preparedName)) {
            switch (language) {
                case "Eng":
                    return "Hello! " + preparedName;
                case "Esp":
                    return "Hola! " + preparedName;
                case "Ven":
                    return "Ndaa! " + preparedName;
            }
        } else {
            return "Name already exists!";
        }
    }

    function greeted(preparedName) {
        preparedName = prepareName(preparedName);

        if (!namesGreeted.includes(preparedName)) {
            namesGreeted.push(preparedName);
            return true;
        }
    }

    function getArray() {
        return namesGreeted;
    }

    function counter() {
        return namesGreeted.length;
    }

    function errorMessage(radioBtn, inputType) {
        if (!inputType && !radioBtn) {
            return "Please enter your name & select language!";
        }

        if (!radioBtn) {
            return "Please select language!";
        } else if (!inputType) {
            switch (radioBtn) {
                case "Eng":
                    return "Please enter your name!";
                case "Esp":
                    return "Introduzca su nombre!";
                case "Ven":
                    return "Dzhenisani dzina!";
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
        greeted,
        getArray,
        counter,
        errorMessage,
        clearButton,
        getClearMsg
    };
}
