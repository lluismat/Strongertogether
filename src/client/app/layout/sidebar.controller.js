(function() {
  'use strict';

  angular
      .module('app.layout')
      .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$state','routerHelper', '$cookieStore', 'dataservice', '$uibModal', '$rootScope', '$q', 'logger', '$sce'];
  /* @ngInject */
  function SidebarController($state, routerHelper, $cookieStore, dataservice, $uibModal, $rootScope, $q, logger, $sce) {
    var vm = this;
      vm.mensajes = [];
      vm.requests = [];

    var states = routerHelper.getStates();
      vm.openModal = openModal;
      vm.openSignUp = openSignUp;
      vm.showLogin = showLogin;
      vm.logout = logout;
      vm.openRecoveryPass = openRecoveryPass;
      vm.showMessage = showMessage;
      vm.read_message = read_message;
      vm.getRequests = getRequests;
      vm.showRequest = showRequest;


      showLogin();

      function getRequests(user) {
          var data = {
              'user': user
          };

          return dataservice.getRequests(data).then(function(response) {
              vm.requests = response.data;
          });
      }

      function showMessages(user) {
          var data = {
              'user': user
          };

          return dataservice.getMensajes(data).then(function(response) {
              vm.mensajes = response.data;
          });
      }

      //funcion para ver un mensaje
      function showMessage(id){
          var promises = [getMessage(id)];
          return $q.all(promises).then(function() {
              var modalInstance = $uibModal.open({
                  animation: 'true',
                  templateUrl: 'app/profile/showMessage.html',
                  controller: 'modalController',
                  size: 'lg'
              });
              read_message(id);
          });
      }
      //funcion para ver un mensaje
      function showRequest(id){
          var promises = [getMessage(id)];
          return $q.all(promises).then(function() {
              var modalInstance = $uibModal.open({
                  animation: 'true',
                  templateUrl: 'app/profile/showPeticionAmistat.html',
                  controller: 'modalController',
                  size: 'lg'
              });
              read_message(id);
          });
      }

      function getMessage(id) {

          var data = {
              'id': id,
              'destinatario':$rootScope.username
          };
          return dataservice.showMessage(data).then(function(response) {
              if(response.data != "error"){
                  $rootScope.asunto = response.data.asunto;
                  $rootScope.mensaje = $sce.trustAsHtml(response.data.mensaje);
                  $rootScope.autor = response.data.autor;
                  $rootScope.id = response.data.id;
              }else{
                  logger.error('Ups, Ha habido un error y no se ha posido mostrar el mensaje en este momento');
              }
          });
      }
      function read_message(id) {
          var data = {
              'id': id,
              'destinatario':$rootScope.username
          };
          return dataservice.readMessage(data).then(function(response) {
              if(response.data != "error"){
                  showMessages($rootScope.username);
              }
          });
      }

      function logout() {
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
              showMessages(user.user);
              getRequests(user.user);
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