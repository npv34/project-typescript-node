class AuthController {
    static getFormLogin(req: any, res: any): any {
        res.render('admin/auth/login')
    }
}

export default AuthController;

