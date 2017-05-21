(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger', '$rootScope', '$state'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger, $rootScope, $state) {

    var service = {
        //CONTACTO
        sendemail: sendemail,
        //HOSPITAL
        getHospitals: getHospitals,
        //SIGNUP
        signUp: signUp,
        //VERIFICAR CUENTA
        verify:verify,
        //RECUPERAR CONTRAEÑA
        recoveryPass:recoveryPass,
        changePass:changePass,
        //LOGIN
        login: login,
        socialLogin:socialLogin,
        //PROFILE
        profile:profile,
        saveProfile:saveProfile,
        saveAccount:saveAccount,
        //FORO
        getTemas:getTemas,
        getCategorias:getCategorias,
        //CREAR TEMA
        crearTema:crearTema,
        //TEMA
        getTema:getTema,
        crearComentario:crearComentario,
        editar_tema:editar_tema,
        //EDITAR COMENTARIO
        getComentario:getComentario,
        editar_comentario:editar_comentario,
        //AÑADIR AMIGOS
        addFriend:addFriend,
        refuseFriend:refuseFriend,
        sendRequest:sendRequest,
        getRequests:getRequests,
        //ENVIAR MENSAJES
        getMensajes:getMensajes,
        sendMessage:sendMessage,
        showMessage:showMessage,
        readMessage:readMessage
    };

    return service;

    ///////////////CONTACTO///////////////////////
      function sendemail(data) {
          return $http.post('/api/sendmail', data)
              .then(success)
              .catch(fail);

          function success() {
              return true;
          }

          function fail() {
              return false;
          }
      }

      ////////////////LOGIN/////////////////////

      function login(data) {
          return $http.post('/api/login', data)
              .then(success)
              .catch(fail);

          function success(response) {
              $rootScope.authUser = response.data;
              return response;
          }

          function fail() {
              $rootScope.authUser = false;
              return false;
          }
      }

      function socialLogin() {
          return $http.get('/auth/success')
              .then(success)
              .catch(fail);

          function success(response) {

              return response;
          }

          function fail(e) {

              return exception.catcher('XHR Failed for socialSignin')(e);
          }
      }

      /////////////VERIFICAR EMAIL///////////////////
      function verify(data) {
          return $http.post('/api/verify', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }

      ////////////////RECOVERY PASSWORD///////////////

      function recoveryPass(data) {
          return $http.post('/api/recovery', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }

      function changePass(data) {
          return $http.post('/api/changepass', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }

      //////////////SIGNUP///////////////////

      function signUp(data) {
          return $http.post('/api/signup', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }


      /////////PROFILE/////////////////
      function profile(data) {
          return $http.post('/api/profile', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }

      function saveProfile(data) {
          return $http.post('/api/save_profile', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }

      function saveAccount(data) {
          return $http.post('/api/save_account', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }

      ////////////////FORO/////////////////////////

      function getTemas(data) {
          return $http.post('/api/temas', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }

      function getCategorias() {
          return $http.post('/api/categorias')
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }

      /////////////TEMA/////////////////////

      function getTema(data) {
          return $http.post('/api/tema', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }

      function editar_tema(data) {
          return $http.post('/api/editar_tema', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }

      function crearComentario(data) {
          return $http.post('/api/nuevo_comentario', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }

      /////////////CREAR TEMAS/////////////////////

      function crearTema(data) {
          return $http.post('/api/nuevo_tema', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }


      /////////////////EDITAR COMENTARIO/////////////

      function getComentario(data) {
          return $http.post('/api/comentario', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }

      function editar_comentario(data) {
          return $http.post('/api/editar_comentario', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }


      /////////////////MESSAGES/////////////////////////

      function showMessage(data) {
          return $http.post('/api/show_message', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }

      function getMensajes(data) {
          return $http.post('/api/get_mensajes', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }

      function readMessage(data) {
          return $http.post('/api/read_message', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }

      function sendMessage(data) {
          return $http.post('/api/send_message', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }


      ////////////AÑADIR AMIGOS////////////

      function addFriend(data) {
          return $http.post('/api/addfriend', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }

      function refuseFriend(data) {
          return $http.post('/api/refuse_friend', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }

      function sendRequest(data) {
          return $http.post('/api/sendrequest', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }

      function getRequests(data) {
          return $http.post('/api/get_requests', data)
              .then(success)
              .catch(fail);

          function success(response) {
              return response;
          }

          function fail() {
              return false;
          }
      }

      ///////////////////HOSPITALES//////////////////

      function getHospitals() {

          return $http.get('/api/hospitals').then(success).catch(fail);

          function success(response) {
              return response.data;
          }

          function fail(e) {
              return exception.catcher('XHR Failed for getHospitals')(e);
          }
      }
  }
})();
