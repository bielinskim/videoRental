(function () {
    APP.Views.ClientNew = Backbone.View.extend({

        tagName: "div",

        template: JST['clientEditNewViewTemplate'],

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
                model = this.model;

            this.$el.html(html);

            APP.Regions.appContent.html(this.el);

            this.stickit();

            APP.UI.datePicker(this, "birthdate", "#client-birthdate");

            return this;
        },
        bindings: {
            "#client-first-name": "first_name",
            "#client-last-name": "last_name",
            "#client-birthdate": "birthdate",
            "#client-idc-number": "idc_number",
            "#client-address": "address",
            "#client-zip-code": "zip_code",
            "#client-city": "city"
        }
    })
})();