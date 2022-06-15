import { MongoClient } from "mongodb";
import Teste from "./Teste";

export class Controller {
    async get(id: string, mongoClient: MongoClient): Promise<TesteDto | null> {        
        const collection = await mongoClient.db("test").collection("test");

        const result = await collection.findOne({ _id: id });

        if (!result) {
            return null;
        }

        return {
            id: result._id.toString(),
            value1: result.value1,
            value2: result.value2,
            value3: result.value3,
            value4: result.value4,
            value5: result.value5,
            value6: result.value6,
            value7: result.value7,
            value8: result.value8,
            value9: result.value9,
            value10: result.value10,
        }
    }

    async post(dto: TesteDto, mongoClient: MongoClient): Promise<TesteDto | null> {        
        const collection = await mongoClient.db("test").collection("test");

        const teste = new Teste(
            dto.id,
            dto.value1,
            dto.value2,
            dto.value3,
            dto.value4,
            dto.value5,
            dto.value6,
            dto.value7,
            dto.value8,
            dto.value9,
            dto.value10,
        )
 
        await collection.insertOne({ ...teste })

        return dto;
    }
}

export interface TesteDto {
    id: string,
    value1: string,
    value2: string,
    value3: string,
    value4: string,
    value5: string,
    value6: string,
    value7: string,
    value8: string,
    value9: string,
    value10: string
}