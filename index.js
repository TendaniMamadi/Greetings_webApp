import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import Greetings from './Greetings_factory_function.js';
import greet from './lelly_factory.js';

const app = express();
const greeting = Greetings();

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



app.get("/", function (req, res) {
    res.render('index', {
        greeted: greeting.displayGreetingMsg(),
        count: greeting.counter()
    });
});


app.post("/Greetings", (req, res) => {

    const name = req.body.nameInput;
    const language = req.body.Language;

    const greetingMessage = greeting.greetings1(name, language);
    res.redirect('/')
});


app.get('/greeted', (req, res) => {

    const users = greeting.greeted()
    const usersCount = greeting.getNamesThatAreGreeted()

    res.render('greeted', { users });
});

app.get("/counter/:name", function (req, res) {
    const name = req.params.name;
    const usersCount = greeting.getNamesThatAreGreeted()
    const count = greeting.counter();
    res.render("counter", { name, usersCount, count });
});



const PORT = process.env.PORT || 3011;

app.listen(PORT, function (req, res) {
    console.log('App starting at port:', PORT);
});