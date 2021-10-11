import {Cascade, Collection, Entity, OneToMany, Property, ManyToOne, PrimaryKey} from '@mikro-orm/core';
import {BaseEntity} from "./BaseEntity";
import {Author} from "./Author";

@Entity()
export class Book extends BaseEntity {

    @Property()
    title: string;

    @Property()
    publisher: string;

    @Property()
    author_id: string;

    constructor({author_id, title, publisher}) {
        super();
        this.author_id = author_id;
        this.title = title;
        this.publisher = publisher;
    }

    @ManyToOne(() => Author)
    author!: Author;

}
