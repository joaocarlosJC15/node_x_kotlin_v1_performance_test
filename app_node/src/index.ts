import express from "express";
import { Request, Response, json } from "express";
import { MongoClient } from "mongodb";
import { Controller } from "./Controller";
import { randomUUID } from "crypto";

const server = express();

let port = "12345";
let client: MongoClient;

const controler = new Controller();

server.use(json());

const startHttpServer = () => {
    server.get('/get/:id', async (request: Request, response: Response) => {
        const result = await controler.get(request.params.id, client);

        response.json(result);
    });

    server.post('/post', async (request: Request, response: Response) => {
        const body = request.body;

        const dto = {
            id: randomUUID(),
            value1: body.value1,
            value2: body.value2,
            value3: body.value3,
            value4: body.value4,
            value5: body.value5,
            value6: body.value6,
            value7: body.value7,
            value8: body.value8,
            value9: body.value9,
            value10: body.value10,
        }
        
        const result = await controler.post(dto, client);

        response.json(result);
    });
    
    server.listen(port, () =>
        console.info(`Http server listening on port ${port}`)
    );
}

const startMongoDb = async () => {
    client = await MongoClient.connect(
        "mongodb+srv://staging-beta:5e813fbf1384c55540aa6870ApLd@cluster-stg-bet.ku7b4.mongodb.net", 
        { maxPoolSize: 100 }
    )
}

(async () => {
    try {
        await startMongoDb();

        startHttpServer();
    } catch(error) {
        console.log(error);
    }
})();