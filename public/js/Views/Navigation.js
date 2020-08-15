(function () {

    APP.Views.Navigation = {
        menu: $(".app-sidebar-nav a"),
        tabs: $(".app-main-tabs"),
        tabItems: $(".app-main-tabs a"),

        highlight: function (route) {

            var names = {
                "movie": "movies",
                "movies": "movies",
                "actor": "actors",
                "actors": "actors",
                "category": "categories",
                "categories": "categories",
                "rent": "rents",
                "rents": "rents",
                "client": "clients",
                "clients": "clients"
            };

            var tabItem = this.tabItems.filter("[href='/" + names[route] + "']"),
                tab = tabItem.parent(),
                tabsId = tab.attr("id"),
                menuItem = this.menu.filter("[data-id='" + tabsId + "']")

            this.menu.removeClass("active");
            this.tabs.removeClass("active");
            this.tabItems.removeClass("active");

            menuItem.addClass("active");
            tab.addClass("active");
            tabItem.addClass("active");
        }
    }

})();