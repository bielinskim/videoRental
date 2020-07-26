(function () {

    APP.Models.Actor = Backbone.Model.extend({

        idAttribute: "_id",

        url: function () {

            if (this.isNew()) {
                return "/actors";
            } else {
                return "/actor/" + this.get("_id");
            }
        }

    });

})();