(function () {
    APP.Views.ActorEdit = Backbone.View.extend({

        tagName: "div",

        template: _.template($("#actorEditNewViewTemplate").html()),

        initialize: function () {

            this.listenToOnce(this.model, 'change', this.render);
            this.listenToOnce(this.model, 'destroy', this.redirectToActors);
            this.listenTo(this.model, 'invalid', this.showErrorInfo);

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
            "submit form": "updateActor",
            "click .delete": "deleteActor"
        },
        updateActor: function (e) {

            e.preventDefault();

            this.model.save({}, { wait: true });
        },
        deleteActor: function () {

            const confirmation = confirm("Czy na pewno chcesz usunac?");

            if (confirmation) {
                this.model.destroy({ wait: true });
            }

        },
        showErrorInfo: function(model) {

            alert(model.validationError);

        },
        redirectToActors: function () {

            APP.router.navigate("/actors", { trigger: true });

        }
    })
})();