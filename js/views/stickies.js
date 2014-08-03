var app = app || {};

app.Views.Stickies = Backbone.View.extend({
    el: '#stickies-app',

    initialize: function () {
        this.$listContainer = this.$('#stickies-list');
        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'reset', this.addAll);

        this.collection.fetch();
    },

    events: {
        'click #add': 'appendNew'
    },

    render: function () {
        this.delegateEvents();
        return this;
    },

    addOne: function ( sticky ) {
        var view = new app.Views.Sticky({ model: sticky });
        var element = view.render().el;
        this.$listContainer.append( element );
    },

    addAll: function () {
        console.log('add all...');
        this.$listContainer.empty();
        this.collection.each( this.addOne, this );
    },

    appendNew: function () {
        this.collection.create({
            offsetTop: Math.round(Math.random() * 300) + 'px',
            offsetLeft: Math.round(Math.random() * 500) + 'px'
        }, {
            success: function (model) {

            }.bind(this)
        });
    }
});