// Implementation of the NES controller, kept seperately from the angular, controller implementation
// because of the order of the imports 
(function() {
  "use strict";
  var pad = document.getElementById("dpad"),
    i = 0,
    padbuttons = pad.getElementsByClassName("button"),

    click = function() {
      pad.className = this.id;
      document.onmouseup = function() {
        pad.className = "";
      };
    };

  for (i = 0; i < padbuttons.length; i += 1) {
    padbuttons[i].onmousedown = click;
  }
}());

/**
 * Draw d-pad
 */

(function() {
  "use strict";
  var canvas = document.getElementById("dpad-body");

  function angularShape(canvas, coords) {
    var shape = canvas.getContext("2d"),
      i = 0;
    shape.beginPath();
    shape.moveTo(coords[0][0], coords[0][1]);
    coords.slice(1);

    for (i = 0; i < coords.length; i += 1) {
      shape.lineTo(coords[i][0], coords[i][1]);
    }

    shape.closePath();
    return shape;
  }

  function linearFill(shape, color1, color2, coords) {
    var bg = shape.createLinearGradient(coords[0], coords[1], coords[2], coords[3]);
    bg.addColorStop(0, color1);
    bg.addColorStop(1, color2);
    shape.fillStyle = bg;
    shape.fill();
  }

  function ySide(canvas, y, xFrom, xTo) {
    var shape = angularShape(canvas, [
      [y, xFrom],
      [y + 5, xFrom + 3.5],
      [y + 5, xTo + 3.5],
      [y, xTo]
    ]);
    linearFill(shape, "#666", "#000", [y, xFrom, y + 15, xFrom]);
  }

  function xSide(canvas, x, yFrom, yTo) {
    var shape = angularShape(canvas, [
      [yFrom, x],
      [yFrom + 5, x + 3.5],
      [yTo + 5, x + 3.5],
      [yTo, x]
    ]);
    linearFill(shape, "#666", "#000", [yFrom, x, yFrom, x + 15]);
  }

  // draw the sides first
  xSide(canvas, 63.5, 0, 100);
  xSide(canvas, 100, 36.5, 63.5);
  ySide(canvas, 63.5, 0, 36.5);
  ySide(canvas, 63.5, 63.5, 100);
  ySide(canvas, 100, 36.5, 63.5);

  // draw the d-pad
  var plus = angularShape(canvas, [
    [0, 36.5],
    [36.5, 36.5],
    [36.5, 0],
    [63.5, 0],
    [63.5, 36.5],
    [100, 36.5],
    [100, 63.5],
    [63.5, 63.5],
    [63.5, 100],
    [36.5, 100],
    [36.5, 63],
    [0, 63.5]
  ]);

  plus.fillStyle = "#1a1a1a";
  plus.shadowColor = "rgba(0, 0, 0, 0.6)";
  plus.shadowBlur = 15;
  plus.shadowOffsetX = 20;
  plus.shadowOffsetY = 10;
  plus.fill();
}());
