var app = app || {};
app.Routes.Main = Backbone.Router.extend({
    routes: {
        "sticky": "stickyAction",
        "": "indexAction"
    },

    indexAction: function () {
        // redirect in main application path
        this.navigate('sticky', {
            trigger: true,
            replace: true
        });
    },

    stickyAction: function() {
        var stickiesCollection = new app.Collections.Stickies();
        new app.Views.Stickies({
            collection: stickiesCollection
        });
    }
});