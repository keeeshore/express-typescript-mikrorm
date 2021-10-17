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
exports.getBooks = void 0;
const Book_1 = require("../entities/Book");
const getBooks = (orm, id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ORM ::: getBooks id = ", id);
    const bookRepo = orm.em.getRepository(Book_1.Book);
    let results;
    if (id) {
        // results =  await bookRepo.find({ id: id }, [  'genres' ]);
        // results =  await bookRepo.find({ id: id }, [  'bookGenres.genres' ]);
        results = yield bookRepo.find({ id: id }, ['bookGenres.genre']);
        // results =  await bookRepo.find({ id: id }, [  'bookGenres.genre' ]);
        // results  = await bookRepo.find({ id: id,  genres : { id: id  } });
        // results =  await bookRepo.find({ id: id });
    }
    else {
        results = yield bookRepo.findAll();
    }
    console.log("ORM ::: getBooks result = ", JSON.stringify(results));
    return results;
});
exports.getBooks = getBooks;
//# sourceMappingURL=bookService.js.map