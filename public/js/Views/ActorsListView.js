(function() {

    APP.Views.ActorsList = Backbone.View.extend({
        
        tagName: "ul",

        className: "app-items-list",

        initialize: function(options) {

            this.options = options;

            this.listenTo(this.collection, "reset", this.render);

        },

        render: function() {

            var paginationView = new APP.Views.ListPagination({
                collectionName: "actors",
                page: this.options.page,
                order: this.options.order,
                search: this.options.search

            });

            var actionsView = new APP.Views.ListActions({
                collectionName: "actors",
                page: this.options.page,
                order: this.options.order,
                search: this.options.search,
                placeholder: "Szukaj aktorów..."
            });

            this.childViews = [actionsView, paginationView];

            this.collection.each(this.addOne, this);

            APP.Regions.appContent.append(actionsView.render().el);
            APP.Regions.appContent.append(this.el);
            APP.Regions.appContent.append(paginationView.render().el);

        },
        addOne: function(model) {

            var view = new APP.Views.ActorListItem({model: model});

            this.$el.append(view.render().el);
        }
    });
})();