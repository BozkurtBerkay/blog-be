const mongoose = require('mongoose');

const db = mongoose.connection;

db.once('open', (err, db) => {
    if(err) return console.log(err);

    console.log(`MongoDB'ye bağlanıldı...`);
})

const connectMongoDB = async () => {
    await mongoose.connect(`${process.env.MONGODB_URL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = {
    connectMongoDB
}

