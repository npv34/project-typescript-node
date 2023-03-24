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


export default router;
