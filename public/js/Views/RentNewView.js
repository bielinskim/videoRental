(function () {
    APP.Views.RentNew = Backbone.View.extend({

        tagName: "div",

        template: _.template($("#rentEditNewViewTemplate").html()),

        initialize: function () {

            this.listenTo(this.model, "sync", _.bind(APP.Router.redirectToEdit, this));
            this.listenToOnce(this.model, "sync", APP.showLatestRentsView);
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
                model = this.model;

            this.$el.html(html);

            APP.Regions.appContent.html(this.el);

            APP.UI.autocomplete(this, '#ms-movie-id', {
                name: "movie_id",
                data: "/movies",
                valueField: '_id',
                displayField: 'title',
                placeholder: "Wybierz film",
                cls: "medium",
                oneAllowed: true
            });

            APP.UI.autocomplete(this, '#ms-client-id', {
                name: "client_id",
                data: "/clients",
                valueField: '_id',
                displayField: 'name',
                placeholder: "Wybierz klienta",
                cls: "medium",
                oneAllowed: true
            });

            return this;
        }
    })
})();