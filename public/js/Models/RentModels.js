(function () {

    APP.Models.Rent = Backbone.Model.extend({

        idAttribute: "_id",

        defaults: {
            movie_id: "",
            client_id: "",
            date: ""
        },

        validate: function(attrs, options) {

            if(attrs.movie_id === "") {
                return "Musisz wybrać film.";
            }

            if(attrs.client_id === "") {
                return "Musisz wybrać klienta.";
            }

        },

        url: function (forceIsNew) {

            if (this.isNew() || forceIsNew) {
                return "/rents";
            } else {
                return "/rent/" + this.get("_id");
            }
        }

    });

})();