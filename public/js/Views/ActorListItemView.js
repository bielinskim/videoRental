(function () {

    APP.Views.ActorListItem = Backbone.View.extend({

        tagName: "li",

        template: _.template($("#actorListItemTemplate").html()),

        initialize: function() {

            this.delegateEvents({
                "click": _.bind(APP.Router.redirectToDetails, this)
            });

        },

        render: function () {

            var html = this.template(this.model.toJSON());

            this.$el.html(html);

            return this;
        },

    });

})();