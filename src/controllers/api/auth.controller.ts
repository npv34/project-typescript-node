class AuthController {
    static me(req: any, res: any): any {
        return res.json({
            status: 'success',
            data: req.currenUserLogin
        })
    }
}

export default AuthController;
