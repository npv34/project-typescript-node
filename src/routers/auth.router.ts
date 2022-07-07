import express from "express";
import {AuthController} from "../controllers/admin/auth.controller";
import authMiddle from "../middleware/auth.middleware";

const router = express.Router();

router.get('/login', (req, res) => {
    AuthController.showFormLogin(req, res);
})

router.post('/login', authMiddle.authenticate('local', {
    successRedirect: '/admin/books',
    failureRedirect: '/auth/login'
}));

export default router;
