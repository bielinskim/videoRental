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
            APP.ViewsInstances.mainView.remove();
        }

        APP.ViewsInstances.mainView = view;
    };

})();