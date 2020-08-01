(function() {

    APP.Views.ListActions = Backbone.View.extend({

        tagName: "div",
        className: "app-actions",

        template: _.template($("#listActionsTemplate").html()),

        initialize: function(options) {

            this.options = options;

        },

        render: function() {

            this.$el.append(this.template({
                order: this.options.order
            }));
            
            return this;
        },

        events: {
            "keyup .add-search input": "setSearchCollectionTimeout",
            "click .app-sort li": "sortCollection",
            "click .add": "showAdd"
        },

        setSearchCollectionTimeout: function() {


        },

        searchCollection: function() {

        },

        sortCollection: function(e) {

            var order = $(e.target).data("order"),
                url = this.options.collectionName + "/page/" + this.options.page + "/order/" + order;

            APP.router.navigate(url, {trigger:true});

        },
        showAdd: function() {

            var url = this.options.collectionName + "/new";

            APP.router.navigate(url, {trigger:true});
        }

    });

})();