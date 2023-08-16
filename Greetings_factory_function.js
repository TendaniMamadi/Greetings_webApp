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

//     async function setGreeting(username, selectedLanguage) {
// //Select name from the database
// //if the name exist update the count else if the name does not exist insert into the table 
// //SELECT names from greetedNames where names=$1', ['Ngomso'];

//         if (username) {

//             if (selectedLanguage === "Eng") {
//                 greetingMsg = "Hello!" + " " + username;
//                 await db.none(
//                     "INSERT INTO greetedNames (names, count) VALUES ($1, $2)",
//                     [username, 1]
//                 );
//             }


//             else if (selectedLanguage === "Esp") {
//                 greetingMsg = "Ola!" + " " + username;
//                 await db.none(
//                     "INSERT INTO greetedNames (names, count) VALUES ($1, $2)",
//                     [username, 1]
//                 );
//             }

//             else if (selectedLanguage === "Ven") {
//                 greetingMsg = "Ndaa!" + " " + username;
//                 await db.none(
//                     "INSERT INTO greetedNames (names, count) VALUES ($1, $2)",
//                     [username, 1]
//                 );
//             }
//         }

//     }


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


    // function greetedNames() {

    //    return namesGreeted
    // }

    async function greetedNames() {
        const greetedNames = await db.any("SELECT names FROM greetedNames");
        return greetedNames.map(entry => entry.names);
    }
    




    // async function counter() {
    //     //WRITE A SELECT STATEMENT THAT SELECT ITEMS FROM YOUR EXISTING TABLES AND GET THE LENGTH OF THE LIST
    //     let selectQuery = await db.any(
    //         "SELECT count FROM greetedNames");
    //     return selectQuery.length;
    // }


    async function counter() {
        const countQuery = await db.one(
            "SELECT COUNT(*) AS count FROM greetedNames"
        );
        return countQuery.count;
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
        // errorMessage,
         clearButton,
        // getClearMsg
    };
}