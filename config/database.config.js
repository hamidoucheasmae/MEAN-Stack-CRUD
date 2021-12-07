

module.exports = {
    url: 'mongodb+srv://ah-user:ah-user@cluster0.y8kt0.mongodb.net/test-crud?retryWrites=true&w=majority'
}

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://ah-user:ah-user@cluster0.y8kt0.mongodb.net/test-crud?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();