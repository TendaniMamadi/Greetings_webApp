export default function Greetings(db) {


    async function setGreeting(username) {
        if (!username) {
            return;
        }

        // Validate username with regex
        const regex = /^[A-Za-z]+$/;
        if (!regex.test(username)) {
            return; // Return an error or handle it as needed
        }

        username = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();

        // Check if the name exists in the database
        const existingName = await db.oneOrNone(
            "SELECT names FROM greetedNames WHERE names = $1",
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

       
    }


    async function greetedNames() {
        const greetedNames = await db.any("SELECT names FROM greetedNames");
        return greetedNames.map(entry => entry.names);
    }


    async function counter() {
        const countQuery = await db.one("SELECT COUNT(*) AS count FROM greetedNames");
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



    async function clearButton() {
        await db.none("DELETE FROM greetedNames")

    }

    // function getClearMsg() {
    //     return clearMsg;
    // }




    return {
      
        setGreeting,
        //getGreetingMsg,
        greetedNames,
        counter,
        getGreetCount,
        clearButton,
        // getClearMsg
    };
}