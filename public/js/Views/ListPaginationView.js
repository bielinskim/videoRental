(function() {
    
    APP.Views.ListPagination = Backbone.View.extend({

        tag: "div",
        className: "app-items-pagination",

        template: _.template($("#listPaginationTemplate").html()),

        initialize: function(options) {

            this.options = options;

            $.ajax({
                
                url: "/info/" + this.options.collectionName,
                context: this

            }).done(function(items){
                if(items > 5) {
                    this.render(items);
                } else {
                    this.remove();
                }

            });

        },
        render: function(items) {

            var anchors = Math.ceil(items/5),
                page = this.options.page,
                active = page ? page : 1;

            this.$el.html(this.template({anchors: anchors, active: active}));

            return this;

        },

        events: {
            "click a": "goToPage"
        },

        goToPage: function(e) {

            e.preventDefault();

            var page = $(e.target).data("page"),
                url = this.options.collectionName + "/page/" + page + "/order/" + this.options.order;


            APP.router.navigate(url, {trigger:true});

        }

    });

})();