(function () {
    APP.Views.ActorNew = Backbone.View.extend({

        tagName: "div",

        template: _.template($("#actorEditNewViewTemplate").html()),

        initialize: function () {

            this.listenTo(this.model, "sync", this.redirectToEdit);
            this.listenTo(this.model, "sync", this.showAddedInfo);
            this.listenTo(this.model, 'invalid', this.showErrorInfo);

            this.render();

        },
        render: function () {

            var html = this.template(this.model.toJSON());

            this.$el.html(html);

            APP.Regions.appContent.html(this.el);

            this.stickit();
        },
        bindings: {
            "#actor-name": "name"
        },
        events: {
            "submit form": "saveActor"
        },
        saveActor: function (e) {

            e.preventDefault();

            this.model.save({}, { wait: true });
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

        },
        redirectToEdit: function () {

            APP.router.navigate("actor/" + this.model.get("_id") + "/edit", { trigger: true });

        }
    })
})();