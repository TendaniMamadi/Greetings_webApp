export default function Greetings(db) {
    let namesGreeted = [];
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



    async function setGreeting(username, selectedLanguage) {
        if (username) {
            let greeting = "";
            if (selectedLanguage === "Eng") {
                greeting = "Hello!";
            } else if (selectedLanguage === "Esp") {
                greeting = "Ola!";
            } else if (selectedLanguage === "Ven") {
                greeting = "Ndaa!";
            }

            // Check if the name exists in the database
            const existingName = await db.oneOrNone(
                "SELECT count FROM greetedNames WHERE names = $1",
                [username]
            );

            if (existingName) {
                // Update count for existing name
                await db.none(
                    "UPDATE greetedNames SET count = count + 1 WHERE names = $1",
                    [username]
                );
            } else {
                // Insert new name with count 1
                await db.none(
                    "INSERT INTO greetedNames (names, count) VALUES ($1, $2)",
                    [username, 1]
                );
            }

            greetingMsg = `${greeting} ${username}`;
        }
    }



    function getGreetingMsg() {
        return greetingMsg
    }



    async function greetedNames() {
        const greetedNames = await db.any("SELECT names FROM greetedNames");
        return greetedNames.map(entry => entry.names);
    }




    async function counter() {
        const countQuery = await db.one(
            "SELECT COUNT(*) AS count FROM greetedNames"
        );
        return countQuery.count;
    }


    async function getGreetCount(username) {
        try {
            const queryResult = await db.one(
                "SELECT count FROM greetedNames WHERE names = $1",
                [username]
            );

            return queryResult.count; // because 'count' is the column name in the database
        } catch (error) {
            console.error("Error fetching greet count:", error);
            return 0; // Return 0 if an error occurs
        }
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

    async function clearButton() {
        await db.none("DELETE FROM greetedNames")

    }

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
        getGreetCount,
        // errorMessage,
        clearButton,
        // getClearMsg
    };
}