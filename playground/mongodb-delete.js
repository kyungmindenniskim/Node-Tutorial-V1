const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect MongdoDB server');
  }
  console.log('Connected to MongoDB server');

  // // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });
  // // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });
  //
  // // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Users').deleteMany({name: 'Kyungmin Kim'}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log(err);
  // });

  // db.collection('Users').findOneAndDelete({
  //   _id: new ObjectID("idididididiid")
  // }).then((result) => {
  //   console.log(JSON.stringify(result, undefined, 2));
  // });

  //db.close();
});
