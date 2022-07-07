export function checkLogin(req: any, res: any, next: any) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}

