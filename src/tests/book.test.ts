import {dbHandler} from './db-handler';
import Book from "../models/schemas/book.schema";

let dbTest = new dbHandler()

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbTest.dbConnect());
/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbTest.clearDatabase());
/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbTest.dbDisconnect());
/**
 * Book test suite.
 */
describe('book ', () => {
    it('can be created correctly', async () => {
        expect(async () => await Book.create(bookComplete))
            .not
            .toThrow();
    });

    it('create book err without name', async () => {
        let book = {
            name: '',
            price: 2000,
            description: 'fdsfsd',
            author: 'Kim dong',
        }
        //ket qua mong muon
        let message = 'Book validation failed: name: Path `name` is required.'

        async function createBook() {
            await Book.create(book)
        }

       // cho thuc thi ham createBook
        createBook().catch(err => {
            expect(err.message).toEqual(message)
        })
    });

    it('show list book empty', async () => {
        let countBook = 0;

        async function getBooks() {
            return Book.find();
        }

        getBooks().then(res => {
            expect(res.length).toEqual(countBook)
        })
     })
});

/**
 * Complete product example.
 */
const bookComplete = {
    name: 'book 1',
    price: 2000,
    description: 'fdsfsd',
    author: 'Kim dong',
}


