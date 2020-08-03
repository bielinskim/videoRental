(function() {

    APP.Views.MoviesList = Backbone.View.extend({
        
        tagName: "ul",

        className: "app-items-list",

        initialize: function(options) {

            this.options = options;

            this.listenTo(this.collection, "reset", this.render);

        },

        render: function() {

            var paginationView = new APP.Views.ListPagination({
                collectionName: "movies",
                page: this.options.page,
                order: this.options.order,
                search: this.options.search

            });

            var actionsView = new APP.Views.ListActions({
                collectionName: "movies",
                page: this.options.page,
                order: this.options.order,
                search: this.options.search,
                placeholder: "Szukaj filmów..."
            });

            this.childViews = [actionsView, paginationView];

            this.collection.each(this.addOne, this);

            APP.Regions.appContent.append(actionsView.render().el);
            APP.Regions.appContent.append(this.el);
            APP.Regions.appContent.append(paginationView.render().el);

        },
        addOne: function(model) {

            var view = new APP.Views.MovieListItem({model: model});

            this.$el.append(view.render().el);
        }
    });
})();