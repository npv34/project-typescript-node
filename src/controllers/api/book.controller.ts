import Book from "../../models/schemas/book.schema";
import Category from "../../models/schemas/category.schema";

export class BookController {

    static async index(req: any, res: any) {
        try {
            const books = await Book.find().populate('category');
            const data = {
                status : 'success',
                data: books
            }
            res.json(data);
        }catch (e: any) {
            const data = {
                status : 'error',
                message : e.message
            }
            res.json(data);
        }
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
        const dataRes = {
            status : 'success',
            data: book
        }
        res.json(dataRes);
    }
}
