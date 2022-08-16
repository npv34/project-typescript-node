import Book from "../../models/schemas/book.schema";
import Category from "../../models/schemas/category.schema";

export class BookController {

    static async index(req: any, res: any) {
        const books = await Book.find().populate('category');
        res.render('admin/books/list', {data: books});
    }

    static async showFormCreate(req: any, res: any) {
        const categories = await Category.find();
        res.render('admin/books/add', { categories})
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
}
