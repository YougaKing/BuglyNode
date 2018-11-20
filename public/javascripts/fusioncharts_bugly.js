let chartData;

const template = require('Handlebars').template;

$(function () {
    console.error('function');
    $.ajax({

        url: 'http://localhost:3300/chart',
        type: 'GET',
        success: function (data) {
            chartData = data;
            const template = template.compile($("#tabular-template").html());
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
                type: 'msline',
                renderAt: 'chart-location',
                width: '1000',
                height: '600',
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
});
