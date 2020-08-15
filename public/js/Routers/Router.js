(function () {

    APP.Routers.Router = Backbone.Router.extend({

        initialize: function() {

            this.route("", "movies-list");
            this.route("movies(/page/:page)(/order/:order)(/search/:search)", "movies-list");
            this.route("actors(/page/:page)(/order/:order)(/search/:search)", "actors-list");
            this.route("categories(/page/:page)(/order/:order)(/search/:search)", "categories-list");
            this.route("rents(/page/:page)(/order/:order)(/search/:search)", "rents-list");
            this.route("clients(/page/:page)(/order/:order)(/search/:search)", "clients-list");

            this.route("movie/:id", "movie-details");
            this.route("actor/:id", "actor-details");
            this.route("category/:id", "category-details");
            this.route("rent/:id", "rent-details");
            this.route("client/:id", "client-details");

            this.route("movie/:id/edit", "movie-edit");
            this.route("actor/:id/edit", "actor-edit");
            this.route("category/:id/edit", "category-edit");
            this.route("rent/:id/edit", "rent-edit");
            this.route("client/:id/edit", "client-edit");

            this.route("movies/new", "movie-new");
            this.route("actors/new", "actor-new");
            this.route("categories/new", "category-new");
            this.route("rents/new", "rent-new");
            this.route("clients/new", "client-new");
        
        },

    });

})();