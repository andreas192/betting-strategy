/**
 * Created by andreiluculescu on 6/23/17.
 */
var app = app || {};

(function ($) {
    'use strict';

    // The Application
    // ---------------

    // Our overall **AppView** is the top-level piece of UI.
    app.AppView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#bettingStrategyApp',

        // Our template for the line of statistics at the bottom of the app.
        // statsTemplate: _.template($('#stats-template').html()),

        // Delegated events for creating new items, and clearing completed ones.
        // events: {
        //     'keypress #new-todo': 'createOnEnter',
        //     'click #clear-completed': 'clearCompleted',
        //     'click #toggle-all': 'toggleAllComplete'
        // },

        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        initialize: function () {
            // this.allCheckbox = this.$('#toggle-all')[0];
            // this.$input = this.$('#new-todo');
            // this.$footer = this.$('#footer');
            // this.$main = this.$('#main');
            // this.$list = $('#todo-list');
            //
            // this.listenTo(app.todos, 'add', this.addOne);
            // this.listenTo(app.todos, 'reset', this.addAll);
            // this.listenTo(app.todos, 'change:completed', this.filterOne);
            // this.listenTo(app.todos, 'filter', this.filterAll);
            // this.listenTo(app.todos, 'all', this.render);

            // Suppresses 'add' events with {reset: true} and prevents the app view
            // from being re-rendered for every model. Only renders when the 'reset'
            // event is triggered at the end of the fetch.


            app.ProjectedBets.initialise();
            this.listenTo(app.ProjectedBets, 'initialise', this.addChart);
            this.listenTo(app.ProjectedBets, 'reset', this.addChart);
            this.render();
            // app.Bets.fetch({reset: true});
        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function () {
            var self = this;
            this.addChart();
            $(window).resize(function () {
                self.addChart();
            });
        },

        addChart: function () {
            var dataTable = [];

            app.ProjectedBets.each(function(projectedBet) {
                if(_.isEmpty(dataTable[0])) {
                    dataTable[0] = [];
                }
                if(_.isEmpty(dataTable[1])) {
                    dataTable[1] = [];
                }
                dataTable[0].push(projectedBet.get('projectedBetValue'));
                dataTable[1].push(projectedBet.get('currentWinnings'));
            });

            var params = {
                dataTable: dataTable
            };

            var ChartView = new app.ChartView(params);

            // ChartView.setDataTable(dataTable);
            // var ChartView = new app.ChartView({ dataTable: [['Germany', 'USA', 'Brazil', 'Canada', 'France', 'RU'],
            //         [700, 300, 400, 500, 600, 800]] });

            $('#bettingStrategyApp').append(ChartView.render().el);
        }

        // addOne: function (todo) {
        //     var view = new app.TodoView({ model: todo });
        //     this.$list.append(view.render().el);
        // },

        // Add all items in the **Todos** collection at once.
        // addAll: function () {
        //     this.$list.html('');
        //     app.todos.each(this.addOne, this);
        // },
        //
        // filterOne: function (todo) {
        //     todo.trigger('visible');
        // },
        //
        // filterAll: function () {
        //     app.todos.each(this.filterOne, this);
        // },
        //
        // // Generate the attributes for a new Todo item.
        // newAttributes: function () {
        //     return {
        //         title: this.$input.val().trim(),
        //         order: app.todos.nextOrder(),
        //         completed: false
        //     };
        // },
        //
        // // If you hit return in the main input field, create new **Todo** model,
        // // persisting it to *localStorage*.
        // createOnEnter: function (e) {
        //     if (e.which === ENTER_KEY && this.$input.val().trim()) {
        //         app.todos.create(this.newAttributes());
        //         this.$input.val('');
        //     }
        // },
        //
        // // Clear all completed todo items, destroying their models.
        // clearCompleted: function () {
        //     _.invoke(app.todos.completed(), 'destroy');
        //     return false;
        // },
        //
        // toggleAllComplete: function () {
        //     var completed = this.allCheckbox.checked;
        //
        //     app.todos.each(function (todo) {
        //         todo.save({
        //             completed: completed
        //         });
        //     });
        // }
    });
})(jQuery);
