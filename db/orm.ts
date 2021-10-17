import {MemoryCacheAdapter, MikroORM} from '@mikro-orm/core';
import {Author} from "../entities/Author";
import {Book} from "../entities/Book";
import {Genre} from "../entities/Genre";
import {BookGenre} from "../entities/BookGenre";

export const orm = (async (): Promise<MikroORM> => {
    console.log("DB_NAME: ", process.env.DB_NAME);
    console.log("DB_USER: ", process.env.DB_USER);
    return await MikroORM.init({
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
})();

