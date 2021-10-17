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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orm = void 0;
const core_1 = require("@mikro-orm/core");
const Author_1 = require("../entities/Author");
const Book_1 = require("../entities/Book");
const Genre_1 = require("../entities/Genre");
const BookGenre_1 = require("../entities/BookGenre");
exports.orm = (() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("DB_NAME: ", process.env.DB_NAME);
    console.log("DB_USER: ", process.env.DB_USER);
    return yield core_1.MikroORM.init({
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
}))();
//# sourceMappingURL=orm.js.map