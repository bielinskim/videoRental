(function () {
    APP.Views.RentEdit = Backbone.View.extend({

        tagName: "div",

        template: JST['rentEditNewViewTemplate'],

        initialize: function () {

            this.listenToOnce(this.model, 'change', this.render);
            this.listenToOnce(this.model, 'destroy', _.bind(APP.Router.redirectToList, this));
            this.listenToOnce(this.model, "destroy", APP.showStatisticsView);
            this.listenTo(this.model, "destroy", APP.showLatestRentsView);
            this.listenToOnce(this.model, 'destroy', APP.Messages.showRemoveInfo);
            this.listenTo(this.model, 'invalid', _.bind(APP.Messages.showErrorInfo, this));
            this.listenTo(this.model, 'update', APP.Messages.showUpdateInfo);
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

            APP.UI.autocomplete(this, '#ms-movie-id', {
                name: "movie_id",
                data: "/movies",
                valueField: '_id',
                displayField: 'title',
                placeholder: "Wybierz film",
                cls: "medium",
                loadData: true,
                oneAllowed: true
            });

            APP.UI.autocomplete(this, '#ms-client-id', {
                name: "client_id",
                data: "/clients",
                valueField: '_id',
                displayField: 'name',
                placeholder: "Wybierz klienta",
                cls: "medium",
                loadData: true,
                oneAllowed: true
            });

            return this;
        },
        events: {
            "submit form": "updateRent",
            "click .delete": "deleteRent"
        },
        redirectToRents: function () {

            APP.router.navigate("/rents", { trigger: true });

        }
    })
})();