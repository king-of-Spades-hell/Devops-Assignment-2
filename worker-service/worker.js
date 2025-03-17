const { MongoClient } = require('mongodb');
const uri = 'mongodb://mongo:27017';
const client = new MongoClient(uri);

async function fetchTasks() {
    try {
        await client.connect();
        const db = client.db('mydb');
        const tasks = await db.collection('tasks').find({}).toArray();
        console.log('Fetched tasks:', tasks);
    } catch (err) {
        console.error('Worker error:', err);
    } finally {
        await client.close();
    }
}

setInterval(fetchTasks, 10000);
