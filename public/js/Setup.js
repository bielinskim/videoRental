(function() {

    window.APP = {
        Models: {},
        Collections: {},
        Views: {},
        Routers: {},

        Regions: {
            appContent: $(".app-content")
        },

        ViewsInstances: {}
        
    };

    APP.showMainView = function(view) {

        if(APP.ViewsInstances.mainView) {

            var childViews = APP.ViewsInstances.mainView.childViews;

            if(childViews) {

                _.each(childViews, function(childView){
                    
                    childView.remove();

                });

            }

            APP.ViewsInstances.mainView.remove();
        }

        APP.ViewsInstances.mainView = view;
    };

})();