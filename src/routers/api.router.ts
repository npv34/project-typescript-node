import express from "express";
import {LoginController} from "../controllers/api/login.controller";
import verifyJWT from "../middleware/jwt.middleware";


const router = express.Router();

router.post('/login', (req, res) => {
    LoginController.login(req, res);
})

router.get('/users', verifyJWT, (req, res) => {
    res.json('oke')
})

export default router;
