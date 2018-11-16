const token = '1980006692';
const host = 'https://bugly.qq.com';

const cheerio = require('cheerio');
const request = require('superagent');
const file = require("./file.js");

function getIssueList(page, version, res, next) {

    const start = page * 50;
    const path = '/v2/issueList?';

    const params = 'start=' + start +
        '&searchType=errorType' +
        '&exceptionTypeList=Crash,Native' +
        '&pid=1' +
        '&platformId=1' +
        '&sortOrder=desc' +
        '&rows=50' +
        '&sortField=crashCount' +
        '&appId=d98a6960d7' +
        '&fsn=3c13fcc5-99ae-4050-99f2-b352b93eec34' +
        (version ? ('&version=' + version) : '')
    ;

    const url = host + path + params;


    request.get(url)
        .set('X-token', token)
        .set('Accept', 'application/json;charset=utf-8')
        .set('x-csrf-token', 'Ab5m4ZeWsaOxNLuSVfT3OXdB')
        .set('User_Agent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Referer', 'https://bugly.qq.com/v2/crash-reporting/crashes/d98a6960d7?pid=1&sortField=crashCount&sortOrder=desc&start=0')
        .set('Accept-Encoding', 'gzip, deflate, br')
        .set('Accept-Language', 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7')
        .set('Cookie', 'btcu_id=ed70f24fdc9235e8bc045c4c55a836755aea9eb6b0dc6; pgv_pvi=1553976320; RK=kbSoz2plS0; ptcz=79a4069068d1673ba15d973f7e7aca9455f95abbde9b44625167c8361d34bbc6; pgv_pvid=1021383505; tvfe_boss_uuid=a9fb74b55ead28c8; o_cookie=451477973; _ga=GA1.2.877053183.1526950312; vc=vc-e5e3e667-5be2-4463-8c1d-2bc4dc3133d7; btcu_id=fbe3a52d-887e-4f0b-87eb-8248ec69fbe2; pac_uid=1_451477973; ptui_loginuin=451477973; pt2gguin=o0451477973; luin=o0451477973; lskey=000100006ccfc114d1c01a0a84922fe0c2be44e9a1fe3ac4e267cd91169aaa4da2eec75cb58f0c898619634d; _gid=GA1.2.1733470217.1542185609; token-skey=8fff1338-e3d7-e9b0-f780-12b5619779e3; token-lifeTime=1542349590; pgv_si=s4446401536; _qpsvr_localtk=0.8575546452372875; ptisp=cm; uin=o0451477973; skey=@XgnZEz8wT; NODINX_SESS=oXphL4SG33RFOFs0wn11E7ca2x44k2F3mZqGr2VVeAS2Z51fVNexYfzmboXxYu5g; csrfToken=Ab5m4ZeWsaOxNLuSVfT3OXdB; _gat=1; bugly_session=eyJpdiI6Ikxzd0RjZlE2NDNiSkhmWWtySTBJOWc9PSIsInZhbHVlIjoiaEswTWJcL0JLMFo5QUkxNndMUGw4V08yM0VJQllxK3pscDBrN0s5T3lrcFBkVGNxTEQ1eUQ4clZxb25jT2ZHQ0pGZno0MjJmY3R4N3VtelFPWnlsTDBnPT0iLCJtYWMiOiIwZTYzZTllMTgwYzFhMzk2OGEwOTk2Zjk1ZTA2YjdhY2I5ZjUzYzJlOTg2N2QzZmU4MTU1ZTI5ZjI4YWFiMWFiIn0%3D; referrer=eyJpdiI6ImllTVVpRTEzZWdLd2Y4U2pnTEV3N0E9PSIsInZhbHVlIjoidVZCVG5oK2FZSG1uenYxWDR5VldzTHZJcERrcG9mNFlnek1Rbmh3Vkc3YkhwQjZkSzdTa1BuT0FicUc3alFSSzV4VzA0K1FXUGY3cjNidHlkUFIxRlwvQm1qeGc5c2dWS1FnQ0NPcnV3K2dkbTNzMWVnenVLaVhZUitjM0NLSkdKVVdFd2RiM1lyS3NPWkpWaGhNMHlIU0ZZSHdMZG5LcFNUUTh6VkdEVklUVT0iLCJtYWMiOiI2ZDYzNzAxYmM1MWU2NmJjZmY1YzM3MjQxY2M4ZmVmMWQ3ZmM5YzAyY2VlZDNmYTliYzA4NjdlZmM1YTdkMDFiIn0%3D; vc=vc-6a81432d-d4be-4bca-a23c-9a286c2cc0b3; vc.sig=RzhW6CaM14JQr8MzkayGZMUlgwg1CaBD56cUWNdJV1s')
        .end(function (err, response) {

            if (err) {
                return next(err);
            }

            const obj = JSON.parse(response.text);

            if (obj.code === 200 && typeof(obj.ret) !== 'undefined' && typeof(obj.ret.issueList) !== 'undefined') {
                file.writeIssueList(page, version, response.text);
                if (obj.ret.issueList.length <= 0) {
                    res.send('共' + page + '数据');
                } else {
                    getIssueList(page + 1, version, res, next)
                    // for (i in obj.ret.issueList) {
                    const issue = obj.ret.issueList[0];
                    getCrashList(0, issue.issueId, res);
                    // }
                }
            } else {
                res.send(obj);
            }
        });
}


function getCrashList(page, issueId, res) {

    const start = page * 50;
    const path = '/v2/crashList?';

    const params = 'start=' + start +
        '&searchType=detail' +
        '&exceptionTypeList=Crash,Native,ExtensionCrash' +
        '&pid=1' +
        '&platformId=1' +
        '&issueId=' + issueId +
        '&rows=50' +
        '&sortField=crashCount' +
        '&appId=d98a6960d7' +
        '&fsn=4f3e9e73-8b58-418c-806d-6443493dcda1'
    ;

    const url = host + path + params;


    request.get(url)
        .set('X-token', token)
        .set('Accept', 'application/json;charset=utf-8')
        .set('x-csrf-token', 'Ab5m4ZeWsaOxNLuSVfT3OXdB')
        .set('User_Agent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Referer', 'https://bugly.qq.com/v2/crash-reporting/crashes/d98a6960d7/94595/report?pid=1&rows=50&start=0')
        .set('Accept-Encoding', 'gzip, deflate, br')
        .set('Accept-Language', 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7')
        .set('Cookie', 'btcu_id=ed70f24fdc9235e8bc045c4c55a836755aea9eb6b0dc6; pgv_pvi=1553976320; RK=kbSoz2plS0; ptcz=79a4069068d1673ba15d973f7e7aca9455f95abbde9b44625167c8361d34bbc6; pgv_pvid=1021383505; tvfe_boss_uuid=a9fb74b55ead28c8; o_cookie=451477973; _ga=GA1.2.877053183.1526950312; vc=vc-e5e3e667-5be2-4463-8c1d-2bc4dc3133d7; btcu_id=fbe3a52d-887e-4f0b-87eb-8248ec69fbe2; pac_uid=1_451477973; ptui_loginuin=451477973; pt2gguin=o0451477973; luin=o0451477973; lskey=000100006ccfc114d1c01a0a84922fe0c2be44e9a1fe3ac4e267cd91169aaa4da2eec75cb58f0c898619634d; _gid=GA1.2.1733470217.1542185609; token-skey=8fff1338-e3d7-e9b0-f780-12b5619779e3; token-lifeTime=1542349590; pgv_si=s4446401536; _qpsvr_localtk=0.8575546452372875; ptisp=cm; uin=o0451477973; skey=@XgnZEz8wT; NODINX_SESS=oXphL4SG33RFOFs0wn11E7ca2x44k2F3mZqGr2VVeAS2Z51fVNexYfzmboXxYu5g; csrfToken=Ab5m4ZeWsaOxNLuSVfT3OXdB; _gat=1; bugly_session=eyJpdiI6Ikxzd0RjZlE2NDNiSkhmWWtySTBJOWc9PSIsInZhbHVlIjoiaEswTWJcL0JLMFo5QUkxNndMUGw4V08yM0VJQllxK3pscDBrN0s5T3lrcFBkVGNxTEQ1eUQ4clZxb25jT2ZHQ0pGZno0MjJmY3R4N3VtelFPWnlsTDBnPT0iLCJtYWMiOiIwZTYzZTllMTgwYzFhMzk2OGEwOTk2Zjk1ZTA2YjdhY2I5ZjUzYzJlOTg2N2QzZmU4MTU1ZTI5ZjI4YWFiMWFiIn0%3D; referrer=eyJpdiI6ImllTVVpRTEzZWdLd2Y4U2pnTEV3N0E9PSIsInZhbHVlIjoidVZCVG5oK2FZSG1uenYxWDR5VldzTHZJcERrcG9mNFlnek1Rbmh3Vkc3YkhwQjZkSzdTa1BuT0FicUc3alFSSzV4VzA0K1FXUGY3cjNidHlkUFIxRlwvQm1qeGc5c2dWS1FnQ0NPcnV3K2dkbTNzMWVnenVLaVhZUitjM0NLSkdKVVdFd2RiM1lyS3NPWkpWaGhNMHlIU0ZZSHdMZG5LcFNUUTh6VkdEVklUVT0iLCJtYWMiOiI2ZDYzNzAxYmM1MWU2NmJjZmY1YzM3MjQxY2M4ZmVmMWQ3ZmM5YzAyY2VlZDNmYTliYzA4NjdlZmM1YTdkMDFiIn0%3D; vc=vc-6a81432d-d4be-4bca-a23c-9a286c2cc0b3; vc.sig=RzhW6CaM14JQr8MzkayGZMUlgwg1CaBD56cUWNdJV1s')
        .end(function (err, response) {

            if (err) {
                return next(err);
            }
            const obj = JSON.parse(response.text);

            if (obj.code === 200) {
                res.send(obj);
                // file.writeIssueList(page, version, response.text);
                // if (obj.ret.issueList.length <= 0) {
                //     res.send('共' + page + '数据');
                // } else {
                //     getIssueList(page + 1, version, res, next)
                //
                //     for (i in obj.ret.issueList) {
                //         const issue = obj.ret.issueList[i];
                //         getCrashList(0, issue.issueId);
                //     }
                // }
            } else {
                res.send(obj);
            }
        });
}

module.exports = {
    getIssueList
};