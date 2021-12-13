const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ah-user:ah-user@cluster0.y8kt0.mongodb.net/now-crud?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(db=>{
    console.log("mongodb connected")
}).catch( err => console.log(err))