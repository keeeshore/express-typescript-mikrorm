import express from 'express';
import {Collection, MemoryCacheAdapter, MikroORM} from '@mikro-orm/core';
import {Author} from "./entities/Author";
import {Book} from "./entities/Book";
import {Genre} from "./entities/Genre";
import {getGenres} from "./services/genreService";
import {getBooks} from "./services/bookService";
import {BookGenre} from "./entities/BookGenre";

const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
const port = 3000;

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

let orm: MikroORM = null;

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

const getAuthors = async (id: number): Promise<Author[]> => {
  console.log("ORM ::: getAuthors id = ", id)
  const authorRepo = orm.em.getRepository(Author);
  let results;
  if (!isNaN(id)) {
    results =  await authorRepo.find({ id: id }, [ 'books.bookGenres' ]);
  } else {
    results = await authorRepo.findAll();
    await orm.em.populate(results, ['books.bookGenres']);
  }
  console.log("ORM ::: getAlbums result = ", JSON.stringify(results));
  return results;
}

app.get('/', async (req, res) => {
  res.send(`It works! `);
});

app.get('/authors/:id?', async (req, res) => {
  const result = await getAuthors(parseInt(req.params.id));
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
});

app.get('/book/:id?', async (req, res) => {
  console.log(" getBooks START params ::::: ", req.params);
  const response = await getBooks(orm, parseInt(req.params.id));
  console.log(" getBooks Get ::::: ", response);
  res.status(200).json(response);
});

app.get('/genres', async (req, res) => {
  console.log(" genres START params ::::: ");
  const response = await getGenres(orm);
  console.log(" genres Get ::::: ", response);
  res.status(200).json(response);
});

app.post('/authors', async (req, res) => {
  let authorResult: any = { status: "OK" };
  try {
    console.log(" POST_AUTHOR START body ::::: ", req.body);
    const { name, age, email, books } = req.body;
    const author: Author = new Author({ name, age, email });
     if (books.length > 0 ) {
       books.forEach((book: any) => {
         const book1 = new Book({ title: book.title, publisher: book.publisher });
         book.genres.forEach((bg: BookGenre) => {
           console.log(" getBooks books.genres ::::: ", JSON.stringify(bg));
           const bookGenre = new BookGenre({ genre_id: bg.genre_id });
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
    await orm.em.flush();
    authorResult = await orm.em.findOneOrFail(Author, { name: author.name });
    console.log(" POST_AUTHOR authorResult  ::::: ", authorResult);
  } catch (err: any) {
    console.error("Author Add Error", err);
    res.status(400).json(err);
    return;
  }
  res.status(200).json(authorResult);
});

app.delete('/authors/:id', async (req, res) => {
  let authorResult: any = { status: "OK" };
  try {
    console.log(" DELETE_AUTHOR START body ::::: ", req.body);
    const author_id = req.params.id;
    const { name, age, email, books } = req.body;
    // const author: Author = new Author({ id: author_id, name, age, email });
    authorResult = await orm.em.findOneOrFail(Author, { id: parseInt(author_id, 10) });
    console.log(" DELETE_AUTHOR START flush ::::: ", authorResult);
    orm.em.remove(authorResult);
    await orm.em.flush();
    // authorResult = await orm.em.findOneOrFail(Author, { name: author.name });
    authorResult = { deleted: true };
    console.log(" DELETE_AUTHOR authorResult  ::::: ", authorResult);
  } catch (err: any) {
    console.error("Author Add Error", err);
    res.status(400).json(err);
    return;
  }
  res.status(200).json(authorResult);
});

app.post('/book', async (req, res) => {
  console.log(" POST_BOOK START body ::::: ", JSON.stringify(req.body));
  const { title, publisher, author_id, bookGenres } = req.body;
  const book: Book = new Book({title, publisher, author_id });
  (bookGenres || []).forEach((bg: BookGenre) => {
    const bookGenre = new BookGenre({ genre_id: bg.genre_id });
    book.bookGenres.add(bookGenre);
  });
  console.log("OST_BOOK book ::::: ", book);
  orm.em.persist(book);
  console.log(" POST_BOOK START flush ::::: ", book);
  await orm.em.flush();
  res.status(200).json(book);
});

app.put('/book/?id', async (req, res) => {
  console.log(" PUT_BOOK START body ::::: ", JSON.stringify(req.body));
  const { title, id, publisher, author_id, bookGenres } = req.body;
  const book: Book = new Book({id, title, publisher, author_id });
  (bookGenres || []).forEach((bg: BookGenre) => {
    const bookGenre = new BookGenre({ genre_id: bg.genre_id });
    book.bookGenres.add(bookGenre);
  });
  console.log("OST_BOOK book ::::: ", book);
  orm.em.persist(book);
  console.log(" POST_BOOK START flush ::::: ", book);
  await orm.em.flush();
  res.status(200).json(book);
});

(async () => {
  console.log("DB_NAME: ", process.env.DB_NAME);
  console.log("DB_USER: ", process.env.DB_USER);
  orm = await MikroORM.init({
    resultCache: {
      adapter: MemoryCacheAdapter,
      expiration: 500, // 1s
      options: {},
    },
    // namingStrategy: CustomNamingStrategy,
    debug: true,
    entities: [ Author, Book, Genre, BookGenre ],
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    type: "mysql", // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
    clientUrl: process.env.DB_URL, // defaults to 'mongodb://localhost:27017' for mongodb driver
  });
  console.log("ORM ::: ", orm.em); // access EntityManager via `em` property

  app.use(express.json());
  // @ts-ignore
  app.listen(port, (err: any) => {
    if (err) {
      return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
  });
})();

export { orm };

