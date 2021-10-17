import {Genre} from "../entities/Genre";
import {Book} from "../entities/Book";
import {MikroORM, QueryOrder} from "@mikro-orm/core";

export const getBooks = async (orm:MikroORM, id: number): Promise<Book[]> => {
    console.log("ORM ::: getBooks id = ", id)
    const bookRepo = orm.em.getRepository(Book);
    let results;
    if (id) {
        // results =  await bookRepo.find({ id: id }, [  'genres' ]);
        // results =  await bookRepo.find({ id: id }, [  'bookGenres.genres' ]);
        results =  await bookRepo.find({ id: id }, [  'bookGenres.genre' ]);
        // results =  await bookRepo.find({ id: id }, [  'bookGenres.genre' ]);
        // results  = await bookRepo.find({ id: id,  genres : { id: id  } });
        // results =  await bookRepo.find({ id: id });
    } else {
        results = await bookRepo.findAll();
    }
    console.log("ORM ::: getBooks result = ", JSON.stringify(results));
    return results;
}
