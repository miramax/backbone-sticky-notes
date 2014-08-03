var app = app || {};

app.Models.Sticky = Backbone.Model.extend({
    defaults: {
        color: 'yellow',
        content: '',
        nailed: false,
        offsetTop: '100',
        offsetLeft: '100',
        fontSize: '18',
        fontFamily: 'Arial'
    },

    toggleNail: function () {
        this.save({
            nailed: !this.get('nailed')
        });
    },

    savePosition: function (top, left) {
        this.save({
            offsetTop: top + 'px',
            offsetLeft: left + 'px'
        })
    },

    isNailed: function () {
        return this.get('nailed') === true;
    }
});