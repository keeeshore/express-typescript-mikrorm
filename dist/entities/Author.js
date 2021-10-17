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
exports.Author = void 0;
const core_1 = require("@mikro-orm/core");
const BaseEntity_1 = require("./BaseEntity");
const Book_1 = require("./Book");
let Author = class Author extends BaseEntity_1.BaseEntity {
    constructor({ id = undefined, name, age, email }) {
        super();
        // @OneToMany(() => Photos, p => p.uid, { cascade: [Cascade.ALL] })
        // photos = new Collection<Photos>(this);
        // @OneToMany(() => Photos, p => p.albumid, { cascade: [Cascade.ALL] })
        // photos = new Collection<Photos>(this);
        // @OneToMany({ entity: () => Photos, mappedBy: 'albumid', orphanRemoval: true })
        // photos = new Collection<Photos>(this);
        // @OneToMany({ entity: () => Photos, mappedBy: 'uid', orphanRemoval: true })
        // photos = new Collection<Photos>(this);
        this.books = new core_1.Collection(this);
        if (id) {
            this.id = id;
            return;
        }
        this.name = name;
        this.age = age;
        this.email = email;
        this.books = this.books || new core_1.Collection([]);
    }
};
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Author.prototype, "name", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Author.prototype, "age", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Author.prototype, "email", void 0);
__decorate([
    (0, core_1.OneToMany)(() => Book_1.Book, book => book.author, { cascade: [core_1.Cascade.ALL] }),
    __metadata("design:type", Object)
], Author.prototype, "books", void 0);
Author = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Author);
exports.Author = Author;
//# sourceMappingURL=Author.js.map