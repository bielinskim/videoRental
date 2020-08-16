(function () {
    APP.Views.MovieNew = Backbone.View.extend({

        tagName: "div",

        template: _.template($("#movieEditNewViewTemplate").html()),

        initialize: function () {

            this.listenTo(this.model, "sync", _.bind(APP.Router.redirectToEdit, this));
            this.listenToOnce(this.model, "sync", APP.showStatisticsView);
            this.listenTo(this.model, "sync", APP.Messages.showAddedInfo);
            this.listenTo(this.model, 'invalid', _.bind(APP.Messages.showErrorInfo, this));

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

            APP.UI.autocomplete(this, '#ms-movie-categories', {
                name: "categories",
                data: "/categories",
                valueField: 'name',
                displayField: 'name',
                placeholder: "Wybierz kategorie",
                cls: "medium"
            });

            APP.UI.autocomplete(this, '#ms-movie-actors', {
                name: "actors",
                data: "/actors",
                valueField: 'name',
                displayField: 'name',
                placeholder: "Wybierz aktorów"
            });

            APP.UI.datePicker(this, "birthdate", "#movie-date");

            return this;
        },
        bindings: {
            "#movie-title": "title",
            "#movie-date": "date",
            "#movie-description": "description",
            "#movie-quantity": "quantity"
        }
    })
})();