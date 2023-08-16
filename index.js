import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import Greetings from './Greetings_factory_function.js';


const app = express();
const greetingInstance = Greetings();

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

app.get("/", function (req, res) {
    res.render('index', {
        greeted: greetingInstance.getGreetingMsg(),
       count: greetingInstance.counter()
    });
});


app.post("/Greetings", (req, res) => {

    const username = req.body.nameInput;
    const selectedLanguage = req.body.Language;

    const greetingMessage = greetingInstance.setGreeting(username, selectedLanguage);
   
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


