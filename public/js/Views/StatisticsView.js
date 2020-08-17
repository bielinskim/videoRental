(function () {

    APP.Views.Statistics = Backbone.View.extend({

        tagName: "div",
        className: "app-status",

        template: JST['statisticsWidgetTemplate'],

        initialize: function() {

            var view = this;

            $.when(

                $.ajax("/info/movies"),
                $.ajax("/info/clients"),
                $.ajax("/info/rents")

            ).then(function(movies, clients, rents) {

                view.render({

                    movies: movies[0],
                    clients: clients[0],
                    rents: rents[0]

                });

            });

        },

        render: function (data) {

            this.$el.html(this.template(data));

            APP.Regions.appHeader.append(this.el);

            return this;
        },

    });

})();