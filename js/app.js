/**
 * Created by andreiluculescu on 6/23/17.
 */

var app = app || {};

$(function () {
    'use strict';

    app.Bets.initialise();

    // kick things off by creating the `App`
    new app.AppView();
});
