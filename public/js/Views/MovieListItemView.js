(function () {

    APP.Views.MovieListItem = Backbone.View.extend({

        tagName: "li",

        template: _.template($("#movieListItemTemplate").html()),

        render: function () {

            var html = this.template(this.model.toJSON());

            this.$el.html(html);

            return this;
        },
        events: {
            "click .details": "redirectToDetails"
        },
        redirectToDetails: function () {

            APP.router.navigate("/movie/" + this.model.get("_id"), { trigger: true });
        }

    });

})();