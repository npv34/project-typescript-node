import mongoose, {Schema} from "mongoose";
import {type} from "os";

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: String,
    description: String,
    author: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
})

const Book = mongoose.model("Book", bookSchema)

export default Book;
