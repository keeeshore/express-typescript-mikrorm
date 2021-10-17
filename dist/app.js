"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orm = void 0;
const express_1 = __importDefault(require("express"));
const core_1 = require("@mikro-orm/core");
const Author_1 = require("./entities/Author");
const Book_1 = require("./entities/Book");
const Genre_1 = require("./entities/Genre");
const genreService_1 = require("./services/genreService");
const bookService_1 = require("./services/bookService");
const BookGenre_1 = require("./entities/BookGenre");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = (0, express_1.default)();
const port = 3000;
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
let orm = null;
exports.orm = orm;
// const getBooks = async (id: number): Promise<Book[]> => {
//   console.log("ORM ::: getBooks id = ", id)
//   const bookRepo = orm.em.getRepository(Book);
//   let results;
//   if (id) {
//     results =  await bookRepo.find({ id: id }, [ 'book' ]);
//   } else {
//     results = await bookRepo.findAll();
//   }
//   console.log("ORM ::: getBooks result = ", JSON.stringify(results));
//   return results;
// }
const getAuthors = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ORM ::: getAuthors id = ", id);
    const authorRepo = orm.em.getRepository(Author_1.Author);
    let results;
    if (!isNaN(id)) {
        results = yield authorRepo.find({ id: id }, ['books.bookGenres']);
    }
    else {
        results = yield authorRepo.findAll();
        yield orm.em.populate(results, ['books.bookGenres']);
    }
    console.log("ORM ::: getAlbums result = ", JSON.stringify(results));
    return results;
});
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(`It works! `);
}));
app.get('/authors/:id?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield getAuthors(parseInt(req.params.id));
    console.log(" Get ::::: ", JSON.stringify(result));
    // const results = result.map((author: Author) => {
    //   return {
    //     author: author,
    //     id: author.id,
    //     completed: false,
    //     deleted: false,
    //     inProgress: false,
    //   }
    // })
    res.status(200).json(result);
    // res.status(200).json(results);
}));
app.get('/book/:id?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(" getBooks START params ::::: ", req.params);
    const response = yield (0, bookService_1.getBooks)(orm, parseInt(req.params.id));
    console.log(" getBooks Get ::::: ", response);
    res.status(200).json(response);
}));
app.get('/genres', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(" genres START params ::::: ");
    const response = yield (0, genreService_1.getGenres)(orm);
    console.log(" genres Get ::::: ", response);
    res.status(200).json(response);
}));
app.post('/authors', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let authorResult = { status: "OK" };
    try {
        console.log(" POST_AUTHOR START body ::::: ", req.body);
        const { name, age, email, books } = req.body;
        const author = new Author_1.Author({ name, age, email });
        if (books.length > 0) {
            books.forEach((book) => {
                const book1 = new Book_1.Book({ title: book.title, publisher: book.publisher });
                book.genres.forEach((bg) => {
                    console.log(" getBooks books.genres ::::: ", JSON.stringify(bg));
                    const bookGenre = new BookGenre_1.BookGenre({ genre_id: bg.genre_id });
                    // books1.add(book1);
                    book1.bookGenres.add(bookGenre);
                });
                author.books.add(book1);
                console.log(" getBooks books ::::: ", JSON.stringify(book1.bookGenres));
            });
        }
        console.log(" getBooks author ::::: ", author);
        console.log(" getBooks books ::::: ", author.books);
        orm.em.persist(author);
        console.log(" POST_AUTHOR START flush ::::: ", author);
        yield orm.em.flush();
        authorResult = yield orm.em.findOneOrFail(Author_1.Author, { name: author.name });
        console.log(" POST_AUTHOR authorResult  ::::: ", authorResult);
    }
    catch (err) {
        console.error("Author Add Error", err);
        res.status(400).json(err);
        return;
    }
    res.status(200).json(authorResult);
}));
app.delete('/authors/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let authorResult = { status: "OK" };
    try {
        console.log(" DELETE_AUTHOR START body ::::: ", req.body);
        const author_id = req.params.id;
        const { name, age, email, books } = req.body;
        // const author: Author = new Author({ id: author_id, name, age, email });
        authorResult = yield orm.em.findOneOrFail(Author_1.Author, { id: parseInt(author_id, 10) });
        console.log(" DELETE_AUTHOR START flush ::::: ", authorResult);
        orm.em.remove(authorResult);
        yield orm.em.flush();
        // authorResult = await orm.em.findOneOrFail(Author, { name: author.name });
        authorResult = { deleted: true };
        console.log(" DELETE_AUTHOR authorResult  ::::: ", authorResult);
    }
    catch (err) {
        console.error("Author Add Error", err);
        res.status(400).json(err);
        return;
    }
    res.status(200).json(authorResult);
}));
app.post('/book', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(" POST_BOOK START body ::::: ", JSON.stringify(req.body));
    const { title, publisher, author_id, bookGenres } = req.body;
    const book = new Book_1.Book({ title, publisher, author_id });
    (bookGenres || []).forEach((bg) => {
        const bookGenre = new BookGenre_1.BookGenre({ genre_id: bg.genre_id });
        book.bookGenres.add(bookGenre);
    });
    console.log("OST_BOOK book ::::: ", book);
    orm.em.persist(book);
    console.log(" POST_BOOK START flush ::::: ", book);
    yield orm.em.flush();
    res.status(200).json(book);
}));
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("DB_NAME: ", process.env.DB_NAME);
    console.log("DB_USER: ", process.env.DB_USER);
    exports.orm = orm = yield core_1.MikroORM.init({
        resultCache: {
            adapter: core_1.MemoryCacheAdapter,
            expiration: 500,
            options: {},
        },
        // namingStrategy: CustomNamingStrategy,
        debug: true,
        entities: [Author_1.Author, Book_1.Book, Genre_1.Genre, BookGenre_1.BookGenre],
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        type: "mysql",
        clientUrl: process.env.DB_URL, // defaults to 'mongodb://localhost:27017' for mongodb driver
    });
    console.log("ORM ::: ", orm.em); // access EntityManager via `em` property
    app.use(express_1.default.json());
    // @ts-ignore
    app.listen(port, (err) => {
        if (err) {
            return console.error(err);
        }
        return console.log(`server is listening on ${port}`);
    });
}))();
//# sourceMappingURL=app.js.map