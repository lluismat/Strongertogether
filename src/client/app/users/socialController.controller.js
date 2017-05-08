(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('socialController', socialController);

    socialController.$inject = ['dataservice', '$state', '$timeout', '$rootScope', 'logger', '$cookieStore'];

  function socialController(dataservice, $state, $timeout, $rootScope, logger, $cookieStore) {
      var vm = this;
      vm.title = 'socialController';

      social();

    function social() {
      console.log('Entra en social Controller');
      dataservice.socialLogin().then(function(response) {

          console.log(response.data);

          $cookieStore.put('session', {
              user: response.data.username,
              avatar: response.data.avatar
          });
          $rootScope.Session = true;
          $rootScope.username = response.data.username;
          $rootScope.avatar = response.data.avatar;
          $rootScope.tipo = response.data.tipo;
          logger.success('Usuario autentificado con exito, Bienvenido a Strongertogether');
        $state.go('home');
        console.log(response);
        console.log('username: ' + response.data.username);
      });
    }
  }
})();

