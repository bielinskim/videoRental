(function () {
    APP.Views.RentEdit = Backbone.View.extend({

        tagName: "div",

        template: _.template($("#rentEditNewViewTemplate").html()),

        initialize: function () {

            this.listenToOnce(this.model, 'change', this.render);
            this.listenToOnce(this.model, 'destroy', _.bind(APP.Router.redirectToList, this));
            this.listenToOnce(this.model, 'destroy', this.showRemoveInfo);
            this.listenToOnce(this.model, "destroy", APP.showStatisticsView);
            this.listenTo(this.model, "destroy", APP.showLatestRentsView);
            this.listenTo(this.model, 'invalid', this.showErrorInfo);
            this.listenTo(this.model, 'update', this.showUpdateInfo);
            this.listenTo(this.model, "update", APP.showLatestRentsView);

            this.delegateEvents({
                "submit form": _.bind(APP.CRUD.updateItem, this),
                "click .delete": _.bind(APP.CRUD.deleteItem, this)
            });

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

            $(movieField).on("load", function () {
                movieField.setValue([model.get("movie_id")]);
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

            $(clientField).on("load", function () {
                clientField.setValue([model.get("client_id")]);
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
        events: {
            "submit form": "updateRent",
            "click .delete": "deleteRent"
        },
        showRemoveInfo: function(model) {

            var zd = new $.Zebra_Dialog("Rekord został usunięty", {
                type: "information",
                title: "Usunięto"
            });

        },
        showErrorInfo: function(model) {

            var zd = new $.Zebra_Dialog(model.validationError, {
                type: "error",
                title: "Wystąpił błąd"
            });

        },
        showUpdateInfo: function(model) {

            var zd = new $.Zebra_Dialog("Aktualizacja przebiegła pomyślnie", {
                type: "information",
                title: "Zaktualizowano"
            });

        },
        redirectToRents: function () {

            APP.router.navigate("/rents", { trigger: true });

        }
    })
})();