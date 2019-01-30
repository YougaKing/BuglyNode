const mongodb = require("mongodb");
const dbName = 'buglynode';
const issueList = 'issueList';
const crashMap = 'crashMap';
const versionList = 'versionList';

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
    dbo = db.db(dbName);

    // dbo.collection(issueList).drop(function (err, delOK) {
    //     if (err) {
    //         console.error(err);
    //         return
    //     }
    //     if (delOK) console.log(issueList + "集合已删除");
    // });
    // dbo.collection(crashMap).drop(function (err, delOK) {  // 执行成功 delOK 返回 true，否则返回 false
    //     if (err) {
    //         console.error(err);
    //         return
    //     }
    //     if (delOK) console.log(crashMap + "集合已删除");
    // });
});

function DB() {
}

module.exports = DB;

DB.insertVersionList = function (value) {
    dbo.collection(versionList).drop(function (err, delOK) {
        if (err) {
            console.error(err);
            return
        }
        dbo.collection(versionList)
            .insertMany(value, function (err, res) {
                if (err) {
                    console.error(err);
                }
            });
    });
};

DB.queryVersionList = function (callback) {
    dbo.collection(versionList).find({}).toArray(function (err, result) {
        if (err) {
            console.error(err);
        }
        callback(result);
    });
};

DB.insertIssueList = function (value) {
    dbo.collection(issueList)
        .insertMany(value, function (err, res) {
            if (err) {
                console.error(err);
            }
        });
};

DB.queryIssueList = function (where, sort, callback) {
    dbo.collection(issueList)
        .find(where).sort(sort)
        .limit(1)
        .toArray(function (err, result) {
            if (err) {
                console.error(err);
            }
            callback(result);
        });
};

DB.insertCrashMap = function (value) {
    dbo.collection(crashMap)
        .insertOne(value, function (err, res) {
            if (err) {
                console.error(err);
            }
        });
};

DB.queryCrashMapTop = function (where, callback) {
    dbo.collection(crashMap)
        .aggregate()
        .match(where)
        .group({
            _id: "$issueId",//要聚合的字段 类group by
            count: {$sum: 1},
            list: {$push: "$$ROOT"}
        })
        .sort({count: -1})
        .limit(20)
        .toArray(function (err, result) {
            if (err) {
                console.error(err);
                return;
            }
            callback(result);
        });
};

DB.queryCrashMapAll = function (where, callback) {
    dbo.collection(crashMap)
        .aggregate()
        .match(where)
        .toArray(function (err, result) {
            if (err) {
                console.error(err);
                return;
            }
            callback(result);
        });
};