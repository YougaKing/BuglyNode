const token = '1980006692';
const host = 'bugly.qq.com';
const baseUrl = 'https:' + host;

const headers = {
    'Host': host,
    'Connection': 'keep-alive',
    'X-token': token,
    'Accept': 'application/json;charset=utf-8',
    'x-csrf-token': 'c1TGe1plsg57LPvi_c94IYl2',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
    'Content-Type': 'application/json;charset=utf-8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cookie': 'btcu_id=ed70f24fdc9235e8bc045c4c55a836755aea9eb6b0dc6; pgv_pvi=1553976320; RK=kbSoz2plS0; ptcz=79a4069068d1673ba15d973f7e7aca9455f95abbde9b44625167c8361d34bbc6; pgv_pvid=1021383505; tvfe_boss_uuid=a9fb74b55ead28c8; o_cookie=451477973; _ga=GA1.2.877053183.1526950312; vc=vc-e5e3e667-5be2-4463-8c1d-2bc4dc3133d7; btcu_id=fbe3a52d-887e-4f0b-87eb-8248ec69fbe2; pac_uid=1_451477973; ptui_loginuin=451477973; pt2gguin=o0451477973; luin=o0451477973; lskey=000100006ccfc114d1c01a0a84922fe0c2be44e9a1fe3ac4e267cd91169aaa4da2eec75cb58f0c898619634d; _gid=GA1.2.203917385.1542588771; NODINX_SESS=FT89aMvdk4M3TRZ0yqr7OsjOEdZsqQqsmysfXpBVSUWmNnp8Xs77LAip1eTRXydd; csrfToken=c1TGe1plsg57LPvi_c94IYl2; token-skey=bb4a0443-db9d-71db-d37b-39c2b342611c; token-lifeTime=1542801015; vc=vc-30d1d705-a76c-4b68-8e34-86ea90e4fb62; vc.sig=O1yI_FLq3vvN6Dx8vJ9r1scKalQxTBZBl-UUXFRXW1o; _gat=1; bugly_session=eyJpdiI6ImxPVitwMXpXbDhDeEd6THZOejZ4T1E9PSIsInZhbHVlIjoiOVJieDZDS2IrWHM1aWVCUmVUMzNXa3huMHRkTVE2UHo2STNWbGFlOEk3SHF3WjN4eUJ5T1hYT0pzeDRNQXhDTTJReDZFMFd2WXkyanhqRnZsUkNXOXc9PSIsIm1hYyI6ImQ3ZmFmOGEwODU4Y2M1Y2JiMzY5YTM0NDYxMmQ0MWJkOGNmYTMzMTcwYTIyMjY4NTNlNTMwNmNmMmM5NmMwNTEifQ%3D%3D'
};

const db = require('./db.js');
const request = require('superagent');

function Bugly() {
}

module.exports = Bugly;

Bugly.getIssueListForUploadTime = function (version, res, next) {
    this.getIssueList(0, 'asc', 'uploadTime', version, res, next)
};

Bugly.getIssueList = function (page, sortOrder, sortField, version, res, next) {

    const start = page * 50;
    const path = '/v2/issueList?';

    const params = 'start=' + start +
        '&searchType=errorType' +
        '&exceptionTypeList=Crash,Native' +
        '&pid=1' +
        '&platformId=1' +
        '&sortOrder=' + sortOrder +
        '&rows=50' +
        '&sortField=' + sortField +
        '&appId=d98a6960d7' +
        '&fsn=3c13fcc5-99ae-4050-99f2-b352b93eec34' +
        (version ? ('&version=' + version) : '')
    ;

    const url = baseUrl + path + params;

    request.get(url)
        .set(headers)
        .end(function (err, response) {
            if (err) {
                return next(err);
            }
            const obj = JSON.parse(response.text);
            if (obj.isAvailable) {

            } else {
                res.send(obj);
            }
        });
};