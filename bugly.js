const appId = 'd98a6960d7';
const rows = 10;
const host = 'bugly.qq.com';
const baseUrl = 'https://' + host;

const token = '97903863';
const x_csrf_token = '1g7jQ3CU693pBkR1f74g_dvS';
const cookie = 'btcu_id=ed70f24fdc9235e8bc045c4c55a836755aea9eb6b0dc6; pgv_pvi=1553976320; RK=kbSoz2plS0; ptcz=79a4069068d1673ba15d973f7e7aca9455f95abbde9b44625167c8361d34bbc6; pgv_pvid=1021383505; tvfe_boss_uuid=a9fb74b55ead28c8; o_cookie=451477973; _ga=GA1.2.877053183.1526950312; vc=vc-e5e3e667-5be2-4463-8c1d-2bc4dc3133d7; btcu_id=fbe3a52d-887e-4f0b-87eb-8248ec69fbe2; pac_uid=1_451477973; ptui_loginuin=451477973; _gid=GA1.2.101201627.1548723587; connect.sid=s%3AFzLHHLuONIkJKmAvpXw_iOuQ-QPIJCZi.bgpLSQH3qdiHJis1TCIqSU3D9bbuqsI9iVKXEtgeD5U; token-lifeTime=1548830787; token-skey=bf41f613-f827-4da3-a5a2-56e67b9ef5d9; pgv_si=s3206441984; _qpsvr_localtk=0.5007906764188488; ptisp=cnc; csrfToken=1g7jQ3CU693pBkR1f74g_dvS; NODINX_SESS=ed8sMQhEkFUEzaTQ_DKaqm1wfyjnOXxhFZJ8zLyqrtnWjbz-ge_NxOP1AEZ0JgmW; vc=vc-87b53b98-425c-4b13-b9b2-d5d131a43bfa; vc.sig=K_Q9V-bXYKZer89eXRqcl7c0xZJCEkhmdVrDbrXdfUw; bugly_session=eyJpdiI6IloxU3hTelo3SzZ6SkJnOWJSR3JFMEE9PSIsInZhbHVlIjoiZ2MzZU56cHpDZnJvbW1YNlVwZlpkXC9nVWU4ZjhkOWJLQkNycVArMURTYkdUeXF1MDdiVHo2d0tUc25DUnlzcUFGdlM1Q0dCY0s4WXlsS01aYlQxRDhBPT0iLCJtYWMiOiJlNGRhY2Q5Njc1ODBhYmMyZTU5MDc4N2IzMTRmMzhhZTMyNGQ4OGY0NzJiZmZiMTYwODUwYTVlYTc2YzgyNjMzIn0%3D; referrer=eyJpdiI6InJMT0VsN3loN3IwK2x3azhabXlVbmc9PSIsInZhbHVlIjoiQWh2dlhJUGRPeFY1dENoR3dTTFNHSXQxTXp4SFl5UlIyV0pOdHdweGFFbU0xclA1bjNlbkZqY3J5NEoxSUZlWlhET3VcL3ZPNitDWXordCtCSWtZU1NmMFlkc2d0TGlibzJjV0JOalFcL01kWEJQM1VwamtCY3JLYWdaNkVGdTZHMVFRU0Q3dUJmcmlBdTZRNVUrTmlcL1VsdEQycFwvS3RDSytWR0JWOWxBQXNyeWFkOUlFTnlxUThpS2g5WUVOcWl4Kzc4c2dKZEV1aFhROEdoWjM3OWtjam4razFqaFZiZlZRR1hoVGkzRGlKRldZTWUzeTh3K0RsZGZKMW5tVXdFN1BNQjlySzVDRWdlU3Z1YmNUd1RLZkpmWlExNm5nMUw0aUNqYnZpTFRXTGljUnpZTVlJakszQ2NkbXA3aHhzUlwvM3pvZkpjM1J5MlRaaFJGVlZcL1dIU3A2cGc3K2lGZGJ3b3U0cERlMFBTMkU3MUxVU0pyejQyaDVvMm15dmNqTmJ6ZzJYME1kemU5NFwvYVQ2YVwvQXQ4YXVOOGRQem9WRmZJZEJFUGY2SnVsRXI0dUFHWmM0T2cwcGhMSWpQdXJTUUxGbDIyRzc1enhDbU5nOXRGYStuMXV3Ukg2Yk5VZ2hXTUlGOUY5cTZTMTJjaVc5TXdoRk5yaGVsc3hDeWwrVlo0SzRaaVNPelRubTJLakM1eFpSNmFvNzJPK0plT25JTWZVUDQzcXhXTmZFenh2Zjd0bGpDcDJFZElyeTRXcDg2MFpKczhOTjgzRnNXVnpobDBaUXNvdnd2VkQzeUxSVTZqUGU5Q2hEOHRuN0FObytvbGFybytQbStXM1hHMmFIMU9LWXZCTjk0RDlxQU52YnVFcnZERGF1RWtIU21MWVJQVTlcL2pHVXFKV3A5QndXUm9pY21mVGZTa2hITjlWQ1BuQ0k0cUVmeWdxcExRYSt6bWVFRHBKNjFRPT0iLCJtYWMiOiJjMWMzZDQyNTk5YWE5ZDU3ZjBiNGY2NzZmYjMyNmEwYmU3YWY3YmUwYWQ1MjZiYWE4OWI5ODY4ZTc4ZDYyNzM5In0%3D';

