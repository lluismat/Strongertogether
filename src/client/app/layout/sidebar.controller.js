(function() {
  'use strict';

  angular
      .module('app.layout')
      .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$state','routerHelper', '$cookieStore', 'dataservice', '$uibModal', '$rootScope', '$q', 'logger'];
  /* @ngInject */
  function SidebarController($state, routerHelper, $cookieStore, dataservice, $uibModal, $rootScope, $q, logger) {
    var vm = this;

    var states = routerHelper.getStates();
      vm.openModal = openModal;
      vm.openSignUp = openSignUp;
      vm.showLogin = showLogin;
      vm.logout = logout;
      vm.openRecoveryPass = openRecoveryPass;

      showLogin();


      function logout() {
          console.log("logout");
          $cookieStore.remove('session');
          $rootScope.Session = false;

        logger.success('Has cerrado sesión con exito!');

          //redirigimos al home
          $state.go('home');
      }

      function showLogin() {
          //al cargarse la pagina por primera vez, user es undefined
          var user = $cookieStore.get('session');
          if (user != undefined) {
              $rootScope.Session = true;
              $rootScope.username = user.user;
              $rootScope.avatar = user.avatar;
              $rootScope.tipo = user.tipo;
          } else {
              $rootScope.Session = false;
          }
      }

    //funcion para abrir el modal signin
    function openModal(){
      var modalInstance = $uibModal.open({
        animation: 'true',
        templateUrl: 'app/users/login.view.html',
        controller: 'modalController',
        size: ''
      });
    }

    //funcion para abrir el modal signup
    function openSignUp(){
      var modalInstance = $uibModal.open({
        animation: 'true',
        templateUrl: 'app/users/sign_up.view.html',
        controller: 'modalController',
        size: ''
      });
    }

      //funcion para abrir el modal de recuperar contraseña
      function openRecoveryPass(){
          var modalInstance = $uibModal.open({
              animation: 'true',
              templateUrl: 'app/users/recoveryPassword.view.html',
              controller: 'modalController',
              size: ''
          });
      }

  }
})();