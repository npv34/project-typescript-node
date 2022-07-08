import express from "express";
import path from "path";
import multer from "multer";
import adminRouter from "./routers/admin.router";
import authRouter from "./routers/auth.router";
import apiRouter from "./routers/api.router";
import {ConnectDB} from "./models/ConnectDB";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import * as AuthCheck from "./middleware/auth.check";

const db = new ConnectDB();
db.connect().catch(err => {
    // tslint:disable-next-line:no-console
    console.log( `connect database error` );
})

const upload = multer({ dest: __dirname + '/public/uploads/' })

const app = express();
const port = 8081; // default port to listen

// set views
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

// session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(passport.initialize());
app.use(passport.authenticate('session'));

// router
app.use('/api', apiRouter)

app.use('/auth', authRouter)

app.use('/admin', AuthCheck.checkLogin,  adminRouter)

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
