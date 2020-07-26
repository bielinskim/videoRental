(function() {

APP.Collections.MoviesList = Backbone.Collection.extend({

    model: APP.Models.Movie,

    url: "/movies"

});

})();