import {Genre} from "../entities/Genre";
import {MikroORM} from "@mikro-orm/core";

export const getGenres = async (orm: MikroORM): Promise<Genre[]> => {
    console.log("ORM ::: getGenres id = ")
    const repo = orm.em.getRepository(Genre);
    let results = await repo.findAll();
    console.log("ORM ::: getBooks result = ", JSON.stringify(results));
    return results;
}
