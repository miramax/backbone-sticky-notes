var app = app || {};

window.app = {
    Views: {},
    Models: {},
    Collections: {},
    Routes: {},
    router: null,
    Constants: {
        yellow: '#fff2aa',
        blue: '#a1f2fe',
        green: '#dafd8d'
    },

    initialize: function () {
        app.router = new app.Routes.Main();
        Backbone.history.start();
    }
};