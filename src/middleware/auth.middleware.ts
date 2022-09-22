import passport from "passport";
import * as passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import User from "../models/schemas/user.schema";

passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({username});
    if (!user) {
        return done(null, false, { message: 'Incorrect username and password' });
    }

    if (user.password !== password) {
        return done(null, false, { message: 'Incorrect username and password' });
    }

    return done(null, user)
}))

passport.serializeUser((user: any, done) => {
    process.nextTick(() => {
        done(null, user._id);
    });
});

passport.deserializeUser((id:any, done)  => {
    process.nextTick(() => {
        User.findById(id).then( (user:any) =>{
            done(null, user);
        }).catch( (err) => {
            done(err);
        })
    });
});

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
        clientID: '37363328185-4ggo0p41q1affr9gv2bstv21v61af4io.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:8081/google/callback"
    },
    async function(accessToken: any, refreshToken: any, profile: any, cb: any) {
        console.log(profile)
        let userGoogle = await User.findOne({ google_id: profile.id })
        if (userGoogle) {
            cb(null, userGoogle)
        } else {
            let data = {
                name: profile.displayName,
                username: profile.emails[0].value,
                password: Math.random(),
                google_id: profile.id,
                role: 'user'
            }
            let user = new User(data)
            await user.save();
            cb(null, user)
        }
    }
));

export default passport
