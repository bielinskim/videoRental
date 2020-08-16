(function () {
    APP.Views.MovieEdit = Backbone.View.extend({

        tagName: "div",

        template: _.template($("#movieEditNewViewTemplate").html()),

        initialize: function () {

            this.listenToOnce(this.model, 'change', this.render);
            this.listenToOnce(this.model, 'destroy', _.bind(APP.Router.redirectToList, this));
            this.listenToOnce(this.model, "destroy", APP.showStatisticsView);
            this.listenToOnce(this.model, 'destroy', APP.Messages.showRemoveInfo);
            this.listenTo(this.model, 'invalid', _.bind(APP.Messages.showErrorInfo, this));
            this.listenTo(this.model, 'update', APP.Messages.showUpdateInfo);

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

            APP.UI.autocomplete(this, '#ms-movie-categories', {
                name: "categories",
                data: "/categories",
                valueField: 'name',
                displayField: 'name',
                placeholder: "Wybierz kategorie",
                cls: "medium",
                loadData = true
            });

            APP.UI.autocomplete(this, '#ms-movie-actors', {
                name: "actors",
                data: "/actors",
                valueField: 'name',
                displayField: 'name',
                placeholder: "Wybierz aktorów",
                loadData = true
            });

            APP.UI.datePicker(this, "birthdate", "#movie-date");

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
        redirectToMovies: function () {

            APP.router.navigate("/movies", { trigger: true });

        }
    })
})();