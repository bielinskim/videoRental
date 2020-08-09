(function () {

    APP.Models.Movie = Backbone.Model.extend({

        idAttribute: "_id",

        defaults: {
            title: "",
            date: "",
            categories: [],
            actors: [],
            description: "",
            quantity: 0
        },

        validate: function(attrs, options) {

            if(attrs.title === "") {
                return "Musisz podać tytuł filmu.";
            }

            if(!attrs.date.match(/^(\d{2}-\d{2}-\d{4})$/)) {
                return "Musisz podać poprawną datę produkcji.";
            }

            if(!attrs.categories.length) {
                return "Musisz wybrać przynajmniej jedną kategorie.";
            }

            if(!attrs.actors.length) {
                return "Musisz wybrać przynajmniej jednego aktora.";
            }

            if(attrs.description === "") {
                return "Musisz podać opis filmu";
            }

            if(parseInt(attrs.quantity) < 0) {
                return "Musisz podać poprawną ilość";
            }

        },

        url: function () {

            if (this.isNew()) {
                return "/movies";
            } else {
                return "/movie/" + this.get("_id");
            }
        }

    });

})();