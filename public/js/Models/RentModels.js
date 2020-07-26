(function () {

    APP.Models.Rent = Backbone.Model.extend({

        idAttribute: "_id",

        url: function () {

            if (this.isNew()) {
                return "/rents";
            } else {
                return "/rent/" + this.get("_id");
            }
        }

    });

})();