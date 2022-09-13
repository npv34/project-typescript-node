import "reflect-metadata"
import express from "express";
import path from "path";
import axios from "axios";
import apiRouter from "./routers/api.router"

import AppDataSource from "./database/DataSource";
import {Categories} from "./entities/Categories";
import verifyKey from "./middleware/VerifyKey";

const app = express();
const port = 8080; // default port to listen

app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

app.use('/api', apiRouter)

AppDataSource.initialize().then( async () => {
    const categoryRepo = AppDataSource.getRepository(Categories);

    const category = await categoryRepo.find(
        {
                relations: {
                    products: true,
                }});
    console.log(category[1].products)
})

const getCurrentWeather = async () => {
    return await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            appid: '02e3323f29bc461c2346db2fe3989729',
            q: 'hanoi'
        }
    });
}

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    // call api
    getCurrentWeather().then(response => {
        const currentWeather = Math.floor(response.data.main.temp - 273);

        let data = {
            currentWeather: currentWeather
        }
        res.render('index', {data})
    })
} );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
