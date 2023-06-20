import Book from "../../models/schemas/book.schema";
import Category from "../../models/schemas/category.schema";
import {Request} from "express";

export class BookController {

    static async index(req: any, res: any) {
        const books = await Book.find().populate('category');
        res.render('admin/books/list', {data: books});
    }

    static async showFormCreate(req: any, res: any) {
        const categories = await Category.find();
        res.render('admin/books/add', {categories})
    }

    static async create(req: any, res: any) {
        const categoryID = req.body.category_id
        const categorySelect = await Category.find({
            _id: categoryID
        });
        const data = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            author: req.body.author,
            category: categorySelect[0]
        }
        const book = new Book(data)
        await book.save();
        res.redirect('/admin/books')
    }

    static async showFormEdit(req: any, res: any) {
        const categories = await Category.find();
        const idBook = req.params.id;
        const book = await Book.findOne({_id: idBook}).populate('category');
        res.render('admin/books/edit', {categories, book})
    }

    static async update(req: any, res: any) {
        const idBook = req.params.id;
        const book = await Book.findOne({_id: idBook}).populate('category');
        const idCate = req.body.category_id;
        const category = await Category.findOne({_id: idCate});
        const {name, description, price, author} = req.body
        if (book && category) {
            book.name = name;
            book.description = description;
            book.price = price;
            book.author = author;
            book.category = category._id;
            await book.save();
            res.redirect('/admin/books')
        }
    }

    static async delete(req: any, res: any) {
        const idBook = req.params.id;
        const book = await Book.findOne({_id: idBook});
        if (book) {
            await book.delete();
            const books = await Book.find();
            return res.json({
                status: "success",
                message: "Book deleted successfully",
                count: books.length
            })
        } else {
            return res.json({
                status: "error",
                message: "Book deleted not found"
            })
        }
    }
}
