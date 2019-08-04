(function() {
'use strict';

var ZOOM_MAX = 23;
var ZOOM_IN_FACTOR = 1.1;
var ZOOM_OUT_FACTOR = 1/ZOOM_IN_FACTOR;

var Zoom = Darkroom.Transformation.extend({
  applyTransformation: function(canvas, image, next) {
    var factor = this.options.factor;
    if (factor > 0) {
      if(canvas.getZoom().toFixed(5) > ZOOM_MAX){
          console.log("zoomIn: Error: cannot zoom-in anymore");
          return;
      }
    } else {
      if( canvas.getZoom().toFixed(5) <=1 ){
        console.log("zoomOut: Error: cannot zoom-out anymore");
        return;
      }
    }
    image.setScaleX(image.getScaleX() * factor);
    image.setScaleY(image.getScaleY() * factor);

    canvas.centerObject(image);
    image.setCoords();
    canvas.renderAll();

    next();
  }
});

Darkroom.plugins['zoom'] = Darkroom.Plugin.extend({

  initialize: function InitDarkroomZoomPlugin() {
    var buttonGroup = this.darkroom.toolbar.createButtonGroup();

    var leftButton = buttonGroup.createButton({
      image: 'zoom-in'
    });

    var rightButton = buttonGroup.createButton({
      image: 'zoom-out'
    });

    leftButton.addEventListener('click', this.zoomIn.bind(this));
    rightButton.addEventListener('click', this.zoomOut.bind(this));
  },

  zoomIn: function zoomIn() {
    this.zoom(ZOOM_IN_FACTOR);
  },

  zoomOut: function zoomOut() {
    this.zoom(ZOOM_OUT_FACTOR);
  },

  zoom: function zoom(factor) {
    this.darkroom.applyTransformation(
      new Zoom({factor: factor})
    );
  }

});

})();
