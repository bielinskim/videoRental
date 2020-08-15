(function () {
    APP.Views.ActorNew = Backbone.View.extend({

        tagName: "div",

        template: _.template($("#actorEditNewViewTemplate").html()),

        initialize: function () {

            this.listenTo(this.model, "sync", _.bind(APP.Router.redirectToEdit, this));
            this.listenTo(this.model, "sync", this.showAddedInfo);
            this.listenTo(this.model, 'invalid', this.showErrorInfo);

            this.delegateEvents({
                "submit form": _.bind(APP.CRUD.createItem, this)
            });

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

        }
    })
})();