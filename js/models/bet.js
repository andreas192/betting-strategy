/**
 * Created by andreiluculescu on 6/23/17.
 */
var app = app || {};

(function () {
    'use strict';

    // Bet Model
    // ----------


    var Bet = Backbone.Model.extend({

        defaults: {
            currentWinnings: 0,
            betValue: 0
        },

        // Set the incrementation value of a bet related to the current bet value
        incrementBetValue: function () {
            var betValue = this.get('betValue');
            switch (true) {
                case betValue < 100:
                    betValue += 5;
                    break;
                case betValue < 200:
                    betValue += 10;
                    break;
                case betValue < 400:
                    betValue += 20;
                    break;
                case betValue < 800:
                    betValue += 30;
                    break;
            }

            this.save({
                betValue: betValue
            });
        },

        incrementCurrentWinningsBound: function () {
            this.incrementBetValue();

            this.save({
                currentWinnings: 2 * this.get('betValue')
            });
        }
    });

    app.Bet = new Bet();
})();
