(function () {
    APP.Views.CategoryEdit = Backbone.View.extend({

        tagName: "div",

        template: _.template($("#categoryEditNewViewTemplate").html()),

        initialize: function () {

            this.listenToOnce(this.model, 'change', this.render);
            this.listenToOnce(this.model, 'destroy', this.redirectToCategories);
            this.listenTo(this.model, 'invalid', this.showErrorInfo);

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

            this.model.save({}, { wait: true });
        },
        deleteCategory: function () {

            const confirmation = confirm("Czy na pewno chcesz usunac?");

            if (confirmation) {
                this.model.destroy({ wait: true });
            }

        },
        showErrorInfo: function(model) {

            alert(model.validationError);

        },
        redirectToCategories: function () {

            APP.router.navigate("/categories", { trigger: true });

        }
    })
})();