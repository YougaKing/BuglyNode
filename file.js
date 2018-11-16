var fs = require('fs');

function writeIssueList(page, json) {

    var data = Buffer.from(json);

    var dir = __dirname + '/temp/issueList';

    var file = dir + '/' + page + '.json';

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

module.exports = {
    writeIssueList
};