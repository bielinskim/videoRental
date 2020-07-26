(function () {
    APP.Views.ClientEdit = Backbone.View.extend({

        tagName: "div",

        template: _.template($("#clientEditNewViewTemplate").html()),

        initialize: function () {

            this.listenToOnce(this.model, 'change', this.render);
            this.listenToOnce(this.model, 'destroy', this.redirectToClients);

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

            this.model.save({}, { wait: true });
        },
        deleteClient: function () {

            const confirmation = confirm("Czy na pewno chcesz usunac?");

            if (confirmation) {
                this.model.destroy({ wait: true });
            }

        },
        redirectToClients: function () {

            APP.router.navigate("/clients", { trigger: true });

        }
    })
})();