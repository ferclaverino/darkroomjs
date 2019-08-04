(function() {
'use strict';

Darkroom.plugins['dragScroll'] = Darkroom.Plugin.extend({

  initialize: function InitDarkroomDragScrollPlugin() {
    this.imageContainer = this.darkroom.containerElement.firstChild;

    this.imageContainer.addEventListener('mousedown', this.mousedown.bind(this));
    this.imageContainer.addEventListener('mouseup', this.mouseup.bind(this));
    this.imageContainer.addEventListener('mousemove', this.mousemove.bind(this));

    this.speed = 0.1;
  },

  mousedown: function mousedown(e) {
    if (!this.isCroping()) {
      this.clicked = true;
      this.lastClientY = e.clientY;
      this.lastClientX = e.clientX;
      e.preventDefault();
    }
  },

  mouseup: function mouseup() {
    if (!this.isCroping()) this.clicked = false;
  },

  mousemove: function mousemove(e) {
    if (!this.isCroping() && this.clicked) {
      this.imageContainer.scrollTop += (this.lastClientY - e.clientY) * this.speed;
      this.imageContainer.scrollLeft += (this.lastClientX - e.clientX) * this.speed;
    }
  },

  isCroping: function isCroping() {
    return this.darkroom.canvas.defaultCursor === 'crosshair';
  }

});

})();
