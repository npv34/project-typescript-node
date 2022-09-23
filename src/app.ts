import express from "express";
import path from "path";
import multer from "multer";
import adminRouter from "./routers/admin.router";
import authRouter from "./routers/auth.router";
import {ConnectDB} from "./models/ConnectDB";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import * as AuthCheck from "./middleware/auth.check";

const db: ConnectDB = new ConnectDB();
db.connect().catch(err => {
    // tslint:disable-next-line:no-console
    console.log( `connect database error` );
})

const upload = multer({ dest: __dirname + '/public/uploads/' })

const app = express();
const port = process.env.PORT || 3000;
// default port to listen

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

// lay thong tin dang nhap user
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})
// router
app.use('/auth', authRouter)

app.use('/admin', AuthCheck.checkLogin, adminRouter)

app.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/admin/books');
    });

app.get('/*', ((req, res) => {
    res.send('404')
}))

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});
