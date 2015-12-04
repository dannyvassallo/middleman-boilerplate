/*
 * Turn.js responsive book
 */

/*globals window, document, $*/

(function () {
    'use strict';

    var module = {
        ratio: 1.97,
        init: function (id) {
            var me = this;

            // if older browser then don't run javascript
            if (document.addEventListener) {
                this.el = document.getElementById(id);
                this.resize();
                this.plugins();

                // on window resize, update the plugin size
                window.addEventListener('resize', function (e) {
                    var size = me.resize();
                    $(me.el).turn('size', size.width, size.height);
                });
            }
        },
        resize: function () {
            // reset the width and height to the css defaults
            this.el.style.width = '';
            this.el.style.height = '';

            var width = this.el.clientWidth,
                height = Math.round(width / this.ratio),
                padded = Math.round(document.body.clientHeight * 0.9);

            // if the height is too big for the window, constrain it
            if (height > padded) {
                height = padded;
                width = Math.round(height * this.ratio);
            }

            // set the width and height matching the aspect ratio
            this.el.style.width = width + 'px';
            this.el.style.height = height + 'px';

            return {
                width: width,
                height: height
            };
        },
        plugins: function () {
            // run the plugin
            $(this.el).turn({
                page: 2,
                gradients: true,
                acceleration: true,
                when: {
                    start: function(event, pageObject, corner) {
                       if (pageObject.next==1)
                         event.preventDefault();
                    },
                    turning: function(event, page, view) {
                       if (page==1)
                          event.preventDefault();
                    }
                }
            });
        }
    };

    module.init('book');
}());

// left and right keys
$(document).keydown(function(e){

    var previous = 37, next = 39;

    switch (e.keyCode) {
        case previous:

            $('.book').turn('previous');

        break;
        case next:

            $('.book').turn('next');

        break;
    }

});

