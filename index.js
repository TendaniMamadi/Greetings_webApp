import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import Greetings from './Greetings_factory_function.js';
import importing_frontEnd from './importing_frontEnd.js';
import pgPromise from 'pg-promise';


const DATABASE_URL = process.env.DATABASE_URL || 'postgres://thegreetingtable_user:UM0BU5h6AUxD7d7Y1X7aoI3PfyMgLcm5@dpg-cjd021fdb61s73ahmqdg-a.oregon-postgres.render.com/thegreetingtable?ssl=true'

const config = { 
	connectionString : DATABASE_URL
}

if (process.env.NODE_ENV == 'production') {
	config.ssl = { 
		rejectUnauthorized : false
	}
}
const pgp = pgPromise()
const db = pgp(config);
const app = express();
const greetingInstance = Greetings(db);
const frontendInstance = importing_frontEnd(greetingInstance)

app.engine('handlebars', engine({
    layoutsDir: './views/layouts'
}))

app.use(session({
    secret: "Greeting app",
    resave: false,
    saveUninitialized: true
}));

app.use(flash())
app.set('view engine', 'handlebars');
app.set('views', './views');




app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())




// Start the server
const PORT = process.env.PORT || 3012;

app.listen(PORT, function (req, res) {
    console.log('App starting at port:', PORT);
});

// Routes

app.get("/", async function (req, res) {


    res.render('index', {
        greeted: frontendInstance.getGreetingMsg(),
        count: await greetingInstance.counter(),
        messages: req.flash()


    });
});

app.get("/clear", async function (req, res) {

    greetingInstance.clearButton();
    res.redirect('/')
});

app.post("/Greetings", async (req, res) => {


    const username = req.body.nameInput;
    const selectedLanguage = req.body.Language;

    if(username!=="" && selectedLanguage){

       await frontendInstance.greet(username,selectedLanguage)
       
    }else{

        req.flash('info', frontendInstance.errorMessage(selectedLanguage, username))
    }

    //const greetingMessage = await greetingInstance.setGreeting(username, selectedLanguage);

    res.redirect('/')
});



app.get('/greeted', async (req, res) => {

    const users = await greetingInstance.greetedNames()


    res.render('greeted', { user: users });
});




app.get("/counter/:name", async (req, res) => {
    const username = req.params.name;
    const greetCount = await greetingInstance.getGreetCount(username); // Fetch the greet count from the database

    const templateData = {
        user: username,
        greeted: greetCount
    };

    res.render("counter", templateData);
});



