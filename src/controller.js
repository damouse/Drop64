angular.module('controller', [])
  .controller('RootController', function($scope, $location) {
    var socket = io.connect($location.$$host + ':' + $location.$$port);

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
