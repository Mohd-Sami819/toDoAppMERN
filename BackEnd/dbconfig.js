import { MongoClient } from "mongodb"
const url = "mongodb+srv://shami_db_user:Shami%405614@cluster0.t76hqs4.mongodb.net/?appName=Cluster0"
const dbName = "node-project"
export const collectionName = "todo"
 const client = new MongoClient(url)
export const connection = async () =>{
    const connect = await client.connect();
    return await connect.db(dbName)
}