'use strict';


(function () {
    // let version = ${version};

    $.ajax({
        url: 'http://localhost:3000/chart?type=top',
        type: 'GET',
        success: function (data) {
            const template = Handlebars.compile($("#tabular-template").html());
            $("#table-location").html(template(data));

            const chartProperties = {
                'caption': data.version + '版本top20',
                'numberprefix': '',
                // 'xAxisName': '异常名称',
                'yAxisName': '崩溃次数',
                "numvisibleplot": "2",
                "labeldisplay": "auto",
                "theme": "fusion"
            };

            const categoriesArray = [{
                "category": data["categories"]
            }];

            const lineChart = new FusionCharts({
                type: 'mscolumn2d',
                renderAt: 'topChart-location',
                width: '100%',
                height: '400',
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

    $.ajax({
        url: 'http://localhost:3000/chart?type=all',
        type: 'GET',
        success: function (data) {
            const template = Handlebars.compile($("#tabular-template").html());
            $("#table-location").html(template(data));

            const chartProperties = {
                'caption': data.version + '版本全部异常',
                'showlegend': '1',
                'showpercentvalues': '1',
                'legendposition': 'bottom',
                'usedataplotcolorforlabels': '1',
                'theme': 'fusion'
            };

            const lineChart = new FusionCharts({
                type: 'pie2d',
                renderAt: 'allChart-location',
                width: '100%',
                height: '400',
                dataFormat: 'json',
                dataSource: {
                    chart: chartProperties,
                    data: data['data']
                }
            });
            lineChart.render();
        }
    });
}());
