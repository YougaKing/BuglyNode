'use strict';

const URL = 'http://localhost:3000';


(function () {
    $.ajax({
        url: URL + '?type=versionList',
        type: 'GET',
        success: function (data) {
            const categories = [];

            data.forEach(function (item) {
                categories.push({'label': item['name']});
            });
            const response = {
                'categories': categories,
            };
            const template = Handlebars.compile($("#tabular-template").html());
            $("#table-version").html(template(response));
        }
    });
}());

function clickAction(td) {
    window.location.href = URL + '/crash?version=' + td.innerText;
}
