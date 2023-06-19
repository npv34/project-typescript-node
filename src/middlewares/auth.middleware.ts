import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/schemas/user.schema";

// @ts-ignore
passport.use(new LocalStrategy(async function verify(username: string, password: string, cb:any){
    const user = await User.findOne({username});
    if (!user) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
    if (user.password !== password) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
    return cb(null, user);
}))

// tslint:disable-next-line:only-arrow-functions
passport.serializeUser(function(user: any, cb) {
    // tslint:disable-next-line:only-arrow-functions
    process.nextTick(function() {
        cb(null, { id: user._id, username: user.username });
    });
});

// tslint:disable-next-line:only-arrow-functions
passport.deserializeUser(function(user: any, cb): any {
    // tslint:disable-next-line:only-arrow-functions
    process.nextTick(function(): any {
        return cb(null, user);
    });
});

export default passport;
