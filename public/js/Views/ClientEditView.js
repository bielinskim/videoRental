(function () {
    APP.Views.ClientEdit = Backbone.View.extend({

        tagName: "div",

        template: _.template($("#clientEditNewViewTemplate").html()),

        initialize: function () {

            this.listenToOnce(this.model, 'change', this.render);
            this.listenToOnce(this.model, 'destroy', _.bind(APP.Router.redirectToList, this));
            this.listenToOnce(this.model, 'destroy', this.showRemoveInfo);
            this.listenToOnce(this.model, "destroy", APP.showStatisticsView);
            this.listenToOnce(this.model, "destroy", APP.showLatestRentsView);
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

            var beatPicker = new BeatPicker({
                dateInputNode: this.$("#client-birthdate"),
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
                model.set("birthdate", o.string);
            });

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
        },
        events: {
            "submit form": "updateClient",
            "click .delete": "deleteClient"
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
        redirectToClients: function () {

            APP.router.navigate("/clients", { trigger: true });

        }
    })
})();