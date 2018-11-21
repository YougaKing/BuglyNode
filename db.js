const mongodb = require("mongodb");
const issueList = 'issueList';
const crashMap = 'crashMap';

//MongoDB connection URL - mongodb://host:port/dbName
const dbHost = "mongodb://localhost:27017/";

//DB Object
let dbo;

//Connecting to the Mongodb instance.
//Make sure your mongodb daemon mongod is running on port 27017 on localhost
mongodb.MongoClient.connect(dbHost, function (err, db) {
    if (err) {

    } else {
        console.log("数据库已创建!");
    }
    dbo = db.db("buglynode");

    // dbo.collection("issueList").drop(function (err, delOK) {  // 执行成功 delOK 返回 true，否则返回 false
    //     if (err) {
    //         console.error(err);
    //         return
    //     }
    //     if (delOK) console.log("集合已删除");
    // });
});

function DB() {
}

module.exports = DB;

DB.insertIssueList = function (value) {
    dbo.collection(issueList).insertMany(value, function (err, res) {
        if (err) {
            console.error(err);
        }
    });
};

DB.queryIssueList = function (where, sort, callback) {
    dbo.collection(issueList).find(where).sort(sort).limit(1).toArray(function (err, result) {
        if (err) {
            console.error(err);
        }
        callback(result);
    });
};

DB.insertCrashList = function (value) {
    dbo.collection(crashMap).insertMany(value, function (err, res) {
        if (err) {
            console.error(err);
        }
    });
};