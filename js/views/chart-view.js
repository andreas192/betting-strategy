/**
 * Created by andreiluculescu on 6/23/17.
 */
var app = app || {};

(function ($) {
    'use strict';

    app.ChartView = Backbone.View.extend({

        el: '#chart',

        initialize: function (params) {
            if (!_.isEmpty(params.dataTable)) {
                this.dataTable = params.dataTable;
            }
        },

        dataTable: [],

        render:function () {

            var dataTable = this.dataTable;
            $(this.el).html('<div id="gviz"></div>');
            google.load('visualization', '1',  {'callback':this.drawVisualization,
                'packages':['corechart', 'line']});
            return this;
        },

        drawVisualization:function (dataTable) {
            var data = new google.visualization.DataTable();
            var dataValues = app.Bets.getDataTable();

            data.addColumn('number', 'Bet Value');
            data.addColumn('number', 'Current Winnings');

            data.addRows(dataValues);

            var options = {
                hAxis: {
                    title: 'Bet Value',
                    logScale: false
                },
                vAxis: {
                    title: 'Current Winnings',
                    // viewWindowMode: 'explicit',
                    viewWindow: {
                        // max: 180,
                        min: 0,
                    },
                    gridlines: {
                        count: 100,
                    },
                    // logScale:true
                },
                curveType: 'function'
            };

            var chart = new google.visualization.LineChart(this.$('#gviz').get(0));
            chart.draw(data, options, null);
        },

        getDataTable: function () {
            return this.dataTable;
        }

    });

})(jQuery);
