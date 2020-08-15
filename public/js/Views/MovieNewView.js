(function () {
    APP.Views.MovieNew = Backbone.View.extend({

        tagName: "div",

        template: _.template($("#movieEditNewViewTemplate").html()),

        initialize: function () {

            this.listenTo(this.model, "sync", _.bind(APP.Router.redirectToEdit, this));
            this.listenToOnce(this.model, "sync", this.showAddedInfo);
            this.listenToOnce(this.model, "sync", APP.showStatisticsView);
            this.listenTo(this.model, 'invalid', this.showErrorInfo);

            this.delegateEvents({
                "submit form": _.bind(APP.CRUD.createItem, this)
            });

            this.render();

        },
        render: function () {

            var html = this.template(this.model.toJSON()),
                model = this.model,
                self = this;

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

        }
    })
})();