import {
    Cascade,
    Collection,
    Entity,
    OneToMany,
    Property,
    ManyToOne,
    PrimaryKey,
    OneToOne,
    ManyToMany
} from '@mikro-orm/core';
import {BaseEntity} from "./BaseEntity";
import {BookGenre} from "./BookGenre";


@Entity()
export class Genre extends BaseEntity {

    @Property()
    label: string;

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

    // @ManyToOne(() => BookGenre, { joinColumn: 'id' })
    // bookGenre!: BookGenre;

}
