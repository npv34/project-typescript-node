import express from "express";
import path from "path";
import multer from "multer";
import adminRouter from "./routers/admin.router";
import {ConnectDB} from "./models/ConnectDB";
import bodyParser from "body-parser";
import session from "express-session";
import authRouter from "./routers/auth.router";
import livereload from "connect-livereload";
import passport from "passport";

const db = new ConnectDB();
db.connect().then(r => {
    // tslint:disable-next-line:no-console
    console.log( `connect database successfully` );
}).catch(err => {
    // tslint:disable-next-line:no-console
    console.log( `connect database error` );
})

const upload = multer({ dest: __dirname + '/public/uploads/' })

const app = express();
const port = 8080; // default port to listen

app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );
app.use(express.static( path.join( __dirname, "public")))

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(livereload());
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
// viet middleware chinh sua res
app.use((req: any, res: any, next: any)=> {
    if (req.isAuthenticated()) {
        res.locals.userLogin = req.user
        next();
    } else {
        res.redirect('/auth/login')
    }
})
app.use('/admin', adminRouter);

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
