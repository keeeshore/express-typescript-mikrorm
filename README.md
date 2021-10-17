# express-typescript-mikrorm

## Express js using Mikro orm with Typescript support

#### Basic express app built using mikrorm, connected to Mysql db and typescript 

##### e.g. endpoints include

- `GET http://localhost/authors` // Will fetch all Authors, including books published by them using orm.collection (OnetoMany)
- `GET http://localhost/authors/:id` // Will fetch one Author, including books published
- `POST http://localhost/author` / /Will add a new Author

- `GET http://localhost/books/:id` // Will fetch all books based on author id
- `POST http://localhost/books` / /Will add a new book using AuthorId


### Installation:

- Download repo
- npm install 
- `npm start` 
