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

        ViewsInstances: {},

        Vent: _.extend({}, Backbone.Events)
        
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

    APP.showItemsList = function(list, page, order, search) {

        var name = list.split("-")[0],
            colname = APP.Utils.capitalize(name) + "List";

        var page = page || 1,
                skip = (page - 1) * 5,
                order = order || ((name === "rents") ? -1 : 1),
                search = search || "",
                limit = (name === "categories") ? 0 : 5;
            var items = new APP.Collections[colname]();
            var view = new APP.Views[colname]({ 
                collection: items,
                page: page,
                order: order,
                search: search
             });

            APP.showMainView(view);

            items.fetch({
                reset: true,
                data: {
                    limit: limit,
                    skip : skip,
                    order: order,
                    name: search
                }
            });

            APP.Views.Navigation.highlight(name);

    },

    APP.showItemDetails = function(item, id) {

        var name = item.split("-")[0],
            modelName = APP.Utils.capitalize(name),
            viewName = APP.Utils.capitalize(name) + "Details";

        var item = new APP.Models[modelName]({_id: id}),
            itemView = new APP.Views[viewName]({model: item});

            item.fetch({reset: true});

            APP.showMainView(itemView);
            APP.Views.Navigation.highlight(name);
    };

    APP.showItemEdit = function(item, id) {

        var name = item.split("-")[0],
            modelName = APP.Utils.capitalize(name),
            viewName = APP.Utils.capitalize(name) + "Edit";

        var item = new APP.Models[modelName]({_id: id}),
            itemView = new APP.Views[viewName]({model: item});

            item.fetch({reset: true});

            APP.showMainView(itemView);
            APP.Views.Navigation.highlight(name);
    };

    APP.showItemNew = function(item, id) {

        var name = item.split("-")[0],
            modelName = APP.Utils.capitalize(name),
            viewName = APP.Utils.capitalize(name) + "New";

        var item = new APP.Models[modelName](),
            itemView = new APP.Views[viewName]({model: item});

            APP.showMainView(itemView);
            APP.Views.Navigation.highlight(name);
    };

    APP.CRUD = {

        createItem: function (e) {

            e.preventDefault();

            this.model.save({}, { wait: true });
        },

        updateItem: function(e) {

            e.preventDefault();

            var model = this.model;

            this.model.save(null, {
                wait: true,
                success: function() {
                    model.trigger('update');
                }
            })

        },
        deleteItem: function () {

            var model = this.model;

            APP.Messages.showRemovePrompt(function() {
                model.destroy({wait: true});
            });

        },

    };

    APP.Router = {

        handleRoute: function(route, params) {

            params.unshift(route);

            if(route.match(/(.+)-list/)) {

                APP.showItemsList.apply(APP, params);

            } else if (route.match(/(.+)-details/)) {

                APP.showItemDetails.apply(APP, params);

            } else if (route.match(/(.+)-edit/)) {

                APP.showItemEdit.apply(APP, params);

            } else if (route.match(/(.+)-new/)) {

                APP.showItemNew.apply(APP, params);

            }

        },
        setupRoutes: function() {
            
            APP.router = new APP.Routers.Router();

            APP.Vent.listenTo(APP.router, 'route', APP.Router.handleRoute);

        },

        redirectToList: function() {
            var url = this.model.url(true);

            APP.router.navigate(url, {trigger: true});
        },

        redirectToDetails: function() {
            var url = this.model.url();

            APP.router.navigate(url, {trigger: true});
        },

        redirectToEdit: function() {
            var url = this.model.url();

            APP.router.navigate(url + "/edit", {trigger: true});
        }

    };

    APP.init = function() {

        APP.Router.setupRoutes();

        APP.showBreadcrumbsView();
        APP.showStatisticsView();
        APP.showLatestRentsView();

        Backbone.history.start({pushState:true});

    };

    APP.Utils = {

        capitalize: function(text) {

            return text.charAt(0).toUpperCase() + text.slice(1);

        }

    };

    APP.Messages = {

        displayDialog: function(title, text, type, buttons) {

            return new $.Zebra_Dialog(text, {
                type: type,
                title: title,
                buttons: buttons
            })
        },
        showErrorInfo: function() {

            APP.Messages.displayDialog("Wystąpił błąd", this.model.validationError, "error");

        },
        showAddedInfo: function() {

            APP.Messages.displayDialog("Zapisano", "Rekord został poprawnie zapisany", "information");

        },
        showUpdateInfo: function(model) {

            APP.Messages.displayDialog("Zaktualizowano", "Aktualizacja przebiegła pomyślnie", "information");

        },
        showRemoveInfo: function(model) {

            APP.Messages.displayDialog("Usunięto", "Rekord został usunięty", "information");

        },
        showRemovePrompt: function (callback) {
            
                var buttons = [
                {
                    caption: "Tak",
                    callback: callback
                },
                {
                    caption: "Anuluj"
                }
                ];

            APP.Messages.displayDialog("Potwierdzenie usunięcia", "Czy na pewno chcesz usunąć?", "warning", buttons);

        },

    }

})();