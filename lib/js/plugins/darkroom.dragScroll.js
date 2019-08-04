(function() {
'use strict';

Darkroom.plugins['dragScroll'] = Darkroom.Plugin.extend({

  initialize: function InitDarkroomDragScrollPlugin() {
    this.imageContainer = (this.darkroom.containerElement.firstChild);

    this.imageContainer.addEventListener('mousedown', this.mousedown.bind(this));
    this.imageContainer.addEventListener('mouseup', this.mouseup.bind(this));
    this.imageContainer.addEventListener('mousemove', this.mousemove.bind(this));
  },

  mousedown: function mousedown(e) {
    this.clicked = true;
    this.lastPageY = e.pageY;
    this.lastPageX = e.pageX;


    this.lastClientY = e.clientY;
    this.lastClientX = e.clientX;
    e.preventDefault();
  },

  mouseup: function mouseup() {
    this.clicked = false;
    // $('html').css('cursor', 'auto');
  },

  mousemove: function mousemove(e) {
    if (this.clicked) {
      this.imageContainer.scrollTop += this.lastPageY - e.pageY;
      this.imageContainer.scrollLeft += this.lastPageX - e.pageX;

      // this.imageContainer.scrollTop += this.lastClientY - e.clientY;
      // this.imageContainer.scrollLeft += this.lastClientX - e.clientX;
    }

  },

});

})();
