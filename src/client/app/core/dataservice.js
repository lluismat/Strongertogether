(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger', '$rootScope', '$state'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger, $rootScope, $state) {

    var service = {
        sendemail: sendemail,
        getHospitals: getHospitals,
        signUp: signUp,
        login: login,
        socialLogin:socialLogin,
        profile:profile,
        saveProfile:saveProfile,
        verify:verify,
        recoveryPass:recoveryPass,
        changePass:changePass,
        saveAccount:saveAccount,
        crearTema:crearTema,
        getTemas:getTemas,
        getCategorias:getCategorias,
        getTema:getTema,
        crearComentario:crearComentario,
        addFriend:addFriend,
        editar_tema:editar_tema,
        getComentario:getComentario,
        editar_comentario:editar_comentario,
        getMensajes:getMensajes,
        sendMessage:sendMessage,
        showMessage:showMessage,
        readMessage:readMessage,
        getMessageCount: getMessageCount
    };

    return service;

    function getMessageCount() { return $q.when(72); }

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

    function login(data) {
      return $http.post('/api/login', data)
          .then(success)
          .catch(fail);

      function success(response) {
        $rootScope.authUser = response.data;
        console.log(response);
        return response;
      }

      function fail() {
        $rootScope.authUser = false;
        return false;
      }
    }

    function getHospitals() {

      return $http.get('/api/hospitals').then(success).catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getHospitals')(e);
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
  }
})();
