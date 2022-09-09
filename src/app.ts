import "reflect-metadata"
import express from "express";
import path from "path";
import AppDataSource from "./database/DataSource";
import {Categories} from "./entities/Categories";
const app = express();
const port = 8080; // default port to listen

app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

AppDataSource.initialize().then( async () => {
    const categoryRepo = AppDataSource.getRepository(Categories);

    const category = await categoryRepo.find(
        {
                relations: {
                    products: true,
                }});
    console.log(category[1].products)
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
