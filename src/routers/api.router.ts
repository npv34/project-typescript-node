import express from "express";
import {LoginController} from "../controllers/api/login.controller";
import verifyJWT from "../middleware/jwt.middleware";
import UserController from "../controllers/api/user.controller";
import AuthController from "../controllers/api/auth.controller";
import {BookController} from "../controllers/api/book.controller";


const router = express.Router();

router.post('/login', (req, res) => {
    LoginController.login(req, res);
})

router.get('/users', verifyJWT, (req, res) => {
    UserController.getAllUsers(req, res)
})

router.delete('/users/:id', verifyJWT, (req, res) => {
    UserController.deleteUser(req, res)
})

router.get('/user-login', verifyJWT, (req: any, res: any)=>{
    AuthController.me(req, res);
})
router.get('/books', (req: any, res: any, next: any) => {
    BookController.index(req, res)
})

export default router;
