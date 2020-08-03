(function () {
    APP.Views.CategoryEdit = Backbone.View.extend({

        tagName: "div",

        template: _.template($("#categoryEditNewViewTemplate").html()),

        initialize: function () {

            this.listenToOnce(this.model, 'change', this.render);
            this.listenToOnce(this.model, 'destroy', this.redirectToCategories);
            this.listenToOnce(this.model, 'destroy', this.showRemoveInfo);
            this.listenTo(this.model, 'invalid', this.showErrorInfo);
            this.listenTo(this.model, 'update', this.showUpdateInfo);

        },
        render: function () {

            var html = this.template(this.model.toJSON());

            this.$el.html(html);

            APP.Regions.appContent.html(this.el);

            this.stickit();
        },
        bindings: {
            "#category-name": "name",
        },
        events: {
            "submit form": "updateCategory",
            "click .delete": "deleteCategory"
        },
        updateCategory: function (e) {

            e.preventDefault();

            var model = this.model;

            this.model.save({}, { 
                wait: true,
                success: function() {
                    model.trigger("update");
                }
             });
        },
        deleteCategory: function () {

            var model = this.model;

            var zd = new $.Zebra_Dialog("Czy na pewno chcesz usunąć?", {
                type: "warning",
                title: "Potwierdzenie usunięcia",
                buttons: [
                    {
                    caption: "Tak",
                    callback: function() {
                        model.destroy({wait:true});
                    }
                },
                {
                    caption: "Anuluj"
                }
                ]
            });

        },
        showRemoveInfo: function(model) {

            var zd = new $.Zebra_Dialog("Rekord został usunięty", {
                type: "information",
                title: "Usunięto"
            });

        },
        showErrorInfo: function(model) {

            var zd = new $.Zebra_Dialog(model.validationError, {
                type: "error",
                title: "Wystąpił błąd"
            });

        },
        showUpdateInfo: function(model) {

            var zd = new $.Zebra_Dialog("Aktualizacja przebiegła pomyślnie", {
                type: "information",
                title: "Zaktualizowano"
            });

        },
        redirectToCategories: function () {

            APP.router.navigate("/categories", { trigger: true });

        }
    })
})();