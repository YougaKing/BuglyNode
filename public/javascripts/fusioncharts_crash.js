'use strict';

const URL = 'http://localhost:3000';

//获取浏览器参数
function getUrlParams(name) {
    return (
        decodeURIComponent(
            (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
                location.href
            ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
    );
}

(function () {

    let version = getUrlParams('version');

    $.ajax({
        url: URL + '/crash?type=issueList&version=' + version,
        type: 'GET',
        success: function (data) {
            const categories = [];

            data.forEach(function (item) {
                categories.push({'label': '#' + item['issueId'] + '\t' + item['exceptionName']});
            });
            const response = {
                'categories': categories,
                'version': version,
            };
            const template = Handlebars.compile($("#tabular-template").html());
            $("#table-crash").html(template(response));
        }
    });
}());

function clickAction(td) {
    // window.location.href = URL + '/crash?version=' + td.innerText;
}
