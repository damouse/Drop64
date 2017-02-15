// Same 
angular.module('controller', [])
  .controller('RootController', function($scope) {
    var socket = io.connect('localhost:3000');

    $scope.press = function(b, k) {
      socket.emit("controller", { event: 'keydown', button: b, code: k });
    };

    // Touch stopped
    $scope.release = function(b, k) {
      socket.emit("controller", { event: 'keyup', button: b, code: k });
    };
  })
