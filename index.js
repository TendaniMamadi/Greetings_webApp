import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import Greetings from './services/Greetings_factory_function.js';
import importing_frontEnd from './services/importing_frontEnd.js';
import pgPromise from 'pg-promise';
import Routes from './routes/routes.js';


const DATABASE_URL = process.env.DATABASE_URL || 'postgres://thegreetingtable_user:UM0BU5h6AUxD7d7Y1X7aoI3PfyMgLcm5@dpg-cjd021fdb61s73ahmqdg-a.oregon-postgres.render.com/thegreetingtable?ssl=true'
const config = {
    connectionString: DATABASE_URL
}

if (process.env.NODE_ENV == 'production') {
    config.ssl = {
        rejectUnauthorized: false
    }
}
const pgp = pgPromise()
const db = pgp(config);
const app = express();
const greetingInstance = Greetings(db);
const frontendInstance = importing_frontEnd(greetingInstance)
const routesInstance = Routes(greetingInstance,frontendInstance) 

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
    console.log('Create, Read, Update, and Delete (CRUD) server listening on:', PORT);
});


// Routes
app.get("/", routesInstance.showCounter);
app.get("/clear", routesInstance.clearStorage);
app.post("/Greetings", routesInstance.showGreetings);
app.get('/greeted', routesInstance.showGreetedNames);
app.get("/counter/:name", routesInstance.showGreetCount);



