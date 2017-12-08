(function () {

  angular.module('roomStateIndicatorApp', []);

  angular
    .module('roomStateIndicatorApp')
    .controller('homeCtrl', homeCtrl)
    .service('appData', appData);

    homeCtrl.$inject = ['$scope', 'appData'];
    function homeCtrl ($scope, appData) {
      var vm = this;

      vm.statesAsWord = ['уулзах боломжтой', 'дотоод ажилтай', 'ажилдаа ирээгүй', 'чөлөөтэй байгаа'];
      vm.getData = function() {
        var promise = appData.workersList();
        promise.then(function(response) {
          vm.data = response.data;
         // console.log(response.data);
        })
        .catch(function(err) {
          console.log("Error! Promise", err);
        });
      };
  
      vm.getData();


      vm.postData = function(workerId, room, state) {
        var promise = appData.stateChange(workerId, room, state);
        promise
        .then(function(response) {
          vm.getData();
        })
        .catch(function(err) {
          console.log("Error! Promise", err);
        });
      }
    }

    appData.$inject = ['$http'];
    function appData ($http) {
      var service = this;
      service.workersList = function () {
        return $http.get('/api/route/workers');
      };

      service.stateChange = function (workerId, room, newState) {
        var data = {
          workerId: workerId,
          room: room,
          state: newState
        };
        return $http.post('/api/route/workers', data);
      };

    }


})();