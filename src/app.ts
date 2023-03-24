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
import cors from "cors"
const db = new ConnectDB();
db.connect().catch((err) => {
    // tslint:disable-next-line:no-console
    console.log(err.message)
})

const upload = multer({ dest: __dirname + '/public/uploads/' })

const app = express();
app.use(cors())

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

// xu ly tat ca request khong co router
app.use((req, res) => {
    res.status(404).send('Page Not Found')
})

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
