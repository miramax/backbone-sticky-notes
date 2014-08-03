var app = app || {};

app.Collections.Stickies = Backbone.Collection.extend({

    model: app.Models.Sticky,

    localStorage: new Backbone.LocalStorage('stickies-backbone'),

    initialize: function() {}
});