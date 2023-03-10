import { MongoClient } from 'mongodb';

let db = undefined;
const appDatabaseName = "todos-express";
const username = "fe22-edu-db-mongo";
const password = "jD1RQ3zgvGGKKkIu";

export function fetchCollection(name) {
  return fetchDatabase().collection(name);
}

function fetchDatabase() {
  if (db != undefined) {
    return db;
  }

  const url = `mongodb+srv://${username}:${password}@fe22-cluster.roofn23.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);

  db = client.db(appDatabaseName); // Samling av collections (skapas dynamisk, har ej skapats explicit i atlas)

  return db;
}