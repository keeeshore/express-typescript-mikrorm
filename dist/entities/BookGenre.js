"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookGenre = void 0;
const core_1 = require("@mikro-orm/core");
const BaseEntity_1 = require("./BaseEntity");
const Book_1 = require("./Book");
const Genre_1 = require("./Genre");
// SELECT title, publisher, genre_type.label from book
// INNER JOIN genre ON genre.book_id = book.id
// INNER JOIN genre_type ON genre.genre_id = genre_type.id
// where book_id = 2
let BookGenre = class BookGenre extends BaseEntity_1.BaseEntity {
    constructor({ book_id = undefined, genre_id }) {
        super();
        console.log(':::::: Genre constructor() :: ');
        // this.book_id = book_id;
        this.genre_id = genre_id;
    }
    // @Property({ persist: false })
    // get labels(): string[] {
    //     console.log('BookGenre getLabel() :: ', this.genre);
    //     // return this.genre.label
    //     return ['aaa', 'bbb']
    // }
    get label() {
        console.log('BookGenre getLabel() :: ', this.genre);
        // return this.genre.label
        return this.genre.label;
        // return this.genre.label || "uuuu";
    }
};
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], BookGenre.prototype, "book_id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], BookGenre.prototype, "genre_id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => Book_1.Book),
    __metadata("design:type", Book_1.Book)
], BookGenre.prototype, "book", void 0);
__decorate([
    (0, core_1.OneToOne)(),
    __metadata("design:type", Genre_1.Genre)
], BookGenre.prototype, "genre", void 0);
__decorate([
    (0, core_1.Property)({ persist: false }),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], BookGenre.prototype, "label", null);
BookGenre = __decorate([
    (0, core_1.Filter)({ name: 'writtenBy', cond: args => ({ author: { name: args.name } }) }),
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], BookGenre);
exports.BookGenre = BookGenre;
//# sourceMappingURL=BookGenre.js.map