const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const uri = 'mongodb://mongo:27017';
const client = new MongoClient(uri);

app.get('/tasks', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('mydb');
        const tasks = await db.collection('tasks').find({}).toArray();
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching tasks');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Web service running at http://localhost:${port}`);
});
