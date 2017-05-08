(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('modalController', modalController);

  modalController.$inject = ['$q', '$rootScope', 'dataservice', 'logger', '$uibModalInstance'];
  /* @ngInject */
  function modalController($q, $rootScope, dataservice, logger, $uibModalInstance) {
    var vm = this;

    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'modal';

    $rootScope.closeModal = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
