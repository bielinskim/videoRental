(function () {

    APP.Views.ClientListItem = Backbone.View.extend({

        tagName: "li",

        template: _.template($("#clientListItemTemplate").html()),

        render: function () {

            var html = this.template(this.model.toJSON());

            this.$el.html(html);

            return this;
        },
        events: {
            "click .details": "redirectToDetails"
        },
        redirectToDetails: function () {

            APP.router.navigate("/client/" + this.model.get("_id"), { trigger: true })
        }

    });

})();