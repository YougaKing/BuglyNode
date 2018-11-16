const fs = require('fs');
const issueListDir = __dirname + '/temp/issueList';

function writeIssueList(page, version, json) {

    const data = Buffer.from(json);
    const dir = version ? (issueListDir + '/' + version + '/') : issueListDir;

    fs.mkdir(dir, function (error) {

    });

    const file = dir + '/' + page + '.json';

    fs.exists(file, function (exists) {
        if (exists) {
            fs.unlinkSync(file);
        }
        writeFile(file, data);
    });
}

function writeFile(file, data) {
    fs.writeFile(file, data, {flag: 'a'}, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('写入成功');
        }
    });
}

function readFile(page) {
    const file = issueListDir + '/' + page + '.json';
    fs.readFile(file, {flag: 'r+', encoding: 'utf8'}, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        const obj = JSON.parse(data);
        const length = obj.ret.issueList.length;
        console.log(obj.ret.issueList);
        console.log(length);

    });
}

module.exports = {
    writeIssueList,
    readFile
};