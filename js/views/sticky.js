var app = app || {};

app.Views.Sticky = Backbone.View.extend({

    template: _.template($('#sticky-front-tpl').html()),

    tagName: 'div',

    className: 'sticky',

    events : {
        'click .destroy': 'destroySticky',
        'input textarea': 'saveOnTextEnter',
        'click .back': 'showSettings',
        'click .apply' : 'applyChanges',
        'mouseup': 'saveStickyPosition',
        'mouseenter'   : 'hoverOn',
        'mouseleave'   : 'hoverOff'
    },

    initialize: function () {
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'change:nailed', this.toggleNail);
        this.listenTo(this.model, 'change:id', this.render);

        this.on('changeView', this.render);
    },

    render: function() {
        var tplVariables = _.extend( this.model.toJSON(), { id: this.getId() } );
        this.$el.html( this.template( tplVariables ) );

        this.$el.addClass(this.model.get('color'));

        this.$el.css({
            'top': this.model.get('offsetTop'),
            'left': this.model.get('offsetLeft')
        });

        this.$('textarea').css({
            'fontFamily': this.model.get('fontFamily'),
            'fontSize': this.model.get('fontSize')
        });

        this.$('.font-family').val(this.model.get('fontFamily'));
        this.$('.font-size').val(this.model.get('fontSize'));

        this.setColorValue( this.model.get('color') );

        if ( ! this.model.nailed ) {
            this.$el.drags({cursor: 'default'});
        }

        this.delegateEvents();
        return this;
    },

    hoverOn: function () {
        this.$('.destroy').fadeIn();
    },

    hoverOff: function () {
        this.$('.destroy').fadeOut();
    },

    toggleNail: function() {
        this.model.toggleNail();
        if (this.model.isNailed()) {
            // clear drag
            this.$el.off('mousedown');
        } else {
            // add drag
            this.$el.drags({cursor: 'default'});
        }
    },

    destroySticky: function () {
        this.model.destroy();
    },

    saveOnTextEnter: function () {
        this.model.save({
            content: this.$('textarea').val().trim()
        })
    },

    saveStickyPosition: function () {
        var offset = this.$el.offset();

        this.model.save({
            offsetTop: offset.top,
            offsetLeft: offset.left
        })
    },

    getColorValue: function () {
        console.log($('.color-'+ this.getId() +':checked').length);
        console.log('.color-'+ this.getId() +':checked');
        return this.$('.color-'+ this.getId() +':checked').val();
    },

    setColorValue: function (color) {
        this.$('input'+'[value="'+color+'"]').attr('checked', true);
    },

    showSettings: function () {
        this.$('.sticky-content').hide();
        this.$el.animate( { backgroundColor: '#575757' }, 1000, function () {
            this.$('.back-panel').show();
        }.bind(this));
    },

    getNewAttributes: function() {
        return {
            fontFamily: this.$('.font-family').val(),
            fontSize: this.$('.font-size').val(),
            color: this.getColorValue()
        }
    },

    applyChanges: function () {
        this.$el.removeClass(this.model.get('color'));
        var attr = this.getNewAttributes();
        console.log(attr);
        this.model.save(attr, {
            success: function () {
                this.$('.back-panel').fadeOut(function() {
                    this.$el.animate( { backgroundColor: app.Constants[attr.color] }, 1000, function () {
                        this.trigger('changeView');
                    }.bind(this));
                }.bind(this));
            }.bind(this)
        });

    },

    getId: function () {
        return this.model.get('id') || this.model.cid;
    }

});