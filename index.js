import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import Greetings from './Greetings_factory_function.js';

const app = express();
const greeting = Greetings();

app.engine('handlebars', engine({
    layoutsDir: './views/layouts'
}))

app.set('view engine', 'handlebars');
app.set('views', './views');


app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())



app.get("/", function (req, res) {
    res.render('index', {
        greeting: greeting.greetings1(),
        count: greeting.counter()

    });
});



app.post('/', (req, res) => {
    const preparedName = req.body.nameInput; 
    const language = req.body.Language; 

    const greetingMessage = Greetings().greetings1(preparedName, language);

    
});



const PORT = process.env.PORT || 3011;

app.listen(PORT, function (req, res) {
    console.log('App starting at port:', PORT);
});