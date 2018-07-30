// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        console.error(`Unable to connect to MongoDB server`);
        return;
    }

    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');
    /* db.collection('Todos').find({ 
        _id: new ObjectID('5b553ae98985382d4ce1a1d7') 
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.error('Unable to fetch Todos', err);
    }); */
    /* db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
        
    }, (err) => {
        console.error('Unable to fetch Todos', err);
    }); */
    db.collection('Users').find({ name: 'rodrigo Juliani'}).toArray().then((users) => {
        console.log(`Found a total of ${users.length} users`);
        console.log(JSON.stringify(users, undefined, 2));
        
    }, (err) => {
        console.error('Unable to fetch Todos', err);
    });
    
});