import express from "express";
import passport from "../middlewares/auth.middleware";
import AuthController from "../controllers/admin/auth.controller";

const authRouter = express.Router();

authRouter.get('/login', AuthController.getFormLogin);
authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/admin/books',
    failureRedirect: '/auth/login'
}));
export default authRouter;

