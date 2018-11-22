'use strict';


(function () {
    $.ajax({
        url: 'http://localhost:3000/chart',
        type: 'GET',
        success: function (data) {
            const template = Handlebars.compile($("#tabular-template").html());
            $("#table-location").html(template(data));

            const chartProperties = {
                'caption': data.version + '版本top20',
                'numberprefix': '',
                'xAxisName': '异常名称',
                'yAxisName': '崩溃次数'
            };

            const categoriesArray = [{
                "category": data["categories"]
            }];

            const lineChart = new FusionCharts({
                type: 'mscolumn2d',
                renderAt: 'chart-location',
                width: '100%',
                height: '100%',
                dataFormat: 'json',
                dataSource: {
                    chart: chartProperties,
                    categories: categoriesArray,
                    dataset: data['dataSet']
                }
            });
            lineChart.render();
        }
    });
}());
