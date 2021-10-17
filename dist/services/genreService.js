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
exports.getGenres = void 0;
const Genre_1 = require("../entities/Genre");
const getGenres = (orm) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ORM ::: getGenres id = ");
    const repo = orm.em.getRepository(Genre_1.Genre);
    let results = yield repo.findAll();
    console.log("ORM ::: getBooks result = ", JSON.stringify(results));
    return results;
});
exports.getGenres = getGenres;
//# sourceMappingURL=genreService.js.map