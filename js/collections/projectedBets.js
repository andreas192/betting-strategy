/**
 * Created by andreiluculescu on 6/23/17.
 */
var app = app || {};

(function () {
    'use strict';

    // The collection of bets is backed by *localStorage* instead of a remote
    // server.
    var ProjectedBets = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: app.ProjectedBet,

        localStorage: new Backbone.LocalStorage('projected-bets-backbone'),

        // completed: function () {
        //     return this.where({completed: true});
        // },
        //
        // remaining: function () {
        //     return this.where({completed: false});
        // },
        //
        // nextOrder: function () {
        //     return this.length ? this.last().get('order') + 1 : 1;
        // },
        //
        // // Todos are sorted by their original insertion order.
        // comparator: 'order'

        initialise: function () {
            var projectedBet = app.ProjectedBet;

            projectedBet.set({
                currentWinnings: 200,
                projectedBetValue: 15
            });

            for (var i = 0; i <= 10; i++) {
                this.push(projectedBet);
                projectedBet = projectedBet.incrementCurrentWinningsBound();
            }
        },

        getDataTable: function () {
            var dataTable = [];

            this.models.forEach(function (model) {
               dataTable.push([
                   model.attributes.projectedBetValue,
                   model.attributes.currentWinnings,
               ])
            });

            return dataTable;
        }
    });

    app.ProjectedBets = new ProjectedBets();
})();
