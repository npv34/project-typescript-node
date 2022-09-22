import express from "express";
import {BookController} from "../controllers/admin/book.controller";
import checkPermissionMiddleware from "../middleware/checkPermission.middleware";

const router = express.Router();

router.get('/books', (req, res) => {
    console.log(req.user)
    BookController.index(req, res).catch(err => {
        // tslint:disable-next-line:no-console
        console.log( `error list  books `);
    })
})

router.get('/books/create', checkPermissionMiddleware, (req, res) => {
    BookController.showFormCreate(req, res).catch(err => {
        // tslint:disable-next-line:no-console
        console.log( `error form create  books `);
    })
})

router.post('/books/create', checkPermissionMiddleware, (req, res) => {
    BookController.create(req, res).catch(err => {
        // tslint:disable-next-line:no-console
        console.log( `error create  books ${err.message}` );
    })
})

router.get('/error', (req, res) => {
    res.render('errors/403')
})


export default router;
