const mongodb = require("mongodb");


//MongoDB connection URL - mongodb://host:port/dbName
const dbHost = "mongodb://localhost:27017/";

//DB Object
let dbo;

//Connecting to the Mongodb instance.
//Make sure your mongodb daemon mongod is running on port 27017 on localhost
mongodb.MongoClient.connect(dbHost, function (err, db) {
    if (err) {
        console.error(err);
    } else {
        console.log("数据库已创建!");
    }
    dbo = db.db("buglynode");
});

function DB() {
}

module.exports = DB;

