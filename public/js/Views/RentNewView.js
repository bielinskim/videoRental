(function () {
    APP.Views.RentNew = Backbone.View.extend({

        tagName: "div",

        template: _.template($("#rentEditNewViewTemplate").html()),

        initialize: function () {

            this.listenTo(this.model, "sync", _.bind(APP.Router.redirectToEdit, this));
            this.listenToOnce(this.model, "sync", this.showAddedInfo);
            this.listenToOnce(this.model, "sync", APP.showLatestRentsView);
            this.listenToOnce(this.model, "sync", APP.showStatisticsView);
            this.listenTo(this.model, 'invalid', this.showErrorInfo);

            this.delegateEvents({
                "submit form": _.bind(APP.CRUD.createItem, this)
            });

            this.render();

        },
        render: function () {

            var html = this.template(this.model.toJSON()),
                model = this.model;

            this.$el.html(html);

            APP.Regions.appContent.html(this.el);

            var movieField = this.$("#ms-movie-id").magicSuggest({
                data: "/movies",
                method: 'get',
                valueField: '_id',
                displayField: 'title',
                allowFreeEntries: false,
                toggleOnClick: true,
                placeholder: "Wybierz film",
                queryParam: "name",
            });

            $(movieField).on("selectionchange", function (e, m, movies) {
                if(movies.length > 1) {
                    this.removeFromSelection(movies[0], true);
                }

                if (movies.length) {
                    model.set("movie_id", movies[0]._id);

                    this.container.addClass("selected");
                } else {
                    model.set("movie_id", "");

                    this.container.removeClass("selected");
                }
            });

            var clientField = this.$("#ms-client-id").magicSuggest({
                data: "/clients",
                method: 'get',
                valueField: '_id',
                displayField: 'name',
                allowFreeEntries: false,
                toggleOnClick: true,
                placeholder: "Wybierz klienta",
                queryParam: "name",
            });

            $(clientField).on("selectionchange", function (e, m, clients) {
                if(clients.length > 1) {
                    this.removeFromSelection(clients[0], true);
                }

                if (clients.length) {
                    model.set("client_id", clients[0]._id);

                    this.container.addClass("selected");
                } else {
                    model.set("client_id", "");

                    this.container.removeClass("selected");
                }
            });

            return this;
        },
        showAddedInfo: function(model) {

            var zd = new $.Zebra_Dialog("Rekord został poprawnie zapisany", {
                type: "information",
                title: "Zapisano"
            });

        },
        showErrorInfo: function(model) {

            var zd = new $.Zebra_Dialog(model.validationError, {
                type: "error",
                title: "Wystąpił błąd"
            });

        },
    })
})();