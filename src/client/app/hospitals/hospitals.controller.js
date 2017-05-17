(function() {
'use strict';
angular
        .module('app.hospitals')
        .controller('hospitalsController', hospitalsController);

hospitalsController.$inject = ['$q', '$uibModal', 'dataservice','logger','$scope'];

/* @ngInject */
function hospitalsController($q, $uibModal, dataservice, logger, $scope) {
  var vm = this;
  vm.title = 'Hospitals';
  vm.hospitals = [];
  vm.filteredHospitals = [];
  vm.numPerPage = 20;
  vm.maxSize = 5;
  vm.currentPage = 1;
  vm.markers = [];
  vm.infoMarker = infoMarker;

  $scope.$watch(update);

  vm.map = {
                  center: { latitude: 39.1389498, longitude: -0.6615438 },
                  zoom: 9,
                  windows: {
                    model: {},
                    show: false,
                    options:{
                      pixelOffset: {width:-1,height:-20}
                    }
                  },
                  markersEvents: {
                    click: function(marker, eventName, model, args) {
                      vm.map.windows.model = model;
                      vm.map.windows.show = true;
                      for (var i = 0; i < vm.hospitals.length; i++) {
                        if (vm.hospitals[i].id === model.id) {
                          vm.infoWindow = vm.hospitals[i];
                        }
                      }
                    }
                  }
                };

  activate();

  function activate() {
    var promises = [getHospitals()];
    return $q.all(promises).then(function() {
            logger.info('Activated Hospitals View');
          });
  }

  function getHospitals() {
    return dataservice.getHospitals().then(function (data) {
            vm.hospitals = data;
            getMarkers(vm.hospitals);
            return vm.hospitals;
          });
  }

  function update() {
    var begin = ((vm.currentPage - 1) * vm.numPerPage), end = begin + vm.numPerPage;
    vm.filteredHospitals = vm.hospitals.slice(begin, end);
  }

  function getMarkers(hospitals) {
    for (var i = 0; i < hospitals.length; i++) {
      var latitude = hospitals[i].latitude;
      var longitude = hospitals[i].longitude;

      vm.Marker = { latitude:latitude, longitude:longitude, id:i };
      vm.markers.push(vm.Marker);
    }
    $scope.testMarkers = vm.markers;
  }

  function infoMarker(id) {
    $scope.selectedHospital = vm.hospitals[id];
    var modalInstance = $uibModal.open({
              animation: 'true',
              templateUrl: 'app/hospitals/infoHospitals.html',
              controller: 'hospitalsController',
              controllerAs: 'vm',
              scope: $scope,
              size: 'lg'
            });
  }
}
})();
