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

export default passport
