/**
 * Created by andreiluculescu on 6/23/17.
 */
var app = app || {};

(function () {
    'use strict';

    // The collection of bets is backed by *localStorage* instead of a remote
    // server.
    var Bets = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: app.Bet,

        localStorage: new Backbone.LocalStorage('bets-backbone'),

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
            var bet = app.Bet;

            bet.set({
                currentWinnings: 200,
                betValue: 15
            });

            for (var i = 0; i <= 10; i++) {
                this.push(bet);
                bet = bet.incrementCurrentWinningsBound();
            }
        },

        getDataTable: function () {
            var dataTable = [];

            this.models.forEach(function (model, modelIndex) {
               dataTable.push([
                   model.attributes.betValue,
                   model.attributes.currentWinnings,
               ])
            });

            return dataTable;
        }
    });

    app.Bets = new Bets();
})();
