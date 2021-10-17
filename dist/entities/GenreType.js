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
exports.GenreType = void 0;
const core_1 = require("@mikro-orm/core");
const BaseEntity_1 = require("./BaseEntity");
const Genre_1 = require("./Genre");
let GenreType = class GenreType extends BaseEntity_1.BaseEntity {
    // @Property({ persist: false })
    // get desc(): string {
    //     console.log('>>>>>>>>>>> GenreType desc() :: ', this);
    //     return this.label || "desc";
    // }
    constructor(id) {
        super();
        console.log('>>>>>>>>>>>  GenreType constructor () :: ');
        this.id = id;
    }
};
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], GenreType.prototype, "label", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => Genre_1.Genre, { joinColumn: 'id' }),
    __metadata("design:type", Genre_1.Genre)
], GenreType.prototype, "genre", void 0);
GenreType = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], GenreType);
exports.GenreType = GenreType;
//# sourceMappingURL=GenreType.js.map