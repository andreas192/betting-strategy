/**
 * Created by andreiluculescu on 6/23/17.
 */
var app = app || {};

(function ($) {
    'use strict';

    app.ChartView = Backbone.View.extend({

        initialize: function (params) {
            if (!_.isEmpty(params.dataTable)) {
                this.dataTable = params.dataTable;
            }
        },

        dataTable: [],

        render:function () {

            var dataTable = this.dataTable;
            $(this.el).html('<p>gviz line chart:</p>' +
                '<div id="gviz" style="width:600px; height:300px;"></div>');
            google.load('visualization', '1',  {'callback':this.drawVisualization,
                'packages':['linechart']});
            return this;
        },

        drawVisualization:function (dataTable) {

            console.log("In draw visualization");
            var data = new google.visualization.DataTable();
            data.addColumn('date', 'Date');
            data.addColumn('number', 'Column A');
            data.addColumn('number', 'Column B');
            data.addRows(4);
            data.setCell(0, 0, new Date("2009/07/01"));
            data.setCell(0, 1, 1);
            data.setCell(0, 2, 7);
            data.setCell(1, 0, new Date("2009/07/08"));
            data.setCell(1, 1, 2);
            data.setCell(1, 2, 4);
            var chart = new google.visualization.LineChart(this.$('#gviz').get(0));
            chart.draw(data, null, null);
        },

        getDataTable: function () {
            return this.dataTable;
        }

    });

})(jQuery);
