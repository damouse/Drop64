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
  }]).directive('myTouchend', [function() {
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


.controller('RootController', function($scope, $location) {
  var socket = io.connect($location.$$host + ':' + $location.$$port);
  $scope.counter = 0;

  console.log("HELLO")

  socket.on('connect', function() {
    socket.emit('command', 'Controller Connected');
  });


  $scope.press = function(b, k) {
    $scope.counter++;
    socket.emit("controller", { event: 'keydown', button: b, code: k });
  };

  // Touch stopped
  $scope.release = function(b, k) {
    $scope.counter++;
    socket.emit("controller", { event: 'keyup', button: b, code: k });
  };
})
