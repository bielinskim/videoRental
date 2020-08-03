(function () {

    APP.Models.Category = Backbone.Model.extend({

        idAttribute: "_id",

        defaults: {
            name: ""
        },

        validate: function(attrs, options) {

            if(attrs.name === "") {
                return "Musisz podać nazwę kategorii.";
            }

        },

        url: function () {

            if (this.isNew()) {
                return "/categories";
            } else {
                return "/category/" + this.get("_id");
            }
        }

    });

})();