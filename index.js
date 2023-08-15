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



// // Home Route
// app.get('/', (req, res) => {

//     res.render('/', {
//         greeted: greetingInstance.greetings1(),
//         count: greetingInstance.counter()
//     });

// });

// // Greetings Route
// app.post('/greetings', (req, res) => {
//     const name = req.body.name;
//     const language = req.body.language;

//     const message = greetingInstance.greetings1(name, language);

//     req.flash('success', message);
//     res.redirect('/');
// });

// // Greeted Route
// app.get('/greeted', (req, res) => {
//     const names = greetingInstance.getArray();
//     res.render('greeted', { names });
// });

// // Counter Route
// app.get('/counter', (req, res) => {
//     const count = greetingInstance.counter();
//     res.render('counter', { count });
// });

const PORT = process.env.PORT || 3011;

app.listen(PORT, function (req, res) {
    console.log('App starting at port:', PORT);
});

// Start the server
// 

app.get("/", function (req, res) {
    res.render('index', {
        greeted: greetingInstance.displayGreetingMsg(),
        count: greetingInstance.counter()
    });
});


app.post("/Greetings", (req, res) => {

    const name = req.body.nameInput;
    const language = req.body.Language;

    const greetingMessage = greetingInstance.greetings1(name, language);
    const namesGreeted = greetingInstance.getNamesThatAreGreeted();
    greetingInstance.greeted(name)
    res.redirect('/')
});
console.log(greetingInstance.getNamesThatAreGreeted());


app.get('/greeted', (req, res) => {

    const users = greetingInstance.greeted()
    const usersCount = greetingInstance.getNamesThatAreGreeted()

    res.render('greeted', { user: greetingInstance.getNamesThatAreGreeted() });
});



app.get("/counter/:name", function (req, res) {
    const name = req.params.name;
    const greetCount = greetingInstance.getGreetCount(name);
    console.log(greetingInstance.getGreetCount(name))
    res.render('counter', { counter: greetCount, name });
});


