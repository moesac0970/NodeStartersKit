import { ClientRequest, createServer, ServerResponse } from 'http';
import { readFile, readFileSync } from 'fs';
import { error } from 'console';
import { URL } from 'url';
import { type } from 'os';
import express from 'express';


const errorCode404 = {
  "statusCode": 404,
  "error": "Not Found"
}

// use the process api to get the env vars
const env = { port: process.env.PORT};

// use the build in api for accessing the filesystem
// !!!! attention when constructing an url, give regard to the relativity of its path
// in this case the node server will not know whats outside its own filestructure and throw an enoent error
// constructing an url with the meta.url property will solve this problem
const dataFromPersons = await readFileSync(new URL('../resources/db.json', import.meta.url), {
                      encoding: 'utf-8',
                    });

// this person class is defined to give structure to the internal structure of the json
interface Person {
  id: string,
  firstName : string,
  lastName : string
}

// adding an interface to help with extracting data from the array
interface DbPersons{
  persons:Person[]
}
// parsing data is done, in this case with the json api, PARSE
const persons : DbPersons = JSON.parse(dataFromPersons);


const app = express();

app.listen(3000, () => {
  console.log(`The application is listening on port ${env.port}!`);
})


// Persons api endpoint
app.get('/persons', (req:express.Request, res:express.Response) => {
      console.log(`request send to endpoint ${req.url}`);
      res.send(persons);
    });

app.get('/*', (req:express.Request, res:express.Response, next) => {
      setTimeout( () => {
        try {
          throw new Error('404')
        } catch (err) {
          next(`statuscode: ${errorCode404.statusCode}. message ${errorCode404.error} `)

        }
      }, 100)
    })


















const person = {
  "persons": [
    {
      "id": "3c0371d6-2a9d-4896-a225-973c56a72a26",
      "firstName": "Tom",
      "lastName": "Marien"
    },
    {
      "id": "d4dcca0c-6480-4d8a-8174-4a2f928a6ff7",
      "firstName": "Peter",
      "lastName": "Cosemans"
    },
    {
      "id": "67bb9460-5d4b-414a-ad81-9d25dcdbe759",
      "firstName": "Wart",
      "lastName": "Claes"
    }
  ]
}
