import * as express from 'express';
import {urlencoded, json, static as staticFiles} from "express";
import {engine} from "express-handlebars";
import * as methodOverride from 'method-override';
import {homeRouter} from "./routers/home";
import {clientRouter} from "./routers/client";
import {handleError} from "./utils/handleError";
import {notFound} from "./utils/notFound";

const app = express();

//Middlewares
app.use(json());
app.use(urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));
app.use(staticFiles("public"));
app.engine(".hbs", engine({
    extname: ".hbs",
}));
app.set('view engine', ".hbs");
//Routers
app.use('/', homeRouter);
app.use('/client', clientRouter);
//error
app.use(notFound);
app.use(handleError);

app.listen(3001, '127.0.0.1',
    () => console.log("App is working on http://localhost:3001"));