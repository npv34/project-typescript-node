import express, {Router} from "express";
import {AuthController} from "../controllers/admin/auth.controller";
import authMiddle from "../middleware/auth.middleware";
import * as AuthCheck from "../middleware/auth.check";

const router: Router = express.Router();

router.get('/login', (req, res) => {
    if (req.user) {
        res.redirect('/admin/books')
    }else {
        AuthController.showFormLogin(req, res);
    }
})

router.post('/login', authMiddle.authenticate('local', {
    successRedirect: '/admin/books',
    failureRedirect: '/auth/login'
}));

router.get('/logout', AuthCheck.checkLogin, (req, res, next) => {
    req.logout((err) =>  {
        if (err) {
            return next(err);
        }
        res.redirect('/auth/login');
    });
});

export default router;
