(function () {
    APP.Views.RentEdit = Backbone.View.extend({

        tagName: "div",

        template: _.template($("#rentEditNewViewTemplate").html()),

        initialize: function () {

            this.listenToOnce(this.model, 'change', this.render);
            this.listenToOnce(this.model, 'destroy', this.redirectToRents);
            this.listenToOnce(this.model, 'destroy', this.showRemoveInfo);
            this.listenToOnce(this.model, "destroy", APP.showStatisticsView);
            this.listenTo(this.model, "destroy", APP.showLatestRentsView);
            this.listenTo(this.model, 'invalid', this.showErrorInfo);
            this.listenTo(this.model, 'update', this.showUpdateInfo);
            this.listenTo(this.model, "update", APP.showLatestRentsView);

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
        updateRent: function (e) {

            e.preventDefault();

            this.model.unset("movie_title");
            this.model.unset("client_name");
            this.model.unset("date");

            var model = this.model;

            this.model.save({}, { 
                wait: true, 
                success: function() {
                    model.trigger("update");
                } 
            });
        },
        deleteRent: function () {

            var model = this.model;

            var zd = new $.Zebra_Dialog("Czy na pewno chcesz usunąć?", {
                type: "warning",
                title: "Potwierdzenie usunięcia",
                buttons: [
                    {
                    caption: "Tak",
                    callback: function() {
                        model.destroy({wait:true});
                    }
                },
                {
                    caption: "Anuluj"
                }
                ]
            });

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