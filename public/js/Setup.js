(function() {

    window.APP = {
        Models: {},
        Collections: {},
        Views: {},
        Routers: {},

        Regions: {
            appHeader: $(".app-header"),
            appContent: $(".app-content"),
            appSidebar: $(".app-content-sidebar")
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

    APP.showLatestRentsView = function() {

        if(APP.ViewsInstances.latestRents) {

            APP.ViewsInstances.latestRents.remove();
        }

        var latestRents = new APP.Collections.RentsList();


        APP.ViewsInstances.latestRents = new APP.Views.LatestRents({collection: latestRents});

        latestRents.fetch({
            reset: true,
            data: {
                limit: 3,
                order: -1
            }
        });
    };

    APP.showStatisticsView = function() {

        if(APP.ViewsInstances.statistics) {

            APP.ViewsInstances.statistics.remove();
        }

        APP.ViewsInstances.statistics = new APP.Views.Statistics();

    };

    APP.showBreadcrumbsView = function() {

        if(APP.ViewsInstances.breadcrumbs) {

            APP.ViewsInstances.breadcrumbs.remove();
        }

        APP.ViewsInstances.breadcrumbs = new APP.Views.Breadcrumbs();

    };

    APP.init = function() {

        APP.router = new APP.Routers.Router();

        APP.showBreadcrumbsView();
        APP.showStatisticsView();
        APP.showLatestRentsView();

        Backbone.history.start({pushState:true});

    };

})();
