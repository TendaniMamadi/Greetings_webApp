export default function routes(greetingInstance,frontendInstance) {

    async function showCounter(req, res, next) {

        res.render('index', {
            count: await greetingInstance.counter(),
        });
    }

    async function clearStorage(req, res, next) {

        greetingInstance.clearButton();
        res.redirect('/');
    }

    async function showGreetings(req, res) {

        const username = req.body.nameInput;
        const selectedLanguage = req.body.Language;

        // Validate username with regex
        const regex = /[^A-Za-z ]/g
        const regexTest = regex.test(username);


        if (username !== "" && selectedLanguage && !regexTest) {

            await frontendInstance.greet(username, selectedLanguage)

        }

        if (!username || !selectedLanguage || regexTest) {

            req.flash('info', frontendInstance.errorMessage(selectedLanguage, username, regexTest))
        }

        if (username && selectedLanguage) {
            req.flash('greet', frontendInstance.getGreetingMsg())

        }
        res.redirect('/')

    }

    async function showGreetedNames(req, res){

        const users = await greetingInstance.greetedNames()
        res.render('greeted', { user: users });
    }

    async function showGreetCount(req, res){

        const username = req.params.name;
        const greetCount = await greetingInstance.getGreetCount(username); // Fetch the greet count from the database
    
        const templateData = {
            user: username,
            greeted: greetCount
        };
    
        res.render("counter", templateData);
    }




    return {
        showCounter,
        clearStorage,
        showGreetings,
        showGreetedNames,
        showGreetCount
    }
}