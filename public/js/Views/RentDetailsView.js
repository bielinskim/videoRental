(function () {

    APP.Views.RentDetails = Backbone.View.extend({

        tagName: 'div',

        template: _.template($("#rentDetailsTemplate").html()),

        initialize: function () {

            this.listenTo(this.model, 'change', this.render);

        },
        render: function () {

            var html = this.template(this.model.toJSON());

            this.$el.html(html);

            APP.Regions.appContent.html(this.el);
        },
        events: {
            "click .edit": "showEdit"
        },
        showEdit: function () {
            APP.router.navigate("rent/" + this.model.get("_id") + "/edit", { trigger: true });
        }

    });

})();