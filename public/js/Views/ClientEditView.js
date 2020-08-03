(function () {
    APP.Views.ClientEdit = Backbone.View.extend({

        tagName: "div",

        template: _.template($("#clientEditNewViewTemplate").html()),

        initialize: function () {

            this.listenToOnce(this.model, 'change', this.render);
            this.listenToOnce(this.model, 'destroy', this.redirectToClients);
            this.listenToOnce(this.model, 'destroy', this.showRemoveInfo);
            this.listenTo(this.model, 'invalid', this.showErrorInfo);
            this.listenTo(this.model, 'update', this.showUpdateInfo);

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
        updateClient: function (e) {

            e.preventDefault();

            var model = this.model;

            this.model.save({}, { 
                wait: true,
                success: function() {
                    model.trigger("update");
                }
             });
        },
        deleteClient: function () {

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
        redirectToClients: function () {

            APP.router.navigate("/clients", { trigger: true });

        }
    })
})();