(function () {
    APP.Views.MovieEdit = Backbone.View.extend({

        tagName: "div",

        template: _.template($("#movieEditNewViewTemplate").html()),

        initialize: function () {

            this.listenToOnce(this.model, 'change', this.render);
            this.listenToOnce(this.model, 'destroy', _.bind(APP.Router.redirectToList, this));
            this.listenToOnce(this.model, 'destroy', this.showRemoveInfo);
            this.listenToOnce(this.model, "destroy", APP.showStatisticsView);
            this.listenTo(this.model, 'invalid', this.showErrorInfo);
            this.listenTo(this.model, 'update', this.showUpdateInfo);

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

            this.stickit();

            var categoriesField = this.$("#ms-movie-categories").magicSuggest({
                data: "/categories",
                method: 'get',
                valueField: 'name',
                displayField: 'name',
                allowFreeEntries: false,
                toggleOnClick: true,
                placeholder: "Wybierz kategorie",
                queryParam: "name",
                cls: "medium"
            });

            $(categoriesField).on("load", function () {
                categoriesField.setValue(model.get("categories"));
            });

            $(categoriesField).on("selectionchange", function (e, m, categories) {
                if (categories.length) {
                    model.set("categories", _.pluck(categories, "name"));

                    this.container.addClass("selected");
                } else {
                    model.set("categories", []);

                    this.container.removeClass("selected");
                }
            })

            var actorsField = this.$("#ms-movie-actors").magicSuggest({
                data: "/actors",
                method: 'get',
                valueField: 'name',
                displayField: 'name',
                allowFreeEntries: false,
                toggleOnClick: true,
                placeholder: "Wybierz aktorów",
                queryParam: "name",
                cls: "medium"
            });

            $(actorsField).on("load", function () {
                actorsField.setValue(model.get("actors"));
            });

            $(actorsField).on("selectionchange", function (e, m, actors) {
                if (actors.length) {
                    model.set("actors", _.pluck(actors, "name"));

                    this.container.addClass("selected");
                } else {
                    model.set("actors", []);

                    this.container.removeClass("selected");
                }
            });

            var beatPicker = new BeatPicker({
                dateInputNode: this.$("#movie-date"),
                modules: {
                    footer: false,
                    icon: false,
                    clear: false
                },
                dateFormat: {
                    format: ["DD", "MM", "YYYY"]
                }
            });

            beatPicker.on("change", function (o) {
                model.set("date", o.string);
            });

            return this;
        },
        bindings: {
            "#movie-title": "title",
            "#movie-date": "date",
            "#movie-description": "description",
            "#movie-quantity": "quantity"
        },
        events: {
            "submit form": "updateMovie",
            "click .delete": "deleteMovie"
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
        redirectToMovies: function () {

            APP.router.navigate("/movies", { trigger: true });

        }
    })
})();