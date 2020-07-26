(function () {

    APP.Models.Movie = Backbone.Model.extend({

        idAttribute: "_id",

        url: function () {

            if (this.isNew()) {
                return "/movies";
            } else {
                return "/movie/" + this.get("_id");
            }
        }

    });

})();