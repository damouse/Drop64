angular.module('controller', [])
  .directive('myTouchstart', [function() {
    return function(scope, element, attr) {

      element.on('touchstart', function(event) {
        scope.$apply(function() {
          scope.$eval(attr.myTouchstart);
        });
      });
    };
  }]).directive('myTouchend', [function() {
    return function(scope, element, attr) {

      element.on('touchend', function(event) {
        scope.$apply(function() {
          scope.$eval(attr.myTouchend);
        });
      });
    };
  }])

.controller('RootController', function($scope, $location) {
  var socket = io.connect($location.$$host + ':' + $location.$$port);
  $scope.counter = 0;

  $scope.touchesStarted = function() {
    console.log("Touch Started");
    $scope.counter++;
  }


  $scope.press = function(b, k) {
    socket.emit("controller", { event: 'keydown', button: b, code: k });
  };

  // Touch stopped
  $scope.release = function(b, k) {
    socket.emit("controller", { event: 'keyup', button: b, code: k });
  };
})

/**
 * Add handlers to dpad-buttons
 */
