import express from 'express';
import {MikroORM} from '@mikro-orm/core';
import {Author} from "./entities/Author";
import {Book} from "./entities/Book";

const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
const port = 3000;

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

let orm: MikroORM = null;

const getBooks = async (id: number): Promise<Book[]> => {
  console.log("ORM ::: getBooks id = ", id)
  const bookRepo = orm.em.getRepository(Book);
  let results;
  if (id) {
    results =  await bookRepo.find({ id: id }, [ 'book' ]);
  } else {
    results = await bookRepo.findAll();
  }
  console.log("ORM ::: getBooks result = ", JSON.stringify(results));
  return results;
}

const getAuthors = async (id: number): Promise<Author[]> => {
  console.log("ORM ::: getAuthors id = ", id)
  const authorRepo = orm.em.getRepository(Author);
  let results;
  if (!isNaN(id)) {
    results =  await authorRepo.find({ id: id }, [ 'books' ]);
  } else {
    results = await authorRepo.findAll();
    await orm.em.populate(results, ['books']);
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
  const results = result.map((author: Author) => {
    return {
      author: author,
      id: author.id,
      completed: false,
      deleted: false,
      inProgress: false,
    }
  })
  res.status(200).json(results);
});

app.get('/book/:id?', async (req, res) => {
  console.log(" getBooks START params ::::: ", req.params);
  const response = await getBooks(parseInt(req.params.id));
  console.log(" getBooks Get ::::: ", response);
  res.status(200).json(response);
});

app.post('/authors', async (req, res) => {
  let authorResult: any = { status: "OK" };
  try {
    console.log(" POST_AUTHOR START body ::::: ", req.body);
    const { name, age, email } = req.body;
    const author: Author = new Author({ name, age, email });
    console.log(" getBooks author ::::: ", author);
    orm.em.persist(author);
    console.log(" POST_AUTHOR START flush ::::: ", author);
    await orm.em.flush();
    authorResult = await orm.em.findOneOrFail(Author, { name: author.name });
    console.log(" POST_AUTHOR authorResult  ::::: ", authorResult);
    const bookData = {
      author_id: authorResult.id,
      publisher: `pub_${authorResult.name.split(' ')[0]}`,
      title: `title_${authorResult.name.split(' ')[1]}`};
    const book = new Book(bookData)
    orm.em.persist(book);
    await orm.em.flush();
    authorResult = await orm.em.findOneOrFail(Author, { id: authorResult.id }, [ 'books' ]);
  } catch (err: any) {
    res.status(400).json(err);
    return;
  }
  res.status(200).json(authorResult);
});


app.post('/books', async (req, res) => {
  console.log(" POST_BOOK START body ::::: ", req.body);
  const { title, publisher, author_id } = req.body;
  const book: Book = new Book({title, publisher, author_id });
  console.log(" getBooks books ::::: ", book);
  orm.em.persist(book);
  console.log(" POST_BOOK START flush ::::: ", book);
  await orm.em.flush();
  res.status(200).json(book);
});

(async () => {
  console.log("DB_NAME: ", process.env.DB_NAME);
  console.log("DB_USER: ", process.env.DB_USER);
  orm = await MikroORM.init({
    // namingStrategy: CustomNamingStrategy,
    debug: true,
    entities: [ Author, Book ],
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