const headers = {
    'Host': host,
    'Connection': 'keep-alive',
    'X-token': token,
    'Accept': 'application/json;charset=utf-8',
    'x-csrf-token': x_csrf_token,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
    'Content-Type': 'application/json;charset=utf-8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cookie': cookie
};

const db = require('./db.js');
const request = require('superagent');

function Bugly() {
}

module.exports = Bugly;

Bugly.getVersionList = function () {
    const path = '/v2/getSelector/appId/d98a6960d7/platformId/1?';
    const params = 'types=version,member,tag,channel' +
        '&fsn=3c13fcc5-99ae-4050-99f2-b352b93eec34'
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
            try {
                const versionList = obj['ret']['versionList'];
                if (versionList.length === 0) {
                    return
                }
                db.insertVersionList(versionList);
            } catch (err) {
                console.log(err)
            }
        });
};

Bugly.getIssueListForUploadTime = function (start, version) {
    Bugly.getIssueList(start, 'asc', 'uploadTime', version)
};

Bugly.getIssueList = function (start, sortOrder, sortField, version,) {
    const path = '/v2/issueList?';
    const params = 'start=' + start +
        '&searchType=errorType' +
        '&exceptionTypeList=Crash,Native' +
        '&pid=1' +
        '&platformId=1' +
        '&sortOrder=' + sortOrder +
        '&rows=' + rows +
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

            try {
                let issueList = obj['ret']['issueList'];
                if (issueList.length === 0) {
                    return
                }
                let index = start;
                if (issueList.length === 1) {
                    const issue = issueList[0];
                    issue._id = issue['issueId'];
                    index++;
                    issue.index = index;
                    Bugly.getLastCrashInfo(issue['issueId'])
                } else {
                    issueList.forEach(function (issue) {
                        issue._id = issue['issueId'];
                        index++;
                        issue.index = index;
                        Bugly.getCrashList(0, issue, version)
                    });
                }
                db.insertIssueList(issueList);

                if (issueList.length === rows) {
                    let issue = issueList[issueList.length - 1];
                    Bugly.getIssueListForUploadTime(issue.index, version);
                }
            } catch (err) {
                console.log(err)
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
        '&rows=' + rows +
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

            try {
                const crashDatas = obj['ret']['crashDatas'];
                let count = 0;
                let index = start;
                for (let key in crashDatas) {
                    count++;
                    index++;
                    Bugly.getCrashDoc(crashDatas[key]['crashHash'])
                }
                if (count === rows) {
                    Bugly.getCrashList(index, issue, version);
                }
            } catch (err) {
                console.log(err)
            }
        });
};

Bugly.getLastCrashInfo = function (issueId) {
    const path = '/v2/lastCrashInfo/appId/d98a6960d7/platformId/1/issues/' + issueId + '/crashDataType/undefined';
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
            try {
                const crashHash = obj['data']['crashHash'];
                Bugly.getCrashDoc(crashHash);
            } catch (err) {
                console.log(err)
            }
        });
};

Bugly.getCrashDoc = function (crashHash) {
    const path = '/v2/crashDoc/appId/' + appId + '/platformId/1/crashHash/' + crashHash + '?';
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
            try {
                const crashMap = obj['ret']['crashMap'];
                crashMap._id = crashMap['crashId'];
                db.insertCrashMap(crashMap);
            } catch (err) {
                console.log(err)
            }
        });
};