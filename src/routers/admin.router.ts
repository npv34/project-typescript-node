import express from "express";
import {BookController} from "../controllers/admin/book.controller";
import {resolveObjectURL} from "buffer";

const router = express.Router();

router.get('/books', (req, res) => {
    BookController.index(req, res).catch(err => {
        // tslint:disable-next-line:no-console
        console.log( `error list  books `);
    })
})

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


export default router;
