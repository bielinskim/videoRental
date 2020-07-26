(function () {

    APP.Routers.Router = Backbone.Router.extend({

        routes: {
            "": "showMoviesList",
            "movies": "showMoviesList",
            "actors": "showActorsList",
            "clients": "showClientsList",
            "rents": "showRentsList",

            "movie/:id": "showMovieDetails",
            "actor/:id": "showActorDetails",
            "category/:id": "showCategoryDetails",
            "client/:id": "showClientDetails",
            "rent/:id": "showRentDetails",

            "movie/:id/edit": "showMovieEdit",
            "actor/:id/edit": "showActorEdit",
            "category/:id/edit": "showCategoryEdit",
            "client/:id/edit": "showClientEdit",

            "movies/new": "showMovieNew",
            "actors/new": "showActorNew",
            "categories/new": "showCategoryNew",
            "clients/new": "showClientsNew"

        },

        showMoviesList: function () {

            var movies = new APP.Collections.MoviesList();
            var view = new APP.Views.MoviesList({ collection: movies });

            APP.showMainView(view);

            movies.fetch({
                reset: true,
                data: {
                    limit: 5
                }
            });

            APP.Views.Navigation.highlight("movies");

        },
        showActorsList: function () {
            var actors = new APP.Collections.ActorsList();
            var view = new APP.Views.ActorsList({ collection: actors });

            APP.showMainView(view);

            actors.fetch({
                reset: true,
                data: {
                    limit: 5
                }
            });

            APP.Views.Navigation.highlight("actors");
        },
        showClientsList: function () {
            var clients = new APP.Collections.ClientsList();
            var view = new APP.Views.ClientsList({ collection: clients });

            APP.showMainView(view);

            clients.fetch({
                reset: true,
                data: {
                    limit: 5
                }
            });

            APP.Views.Navigation.highlight("clients");
        },
        showCategoriesList: function () {
            var categories = new APP.Collections.CategoriesList();
            var view = new APP.Views.CategoriesList({ collection: categories });

            APP.showMainView(view);

            categories.fetch({
                reset: true,
                data: {
                    limit: 5
                }
            });

            APP.Views.Navigation.highlight("categories");
        },

        showRentsList: function () {

            var rents = new APP.Collections.RentsList();
            var view = new APP.Views.RentsList({ collection: rents });

            APP.showMainView(view);

            rents.fetch({
                reset: true,
                data: {
                    limit: 5
                }
            });

            APP.Views.Navigation.highlight("rents");

        },

        showMovieDetails: function (id) {
            var movie = new APP.Models.Movie({ _id: id }),
                view = new APP.Views.MovieDetails({ model: movie });

            APP.showMainView(view);

            movie.fetch();

            APP.Views.Navigation.highlight("movies");

        },
        showActorDetails: function (id) {
            var actor = new APP.Models.Actor({ _id: id }),
                view = new APP.Views.ActorDetails({ model: actor });

            APP.showMainView(view);

            actor.fetch();

            APP.Views.Navigation.highlight("actors");

        },
        showCategoryDetails: function (id) {
            var category = new APP.Models.Category({ _id: id }),
                view = new APP.Views.CategoryDetails({ model: category });

            APP.showMainView(view);

            category.fetch();

            APP.Views.Navigation.highlight("categories");

        },
        showClientDetails: function (id) {
            var client = new APP.Models.Client({ _id: id }),
                view = new APP.Views.ClientDetails({ model: client });

            APP.showMainView(view);

            client.fetch();

            APP.Views.Navigation.highlight("clients");

        },
        showRentDetails: function (id) {
            var rent = new APP.Models.Rent({ _id: id }),
                view = new APP.Views.RentDetails({ model: rent });

            APP.showMainView(view);

            rent.fetch();

            APP.Views.Navigation.highlight("rents");

        },
        showMovieEdit: function (id) {
            var movie = new APP.Models.Movie({ _id: id }),
                view = new APP.Views.MovieEdit({ model: movie });

            APP.showMainView(view);

            movie.fetch();

            APP.Views.Navigation.highlight("movies");

        },
        showActorEdit: function (id) {
            var actor = new APP.Models.Actor({ _id: id }),
                view = new APP.Views.ActorEdit({ model: actor });

            APP.showMainView(view);

            actor.fetch();

            APP.Views.Navigation.highlight("actors");

        },
        showCategoryEdit: function (id) {
            var category = new APP.Models.Category({ _id: id }),
                view = new APP.Views.CategoryEdit({ model: category });

            APP.showMainView(view);

            category.fetch();

            APP.Views.Navigation.highlight("categories");

        },
        showClientEdit: function (id) {
            var client = new APP.Models.Client({ _id: id }),
                view = new APP.Views.ClientEdit({ model: client });

            APP.showMainView(view);

            client.fetch();

            APP.Views.Navigation.highlight("clients");

        },
        showMovieNew: function () {
            var movie = new APP.Models.Movie(),
                view = new APP.Views.MovieNew({ model: movie });

            APP.showMainView(view);

            APP.Views.Navigation.highlight("movies");

        },
        showActorNew: function () {
            var actor = new APP.Models.Actor(),
                view = new APP.Views.ActorNew({ model: actor });

            APP.showMainView(view);

            APP.Views.Navigation.highlight("actors");

        },
        showCategoryNew: function () {
            var category = new APP.Models.Category(),
                view = new APP.Views.CategoryNew({ model: category });

            APP.showMainView(view);

            APP.Views.Navigation.highlight("categories");

        },
        showClientsNew: function () {
            var client = new APP.Models.Client(),
                view = new APP.Views.ClientNew({ model: client });

            APP.showMainView(view);

            APP.Views.Navigation.highlight("clients");

        },
    });

})();