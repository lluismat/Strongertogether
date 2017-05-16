(function() {
  'use strict';

  angular
    .module('app.profile')
    .run(appRun);

  appRun.$inject = ['routerHelper','dataservice'];

  function appRun(routerHelper,dataservice) {
    routerHelper.configureStates(getStates(dataservice));
  }

  function getStates(dataservice) {
    return [
      {
        state: 'perfil',
        config: {
          url: '/perfil',
          templateUrl: 'app/profile/profile.html',
          controller: 'ProfileController',
          controllerAs: 'vm',
          title: 'Perfil'
        }
      }
    ];
  }
})();
