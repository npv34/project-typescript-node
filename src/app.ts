import "reflect-metadata"
import express from "express";
import path from "path";
import 'dotenv/config';
import bodyParser from "body-parser";
import AppDataSource from "./database/DataSource";
import apiRouter from "./routers/api.router";

const app = express();
const port: string|number = process.env.PORT_SERVER || 8000; // default port to listen

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

AppDataSource.initialize().then(async () => {
    app.use('/api', apiRouter);
})

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.render('index')
} );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
