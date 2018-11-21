const token = '1821107426';
const appId = 'd98a6960d7';
const host = 'bugly.qq.com';
const baseUrl = 'https://' + host;

const headers = {
    'Host': host,
    'Connection': 'keep-alive',
    'X-token': token,
    'Accept': 'application/json;charset=utf-8',
    'x-csrf-token': 'r8i_HF8OuXNOq5LId51SlQZK',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
    'Content-Type': 'application/json;charset=utf-8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cookie': 'pgv_pvi=1512451072; _ga=GA1.2.783254942.1539094158; btcu_id=d20fefd45e8e861c562af366cbf891b55bbcb68ff0018; ptui_loginuin=451477973; pt2gguin=o0451477973; RK=TSTgnUpUE0; ptcz=acf2c37e7aba43ff7bd996dcef1f38bb73c7cbf44e990667afcfd1258e4bd09d; vc=vc-a72c2ea9-7854-47ca-9e5d-e89b34b58630; vc.sig=B98fDS1eLwALUlSD94_exbuVtQ9zPB6HD-__Okyp3ss; tvfe_boss_uuid=1c91433946473eb6; pgv_pvid=65861837; o_cookie=451477973; token-skey=47915048-1f85-8b36-69c9-0af11072d524; token-lifeTime=1542826333; _gid=GA1.2.843645078.1542808331; _gat=1; pgv_si=s8318619648; _qpsvr_localtk=0.6773126282688078; ptisp=ctc; uin=o0451477973; skey=@RwkTDA7cj; NODINX_SESS=hzZOKZnGEpkB5rZUubHL6bL7ndan47zvBeD73780FRfRHmrMvzxrcWw0rF5-HP7l; csrfToken=r8i_HF8OuXNOq5LId51SlQZK; referrer=eyJpdiI6InRsaE1JMHdlb2dOblh3YTdYMGQyUVE9PSIsInZhbHVlIjoid1JUR3ZtcHZyclFvWG9odlp0XC93WXBZT3h2bjRcL0JJcG5LR1ZMaXpIQ0NzQWtHaVhPQVdaa1FIUGVuMlVEZGxLZ3ZLMzNodThNRG9GMDhRYytSemJFMzJsSUFQVzNnNEZiQnVDRnk2T3FpbzUzUmVqeU5oamUxMHdLRFR4bU9rdk1naktSU1RcL0JnUkRJMHlXcXFEeXY4d2ExRlhEeDlJVE5FeUlpZ2VlTjBzPSIsIm1hYyI6IjcyZDJhNTRiZTFlZDA0ZmQ0OTYwMjU4YzRkNGI2NGU5MmZmYTgxODFlYTNkMDE0ZmI0MzY5ZDg2MmIyM2EwYWMifQ%3D%3D; bugly_session=eyJpdiI6ImtTc0VsYU9lSHdzakl2Y3Bzcnl1eHc9PSIsInZhbHVlIjoiUXVHNkNacjcxeVNsZFYrT0dGdGwzS0lVNlJiaE8rWjZZQ2wyQWNpdlJzNWFtd1hycFhyNlwvSHFjekRUT0cyNkZaMDBzd1hNRmJYcXA3dnZxSXdxRTZBPT0iLCJtYWMiOiI1ZjdiZWVmZTQ3YjQ4N2UxZGQxNmM4ZjI4Yjk1YzMyYzBjODYyZjI3MTQwNDE4MDg2ODdlZTY3YTFlY2RkNTM4In0%3D'
};

const db = require('./db.js');
const request = require('superagent');

function Bugly() {
}

module.exports = Bugly;

Bugly.getIssueListForUploadTime = function (start, version) {
    this.getIssueList(start, 'asc', 'uploadTime', version)
};

Bugly.getIssueList = function (start, sortOrder, sortField, version,) {

    const path = '/v2/issueList?';

    const params = 'start=' + start +
        '&searchType=errorType' +
        '&exceptionTypeList=Crash,Native' +
        '&pid=1' +
        '&platformId=1' +
        '&sortOrder=' + sortOrder +
        '&rows=10' +
        '&sortField=' + sortField +
        '&appId=' + appId +
        '&fsn=3c13fcc5-99ae-4050-99f2-b352b93eec34' +
        (version ? ('&version=' + version) : '')
    ;

    const url = baseUrl + path + params;

    console.log(url);

    request.get(url)
        .set(headers)
        .end(function (err, response) {
            if (err) {
                console.error(err);
                return;
            }
            const obj = JSON.parse(response.text);
            if (isIssueListAvailable(obj)) {

                let issueList = obj.ret.issueList;
                let index = start;

                issueList.forEach(function (issue) {
                    issue._id = issue.issueId;
                    index++;
                    issue.index = index;
                    Bugly.getCrashList(0, issue, version)
                });

                db.insertIssueList(issueList)
            } else {
                console.error(obj)
            }
        });
};

Bugly.getCrashList = function (start, issue, version) {

    const path = '/v2/crashList?';

    const params = 'start=' + start +
        '&searchType=detail' +
        '&exceptionTypeList=Crash,Native,ExtensionCrash' +
        '&pid=1' +
        '&platformId=1' +
        '&issueId=' + issue.issueId +
        '&rows=10' +
        '&appId=' + appId +
        '&fsn=3c13fcc5-99ae-4050-99f2-b352b93eec34' +
        (version ? ('&version=' + version) : '')
    ;

    const url = baseUrl + path + params;

    console.log(url);

    request.get(url)
        .set(headers)
        .end(function (err, response) {
            if (err) {
                console.error(err);
                return;
            }
            const obj = JSON.parse(response.text);
            if (isCrashListAvailable(obj)) {
                let crashDatas = obj.ret.crashDatas;
                for (let key in crashDatas) {
                    Bugly.getCrashDoc(crashDatas[key])
                }
            } else {
                console.error(obj)
            }
        });
};

Bugly.getCrashDoc = function (crashData) {

    const path = '/v2/crashDoc/appId/' + appId + '/platformId/1/crashHash/' + crashData.id + '?';

    const params = 'fsn=3c13fcc5-99ae-4050-99f2-b352b93eec34';

    const url = baseUrl + path + params;

    console.log(url);

    request.get(url)
        .set(headers)
        .end(function (err, response) {
            if (err) {
                console.error(err);
                return;
            }
            const obj = JSON.parse(response.text);
            if (isCrashDocAvailable(obj)) {
                let crashMap = obj.ret.crashMap;
                crashMap._id = crashMap.crashId;
                db.insertCrashMap(crashMap);
            } else {
                console.error(obj)
            }
        });
};

function isIssueListAvailable(obj) {
    return (obj.status === 200) && typeof(obj.ret) !== 'undefined' && typeof(obj.ret.issueList) !== 'undefined' && obj.ret.issueList.length > 0;
}

function isCrashListAvailable(obj) {
    return (obj.status === 200) && typeof(obj.ret) !== 'undefined' && typeof(obj.ret.crashDatas) !== 'undefined';
}

function isCrashDocAvailable(obj) {
    return (obj.status === 200) && typeof(obj.ret) !== 'undefined' && typeof(obj.ret.crashMap) !== 'undefined';
}