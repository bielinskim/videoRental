(function () {

    APP.Models.Client = Backbone.Model.extend({

        idAttribute: "_id",

        url: function () {

            if (this.isNew()) {
                return "/clients";
            } else {
                return "/client/" + this.get("_id");
            }
        }

    });

})();