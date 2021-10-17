import {Cascade, Collection, Entity, OneToMany, Property, ManyToOne, PrimaryKey} from '@mikro-orm/core';
import {BaseEntity} from "./BaseEntity";
import {Book} from "./Book";

@Entity()
export class Author extends BaseEntity {

    @Property()
    name: string;

    @Property()
    age: number;

    @Property()
    email: string;

    constructor({ id = undefined, name, age, email }) {
        super();
        if (id) {
           this.id = id;
           return;
        }
        this.name = name;
        this.age = age;
        this.email = email;
        this.books = this.books || new Collection<Book, unknown>([]);
    }

    // @OneToMany(() => Photos, p => p.uid, { cascade: [Cascade.ALL] })
    // photos = new Collection<Photos>(this);

    // @OneToMany(() => Photos, p => p.albumid, { cascade: [Cascade.ALL] })
    // photos = new Collection<Photos>(this);

    // @OneToMany({ entity: () => Photos, mappedBy: 'albumid', orphanRemoval: true })
    // photos = new Collection<Photos>(this);

    // @OneToMany({ entity: () => Photos, mappedBy: 'uid', orphanRemoval: true })
    // photos = new Collection<Photos>(this);

    @OneToMany(() => Book, book => book.author, { cascade: [Cascade.ALL] })
    books = new Collection<Book>(this);

    // @OneToMany({ entity: () => Photos, mappedBy: 'uid', cascade: [Cascade.ALL] })
    // photos = new Collection<Photos>(this);

}
