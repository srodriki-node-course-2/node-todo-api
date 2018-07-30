// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var objId = new ObjectID();
console.log('###', objId);

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        console.error(`Unable to connect to MongoDB server`);
        return;
    }

    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');
    /* db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.error(`Unable to insert todo`, err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    }); */
 /*    db.collection('Users').insertOne({
        name: 'rodrigo Juliani',
        age: 20,
        location: 'Las Piedras'
    }, (err, result) => {
        if (err) {
            return console.error(`Unable to insert todo`, err);
        }
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
        
    }); */

    client.close();
});