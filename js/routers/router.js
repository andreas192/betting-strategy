/**
 * Created by andreiluculescu on 6/23/17.
 */
var app = app || {};

(function () {
    'use strict';

    var BetRouter = Backbone.Router.extend({
        routes: {
            '*filter': 'setFilter'
        },

        // setFilter: function (param) {
        //     // Set the current filter to be used
        //     app.TodoFilter = param || '';
        //
        //     // Trigger a collection filter event, causing hiding/unhiding
        //     // of Todo view items
        //     app.todos.trigger('filter');
        // }
    });

    app.BetRouter = new BetRouter();
    Backbone.history.start();
})();
