(function () {
    APP.Views.RentNew = Backbone.View.extend({

        tagName: "div",

        template: _.template($("#rentEditNewViewTemplate").html()),

        initialize: function () {

            this.listenToOnce(this.model, 'sync', this.redirectToEdit);
            this.listenTo(this.model, 'invalid', this.showErrorInfo);

            this.render();

        },
        render: function () {

            var html = this.template(this.model.toJSON()),
                model = this.model;

            this.$el.html(html);

            APP.Regions.appContent.html(this.el);

            var movieField = this.$("#ms-movie-id").magicSuggest({
                data: "/movies",
                method: 'get',
                valueField: '_id',
                displayField: 'title',
                allowFreeEntries: false,
                toggleOnClick: true,
                placeholder: "Wybierz film",
                queryParam: "name",
            });

            $(movieField).on("selectionchange", function (e, m, movies) {
                if(movies.length > 1) {
                    this.removeFromSelection(movies[0], true);
                }

                if (movies.length) {
                    model.set("movie_id", movies[0]._id);

                    this.container.addClass("selected");
                } else {
                    model.set("movie_id", "");

                    this.container.removeClass("selected");
                }
            });

            var clientField = this.$("#ms-client-id").magicSuggest({
                data: "/clients",
                method: 'get',
                valueField: '_id',
                displayField: 'name',
                allowFreeEntries: false,
                toggleOnClick: true,
                placeholder: "Wybierz klienta",
                queryParam: "name",
            });

            $(clientField).on("selectionchange", function (e, m, clients) {
                if(clients.length > 1) {
                    this.removeFromSelection(clients[0], true);
                }

                if (clients.length) {
                    model.set("client_id", clients[0]._id);

                    this.container.addClass("selected");
                } else {
                    model.set("client_id", "");

                    this.container.removeClass("selected");
                }
            });

            return this;
        },
        events: {
            "submit form": "saveRent"
        },
        saveRent: function (e) {

            e.preventDefault();

            this.model.save({}, { wait: true });
        },
        showErrorInfo: function(model) {

            alert(model.validationError);

        },
        redirectToEdit: function () {

            APP.router.navigate("/rent/"+ this.model.get("_id") + "/edit", { trigger: true });

        }
    })
})();