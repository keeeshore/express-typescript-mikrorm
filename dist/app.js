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
const express_1 = __importDefault(require("express"));
const core_1 = require("@mikro-orm/core");
const Author_1 = require("./entities/Author");
const Book_1 = require("./entities/Book");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = (0, express_1.default)();
const port = 3000;
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
let orm = null;
const getBooks = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ORM ::: getBooks id = ", id);
    const bookRepo = orm.em.getRepository(Book_1.Book);
    let results;
    if (id) {
        results = yield bookRepo.find({ id: id }, ['book']);
    }
    else {
        results = yield bookRepo.findAll();
    }
    console.log("ORM ::: getBooks result = ", JSON.stringify(results));
    return results;
});
const getAuthors = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ORM ::: getAuthors id = ", id);
    const authorRepo = orm.em.getRepository(Author_1.Author);
    let results;
    if (!isNaN(id)) {
        results = yield authorRepo.find({ id: id }, ['books']);
    }
    else {
        results = yield authorRepo.findAll();
        yield orm.em.populate(results, ['books']);
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
    const results = result.map((author) => {
        return {
            author: author,
            id: author.id,
            completed: false,
            deleted: false,
            inProgress: false,
        };
    });
    res.status(200).json(results);
}));
app.get('/book/:id?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(" getBooks START params ::::: ", req.params);
    const response = yield getBooks(parseInt(req.params.id));
    console.log(" getBooks Get ::::: ", response);
    res.status(200).json(response);
}));
app.post('/authors', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let authorResult = { status: "OK" };
    try {
        console.log(" POST_AUTHOR START body ::::: ", req.body);
        const { name, age, email } = req.body;
        const author = new Author_1.Author({ name, age, email });
        console.log(" getBooks author ::::: ", author);
        orm.em.persist(author);
        console.log(" POST_AUTHOR START flush ::::: ", author);
        yield orm.em.flush();
        authorResult = yield orm.em.findOneOrFail(Author_1.Author, { name: author.name });
        console.log(" POST_AUTHOR authorResult  ::::: ", authorResult);
        const bookData = {
            author_id: authorResult.id,
            publisher: `pub_${authorResult.name.split(' ')[0]}`,
            title: `title_${authorResult.name.split(' ')[1]}`
        };
        const book = new Book_1.Book(bookData);
        orm.em.persist(book);
        yield orm.em.flush();
        authorResult = yield orm.em.findOneOrFail(Author_1.Author, { id: authorResult.id }, ['books']);
    }
    catch (err) {
        res.status(400).json(err);
        return;
    }
    res.status(200).json(authorResult);
}));
app.post('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(" POST_BOOK START body ::::: ", req.body);
    const { title, publisher, author_id } = req.body;
    const book = new Book_1.Book({ title, publisher, author_id });
    console.log(" getBooks books ::::: ", book);
    orm.em.persist(book);
    console.log(" POST_BOOK START flush ::::: ", book);
    yield orm.em.flush();
    res.status(200).json(book);
}));
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("DB_NAME: ", process.env.DB_NAME);
    console.log("DB_USER: ", process.env.DB_USER);
    orm = yield core_1.MikroORM.init({
        // namingStrategy: CustomNamingStrategy,
        debug: true,
        entities: [Author_1.Author, Book_1.Book],
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