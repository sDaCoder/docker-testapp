import express from "express"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
dotenv.config();

const PORT = 5050;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);

//GET all users
app.get("/getUsers", async (_req, res) => {
    try {
        await client.connect(MONGO_URL);
        console.log('Connected successfully to server');
    
        const db = client.db("apnacollege-db");
        const data = await db.collection('users').find({}).toArray();
        
        client.close();
        res.send(data);
    } catch (error) {
        res.send(error)
    }
});

//POST new user
app.post("/addUser", async (req, res) => {
    try {
        const userObj = req.body;
        console.log(req.body);
        await client.connect(MONGO_URL);
        console.log('Connected successfully to server');
    
        const db = client.db("apnacollege-db");
        const data = await db.collection('users').insertOne(userObj);
        console.log("data inserted in DB");
        client.close();
        console.log(data);
        res.status(200).json({
            "success": true,
            "message": "User added successfully",
            data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "success": false,
            "message": "User not added",
            error: error.message
        });
    }
});


app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});