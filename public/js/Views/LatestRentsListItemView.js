(function () {

    APP.Views.LatestRentsListItem = Backbone.View.extend({

        tagName: "li",

        template: _.template($("#latestRentsWidgetListItemTemplate").html()),

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
        formatDateMoment: function(date) {

            var d = new Date(date);

            return moment(d).locale("pl").calendar();

        }

    });

})();