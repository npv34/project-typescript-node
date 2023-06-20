import express from "express";
import {BookController} from "../controllers/admin/book.controller";
import {resolveObjectURL} from "buffer";
import permissionMiddleware from "../middlewares/permission.middleware";

const router = express.Router();

router.get('/books', (req, res) => {
    BookController.index(req, res).catch(err => {
        // tslint:disable-next-line:no-console
        console.log( `error list  books `);
    })
})

router.get('/logout', (req, res, next)=>{
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/auth/login');
    });
});

router.use(permissionMiddleware);
router.get('/books/create', (req, res) => {
    BookController.showFormCreate(req, res).catch(err => {
        // tslint:disable-next-line:no-console
        console.log( `error form create  books `);
    })
})

router.post('/books/create', (req, res) => {
    BookController.create(req, res).catch(err => {
        // tslint:disable-next-line:no-console
        console.log( `error create  books ${err.message}` );
    })
})

router.get('/books/:id/edit', (req, res) => {
    BookController.showFormEdit(req, res).catch(err => {
        // tslint:disable-next-line:no-console
        console.log(err.message);
    })
})

router.post('/books/:id/update', (req, res) => {
    BookController.update(req, res).catch(err => {
        // tslint:disable-next-line:no-console
        console.log(err.message);
    })
})

router.get('/books/:id/delete', (req, res) => {
    BookController.delete(req, res).catch(err => {
        // tslint:disable-next-line:no-console
        console.log(err.message);
    })
})


export default router;
