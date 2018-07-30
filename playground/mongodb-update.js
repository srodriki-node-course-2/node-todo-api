// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        console.error(`Unable to connect to MongoDB server`);
        return;
    }
    const db = client.db('TodoApp');
    // findOneAndUpdate

    /* db.collection('Todos').findOneAndUpdate({
        text: 'Eat Lunch'
    }, {
        $set: { 
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    }); */

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b553be6d77bd433ace66f37')    
    }, {
        $inc: { age: 1 },
        $set: { name: 'Juan' }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    })
});