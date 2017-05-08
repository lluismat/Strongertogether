(function() {
  'use strict';

  angular
    .module('app.contact')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'contact',
        config: {
          url: '/contacto',
          templateUrl: 'app/contact/contact.html',
          controller: 'ContactController',
          controllerAs: 'vm',
          title: 'Contacto'
        }
      }
    ];
  }
})();
