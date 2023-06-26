import express from "express";
import {BookController} from "../controllers/admin/book.controller";

const router = express.Router();

router.get('/books', (req, res, next) => {
    BookController.index(req, res).catch(err => {
        next(err)
    })
})

router.get('/books/create', (req, res, next) => {
    BookController.showFormCreate(req, res).catch(err => {
         next(err)
    })
})

router.post('/books/create', (req, res, next) => {
    BookController.create(req, res).catch(err => {
        next(err)
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
