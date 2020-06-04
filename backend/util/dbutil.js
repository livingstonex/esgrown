const mongoose = require("mongoose");

const initClientDbConnection = () => {
    const db = mongoose.createConnection(`mongodb://127.0.0.1:27017`, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

    // connect to mongoDB using mongoose
    // const db = mongoose.createConnection(`mongodb+srv://larnapp:larnapp@cluster0-w4hmf.mongodb.net/test?retryWrites=true&w=majority`,
    //     { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    //     .then(() => console.log("MongoDB successfully connected"))
    //     .catch(err => console.log(err));

    db.on("error", console.error.bind(console, "MongoDB Connection Error >> : "));
    db.once("open", function () {
        console.log("client MongoDB Connection ok!");
    });
    return db;
};

module.exports = {
    initClientDbConnection
};