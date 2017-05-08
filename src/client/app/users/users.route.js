(function() {
  'use strict';

  angular
    .module('app.users')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
        state: 'users',
        config: {
          url: '/login',
          templateUrl: 'app/users/login.view.html',
          controller: 'LoginController',
          controllerAs: 'vm',
          title: 'Login'
        }
      },
      {
          state: 'socialLogin',
          config: {
            url: '/socialLogin',
            controller: 'socialController'
          }
      },
        {
            state: 'verify',
            config: {
                url: '/verify?id',
                controller: 'verifyController'
            }
        },
        {
            state: 'recovery',
            config: {
                url: '/recovery?id',
                templateUrl: 'app/users/changePass.view.html',
                controller: 'recoveryController'
            }
        }
    ];
  }
})();
