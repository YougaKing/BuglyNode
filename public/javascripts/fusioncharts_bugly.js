'use strict';


let chartData;
(function () {
    $.ajax({
        url: 'http://localhost:3000/chart',
        type: 'GET',
        success: function (data) {
            chartData = data;
            const template = Handlebars.compile($("#tabular-template").html());
            $("#table-location").html(template(data));

            const chartProperties = {
                "caption": "Variation of Petrol and Diesel price in Bangalore",
                "numberprefix": "Rs",
                "xAxisName": "Month",
                "yAxisName": "Price"
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
                    dataset: data["dataset"]
                }
            });
            lineChart.render();
        }
    });
}());
