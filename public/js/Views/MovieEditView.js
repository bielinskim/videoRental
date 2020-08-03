(function () {
    APP.Views.MovieEdit = Backbone.View.extend({

        tagName: "div",

        template: _.template($("#movieEditNewViewTemplate").html()),

        initialize: function () {

            this.listenToOnce(this.model, 'change', this.render);
            this.listenToOnce(this.model, 'destroy', this.redirectToMovies);
            this.listenTo(this.model, 'invalid', this.showErrorInfo);

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
        updateMovie: function (e) {

            e.preventDefault();

            this.model.unset("rent_number");

            this.model.unset("available");

            this.model.save({}, { wait: true });
        },
        deleteMovie: function () {

            const confirmation = confirm("Czy na pewno chcesz usunac?");

            if (confirmation) {
                this.model.destroy({ wait: true });
            }

        },
        showErrorInfo: function(model) {

            alert(model.validationError);

        },
        redirectToMovies: function () {

            APP.router.navigate("/movies", { trigger: true });

        }
    })
})();