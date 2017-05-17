(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$q', '$rootScope', 'dataservice', 'logger', '$state', '$cookieStore'];
  /* @ngInject */
  function LoginController($q, $rootScope, dataservice, logger, $state, $cookieStore) {
        var vm = this;
        vm.inputEmail = '';
        vm.inpputUsername = '';
        vm.inpputUser = '';
        vm.inputPass = '';
        vm.submitSignUp = submitSignUp;
        vm.submitLogin = submitLogin;
        vm.recoveryPassword = recoveryPassword;

        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'login';

      function recoveryPassword(){
          var data = {
              'email': vm.inputEmail
          };

          dataservice.recoveryPass(data).then(function (response) {

              if (response.data.email) {
                  logger.success('Peticion recibida con exito, en breve recibira un correo para poder cambiar la contraseña.');
                  $rootScope.closeModal();
                  $state.go('home');
              }else{
                  logger.error('Ups, ha habido un error en el server, vuelve a intentarlo más tarde');
              }
          });
      }
            ///signup local
          function submitSignUp(){
            var data = {
                'username' : vm.inputUsername,
                'email'    : vm.inputEmail,
                'pass'     : vm.inputPass,
                'avatar'   : "default_user.png",
                'tipo'     : "usuario"
            };

            dataservice.signUp(data).then(function (response) {
              if (response.data===true) {
                  logger.success('Usuario registrado con exito.');
                  $rootScope.closeModal();
                  $state.go('home');
                }else if (response.data === 'signuperror') {
                  logger.error('El Usuario introducido ya existe.');
                }else{
                  logger.error('Ups, ha habido un error en el server.');
                }
            });
          }

          ///login local
        function submitLogin(){
          var data = {
            'user': vm.inputUser,
            'pass': vm.inputPass
                };

                dataservice.login(data).then(function (response) {
                    if ((response.data.username == vm.inputUser || response.data.email == vm.inputUser) && response.data != undefined) {
                        $cookieStore.put('session', {
                            user: response.data.username,
                            avatar: response.data.avatar
                        });
                        $rootScope.Session = true;
                        $rootScope.username = response.data.username;
                        $rootScope.avatar = response.data.avatar;
                        $rootScope.tipo = response.data.tipo;
                        logger.success('Usuario autentificado con exito, Bienvenido de nuevo a Strongertogether');
                        $state.go('home');
                        $rootScope.closeModal();
                    } else if (response.data == 'loginerror') {
                            logger.error('Ha habido un error en la autentificación, el email o la contraseña introducidos no son correctos');
                    } else {
                            logger.error('Ups, ha habido un error en el server.');
                    }
                });
            }
  }
})();
