(function () {
    APP.Views.ActorNew = Backbone.View.extend({

        tagName: "div",

        template: _.template($("#actorEditNewViewTemplate").html()),

        initialize: function () {

            this.listenTo(this.model, "sync", this.redirectToEdit);

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
        redirectToEdit: function () {

            APP.router.navigate("actor/" + this.model.get("_id") + "/edit", { trigger: true });

        }
    })
})();