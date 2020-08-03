(function () {

    APP.Models.Actor = Backbone.Model.extend({

        idAttribute: "_id",

        defaults: {
            name: ""
        },

        validate: function(attrs, options) {

            if(attrs.name === "") {
                return "Musisz podać imię i nazwisko aktora.";
            }

        },

        url: function () {

            if (this.isNew()) {
                return "/actors";
            } else {
                return "/actor/" + this.get("_id");
            }
        }

    });

})();