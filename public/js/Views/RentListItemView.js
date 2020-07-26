(function () {

    APP.Views.RentListItem = Backbone.View.extend({

        tagName: "li",

        template: _.template($("#rentListItemTemplate").html()),

        render: function () {

            var html = this.template(this.model.toJSON());

            this.$el.html(html);

            return this;
        },
        events: {
            "click .details": "redirectToDetails"
        },
        redirectToDetails: function () {

            APP.router.navigate("/rent/" + this.model.get("_id"), { trigger: true });
        }

    });

})();