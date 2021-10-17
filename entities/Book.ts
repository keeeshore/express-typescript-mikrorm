import {Cascade, Collection, Entity, OneToMany, Property, ManyToOne, PrimaryKey, ManyToMany} from '@mikro-orm/core';
import {BaseEntity} from "./BaseEntity";
import {Author} from "./Author";
import {BookGenre} from "./BookGenre";

@Entity()
export class Book extends BaseEntity {

    @Property()
    title: string;

    @Property()
    publisher: string;

    @Property()
    author_id: string;

    constructor({ id = undefined, author_id = undefined, title, publisher}) {
        super();
        if (id) {
            this.id = id;
        }
        if (author_id) {
            this.author_id = author_id
        }
        this.title = title;
        this.publisher = publisher;
    }

    @ManyToOne(() => Author)
    author!: Author;

    @OneToMany(() => BookGenre, bookGenre => bookGenre.book, { cascade: [Cascade.ALL] })
    bookGenres = new Collection<BookGenre>(this)

    // @OneToMany(() => Genre, genre => genre.book, { joinColumn: 'genre_id'})
    // genres = new Collection<Genre>(this)

    // @OneToMany(() => Genre, genre => genre.book, { cascade: [Cascade.ALL] })
    // asdada = ["asda"]
    // genres = ["sfdf", "asfd"]
    // genres = ;new Collection<Genre>(this)

}
