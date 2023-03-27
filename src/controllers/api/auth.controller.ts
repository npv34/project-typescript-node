class AuthController {
    static me(req: any, res: any): any {
        return res.json({
            message: 'success',
            data: req.currenUserLogin
        })
    }
}

export default AuthController;
