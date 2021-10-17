import {
    Cascade,
    Collection,
    Entity,
    OneToMany,
    Property,
    ManyToOne,
    PrimaryKey,
    OneToOne,
    ManyToMany, Filter
} from '@mikro-orm/core';
import {BaseEntity} from "./BaseEntity";
import {Book} from "./Book";
import Table = WebAssembly.Table;
import {Genre} from "./Genre";
import {Author} from "./Author";

// SELECT title, publisher, genre_type.label from book
// INNER JOIN genre ON genre.book_id = book.id
// INNER JOIN genre_type ON genre.genre_id = genre_type.id
// where book_id = 2

@Filter({ name: 'writtenBy', cond: args => ({ author: { name: args.name } }) })

@Entity()
export class BookGenre extends BaseEntity {

    @Property()
    book_id: number;

    @Property()
    genre_id: number;

    constructor({ book_id = undefined, genre_id }) {
        super();
        console.log(':::::: Genre constructor() :: ');
        // this.book_id = book_id;
        this.genre_id = genre_id;
    }

    @ManyToOne(() => Book)
    book!: Book;

    // @OneToMany({
    //     entity: () => Genre,
    //     mappedBy: e => e.bookGenre,
    // })
    // genres = new Collection<Genre>(this);

    @OneToOne()
    genre!: Genre;

    // @Property({ persist: false })
    // get labels(): string[] {
    //     console.log('BookGenre getLabel() :: ', this.genre);
    //     // return this.genre.label
    //     return ['aaa', 'bbb']
    // }

    @Property({ persist: false })
    get label(): string {
        console.log('BookGenre getLabel() :: ', this.genre);
        // return this.genre.label
        return this.genre.label;
        // return this.genre.label || "uuuu";
    }


    // @ManyToMany({ entity: () => GenreType, inversedBy: 'genres' })
    // tags = new Collection<GenreType>(this);

}
