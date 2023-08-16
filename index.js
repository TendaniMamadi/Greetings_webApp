import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import Greetings from './Greetings_factory_function.js';
import pgPromise from 'pg-promise';

const connectionString = process.env.DATABASE_URL || 'postgres://thegreetingtable_user:UM0BU5h6AUxD7d7Y1X7aoI3PfyMgLcm5@dpg-cjd021fdb61s73ahmqdg-a.oregon-postgres.render.com/thegreetingtable?ssl=true'

const pgp = pgPromise()
const db = pgp(connectionString);
const app = express();
const greetingInstance = Greetings(db);

app.engine('handlebars', engine({
    layoutsDir: './views/layouts'
}))

app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'handlebars');
app.set('views', './views');


app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(flash())



// Start the server
const PORT = process.env.PORT || 3011;

app.listen(PORT, function (req, res) {
    console.log('App starting at port:', PORT);
});

// Routes

app.get("/", async function (req, res) {
    res.render('index', {
        greeted: greetingInstance.getGreetingMsg(),
       count:await greetingInstance.counter()
    });
});

app.post("/clear", async function (req, res) {
    
   greetingInstance.clearButton();
   res.redirect('/')
});

app.post("/Greetings",async (req, res) => {

    const username = req.body.nameInput;
    const selectedLanguage = req.body.Language;

    const greetingMessage = await greetingInstance.setGreeting(username, selectedLanguage);
   
    res.redirect('/')
});
// console.log(greetingInstance.getNamesThatAreGreeted());


app.get('/greeted', (req, res) => {

    const users = greetingInstance.greetedNames()
    

    res.render('greeted', { user:users});
});



app.get("/counter/:name", function (req, res) {
    const greetCount = greetingInstance.greetedNames();
    res.render('counter', { counter: greetCount});
});


