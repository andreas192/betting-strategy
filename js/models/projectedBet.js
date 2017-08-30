/**
 * Created by andreiluculescu on 6/23/17.
 */
var app = app || {};

(function () {
    'use strict';

    // Bet Model
    // ----------


    var ProjectedBet = Backbone.Model.extend({

        defaults: {
            currentWinnings: 0,
            projectedBetValue: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        url: 'test',

        // Set the incrementation value of a bet related to the current bet value
        incrementProjectedBetValue: function () {
            var projectedBetValue = this.get('projectedBetValue');
            switch (true) {
                case projectedBetValue < 100:
                    projectedBetValue += 5;
                    break;
                case projectedBetValue < 200:
                    projectedBetValue += 10;
                    break;
                case projectedBetValue < 400:
                    projectedBetValue += 20;
                    break;
                case projectedBetValue < 800:
                    projectedBetValue += 30;
                    break;
                case projectedBetValue < 1600:
                    projectedBetValue += 40;
                    break;

            }

            this.set('projectedBetValue', projectedBetValue);
        },

        incrementCurrentWinningsBound: function () {
            this.incrementProjectedBetValue();

            var currentWinnings = this.get('currentWinnings');

            this.set('currentWinnings', currentWinnings + 3 * this.get('projectedBetValue'));

            return this.clone();
        }
    });

    app.ProjectedBet = new ProjectedBet();
})();
