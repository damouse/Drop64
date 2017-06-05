angular.module('controller', [])

.directive('myTouchstart', [function() {
  return function(scope, element, attr) {
    element.on('touchstart', function(event) {
      scope.$apply(function() {
        scope.$eval(attr.myTouchstart);
      });
    });

    element.on('mousedown', function(event) {
      scope.$apply(function() {
        scope.$eval(attr.myTouchstart);
      });
    });
  };
}])

.directive('myTouchend', [function() {
  return function(scope, element, attr) {
    element.on('touchend', function(event) {
      scope.$apply(function() {
        scope.$eval(attr.myTouchend);
      });
    });

    element.on('mouseup', function(event) {
      scope.$apply(function() {
        scope.$eval(attr.myTouchend);
      });
    });
  };
}])

/*
Impromptu gesture testing

From Prediction:
  y > .5 = left
  y < -.5 = right
  z > .5 = forward
*/
.controller('RootController', function($scope, $location) {
  var socket = io.connect($location.$$host + ':' + $location.$$port);

  // Are we currently "turning"?
  var isGestureTurningLeft = false;
  var isGestureTurningRight = false;
  var isGestureForward = false;

  socket.on('connect', function() {
    socket.emit('command', 'Controller Connected');
  });

  $scope.press = function(b, k) {
    socket.emit("controller", { event: 'keydown', button: b, code: k });
  };

  $scope.release = function(b, k) {
    socket.emit("controller", { event: 'keyup', button: b, code: k });
  };

  $scope.accel = 0;

  // Main gesture recognition loop
  setInterval(function() {
    loop();
    var prediction = predictHistory.get(predictHistory.length - 1);

    if (!prediction)
      return;

    // Constant checks for recognizing gestures
    var newGestureLeft = prediction.y > 0.3;
    var newGestureRight = prediction.y < -0.3;
    var newGestureForward = prediction.z > 0.5;

    if (newGestureLeft && !isGestureTurningLeft)
      $scope.press('ArrowLeft', 37);

    if (!newGestureLeft && isGestureTurningLeft)
      $scope.release('ArrowLeft', 37);

    if (newGestureRight && !isGestureTurningRight)
      $scope.press('ArrowRight', 39);

    if (!newGestureRight && isGestureTurningRight)
      $scope.release('ArrowRight', 39);

    if (newGestureForward && !isGestureForward)
      $scope.press('g', 71);

    if (!newGestureForward && isGestureForward)
      $scope.release('g', 71);

    isGestureTurningLeft = newGestureLeft;
    isGestureTurningRight = newGestureRight;
    isGestureForward = newGestureForward;
  }, 10);
})

// $scope.accel = predictHistory.get(predictHistory.length - 1);
// console.log(predictHistory);
// console.log($scope.accel);
// $scope.$apply();
