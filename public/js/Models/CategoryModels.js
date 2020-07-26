(function () {

    APP.Models.Category = Backbone.Model.extend({

        idAttribute: "_id",

        url: function () {

            if (this.isNew()) {
                return "/categories";
            } else {
                return "/category/" + this.get("_id");
            }
        }

    });

})();