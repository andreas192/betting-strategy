/**
 * Created by andreiluculescu on 6/23/17.
 */
var app = app || {};

(function ($) {
    'use strict';

    app.ChartView = new Backbone.GoogleChart({
        el: '#chart',
        chartType: 'ColumnChart',
        dataTable: [['Germany', 'USA', 'Brazil', 'Canada', 'France', 'RU'],
            [700, 300, 400, 500, 600, 800]],
        options: {'title': 'Countries'},

    });
})(jQuery);
