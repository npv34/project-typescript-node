import passport from "passport";
import LocalStrategy from "passport-local"

export class AuthController {
    static showFormLogin(req: any, res: any) {
        res.render('admin/login')
    }
}
