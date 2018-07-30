// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        console.error(`Unable to connect to MongoDB server`);
        return;
    }
    const db = client.db('TodoApp');
    // deleteMany
    /*db.collection('Todos').deleteMany({ text: 'Eat lunch'}).then((result) => {
        console.log(result);
    });*/

    // deleteOne
    /*db.collection('Todos').deleteOne({ text: 'Eat Lunch'}).then((result) => {
        console.log(result);
    })*/
    // findOneAndDelete
    /* db.collection('Todos').findOneAndDelete({ completed: false }).then((result) => {
        console.log(result);
    }); */

    db.collection('Users').deleteMany({ name: 'rodrigo Juliani'}).then((result) => {
        console.log(result);
    })

    db.collection('Users').findOneAndDelete({ _id: new ObjectID('5b553dca4be3a517686eb1b4')}).then((result) => {
        console.log('Deleted Mike: ', result);
    })
});