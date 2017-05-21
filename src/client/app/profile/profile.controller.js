(function() {
  'use strict';

  angular
    .module('app.profile')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$q', '$state', 'logger', '$rootScope', 'dataservice', '$cookieStore', 'Upload', '$uibModal', '$sce'];
  /* @ngInject */
  function ProfileController($q, $state, logger, $rootScope, dataservice, $cookieStore, Upload, $uibModal, $sce) {
      var vm = this;
      vm.title = 'Profile';
      vm.email = "";
      vm.newpass = "";
      vm.actualPass = "";
      vm.avatar = "";
      vm.friends = [];
      vm.temas = [];
      vm.currentPage = 1;
      vm.pageSize = 10;
      vm.maxPagesTemas = [];
      vm.maxPagesMessage = [];
      vm.pagesTemas = 1;
      vm.pagesMessage = 1;
      vm.numTemas = 0;
      vm.temasPage =[];
      vm.currentCat = "";
      vm.mensajes = [];
      //datos del usuario
      vm.saveProfile = saveProfile;
      vm.saveAccount = saveAccount;
      //temas creaados por el usuario
      vm.showTemas = showTemas;
      //mensajes recibidos del usuario
      vm.showMessages = showMessages;
      vm.getMensajes = getMensajes;
      vm.showMessage = showMessage;
      vm.getMessage = getMessage;
      vm.read_message = read_message;
      //pagination
      vm.paginationTemas = paginationTemas;
      vm.paginationMensajes = paginationMensajes;
      vm.countPagesTemas = countPagesTemas;
      vm.countPagesMensajes = countPagesMensajes;
      //añadir amigo
      vm.refuse = refuse;
      vm.addFriend = addFriend;

      vm.username = $cookieStore.get('session').user;

      activate();

      function activate() {
          var promises = [getProfile()];
          return $q.all(promises).then(function() {
              getMensajes();
          });
      }

      //funcion para obtener los datos del usuario logeado
      function getProfile(){

              var data = {
                  'user': vm.username
              };

              return dataservice.profile(data).then(function(response) {
                  $rootScope.user = response.data.user;
                  vm.temas = response.data.temas;
                  $rootScope.user.avatar = "";
                  if($rootScope.user.name == "null"){
                      $rootScope.user.name = "";
                  }
                  if($rootScope.user.surname == "null"){
                      $rootScope.user.surname = "";
                  }
                  if($rootScope.user.city == "null"){
                      $rootScope.user.city = "";
                  }
                  countPagesTemas();
                  showTemas();
              });
      }

      //funcion para obtener todos los mensajes
      function getMensajes(){

          var data = {
              'user': vm.username
          };

          return dataservice.getMensajes(data).then(function(response) {
              vm.mensajes = response.data;
              countPagesMensajes();
              showMessages();
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

      //FUNCIONA PARA OBTENER EL MENSAJE SELECCIONADO
      function getMessage(id) {

          var data = {
              'id': id,
              'destinatario':vm.username
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
      //FUNCIONA PARA CAMBIAR A LEIDO UN MENSAJE
      function read_message(id) {
          var data = {
              'id': id,
              'destinatario':vm.username
          };
          return dataservice.readMessage(data).then(function(response) {
              if(response.data != "error"){
                  $state.reload();
              }
          });
      }

      //funciona para enviar una petición de amistat a un usuario
      function addFriend(user){
          console.log(user);
          if(vm.username != user && user !=""){
              var data = {
                  'id': $rootScope.id,
                  'friends': user,
                  'username': vm.username
              };

              return dataservice.addFriend(data).then(function(response) {
                  if(response.data != ("error" &&  "errorexist")) {
                      logger.success('Se ha añadido a '+user+' a tu lista de amigos.');
                  }else if(response.data == "errorexist"){
                      logger.error('El usuario '+user+' ya es amigo tuyo');
                  }else{
                      logger.error('Ha habido un error al enviar una petición de amistat a'+user);
                  }
              });
          }
      }

      function refuse(id){
          console.log(id);
          if(vm.username != $rootScope.autor && id !=""){
              var data = {
                  'id': id
              };

              return dataservice.refuseFriend(data).then(function(response) {
              });
          }
      }

      //funcion para guardar la informacion del usuario
      function saveProfile(){
          if(vm.avatar  && vm.avatar != "default_user.png"){
              Upload.upload({
                  url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
                  data:{
                      type:"avatar",
                      user:$rootScope.user.username,
                      file:vm.avatar
                  } //pass file as data, should be user ng-model
              }).then(function (resp) { //upload function returns a promise
                  if(resp.data.error_code === 0){
                      //validate success
                      logger.success('Avatar subido con exito.');
                  } else {
                      logger.error('Ha Habido un error al subir la imagen.');
                  }
              }, function (resp) { //catch error
                  logger.error('Error status: ' + resp.status);
              }, function (evt) {
                  var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                  vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
              });
              if(vm.avatar != $cookieStore.get('session').avatar && vm.avatar != ""){
                  $rootScope.user.avatar = $rootScope.user.username + '.' + vm.avatar.name.split('.')[vm.avatar.name.split('.').length -1];
              }else{
                  $rootScope.user.avatar = $cookieStore.get('session').avatar;
              }
          }else{
              $rootScope.user.avatar = $cookieStore.get('session').avatar;
          }

          var data = {
              'user': $rootScope.user
          };

          return dataservice.saveProfile(data).then(function(response) {
              logger.success('Datos modificados con exito');
              $rootScope.user = response.data;
              $cookieStore.put('session', {
                  user: response.data.username,
                  avatar: response.data.avatar
              });
              $state.go('perfil');
              location.reload();
      });
      }

      //funcion para guardar la informacion de la cuenta (email,contraseña)
      function saveAccount(){

          var data = {
              'username': vm.username,
              'email': vm.email,
              'newpass': vm.newpass,
              'actualPass': vm.actualPass
          };
          return dataservice.saveAccount(data).then(function(response) {

              if(response.data == "passfail"){
                  logger.error('La contraseña introducida no es valida');
              }else if(response.data == "nochange"){
                  logger.info('No se han introducido nuevos datos');
                  $state.go('perfil');
                  $state.reload();
              }else if(response.data == "error") {
                  logger.error('Ups, Ha habido un error en el servidor');
              }else{
                  logger.success('Datos modificados con exito');
                  $rootScope.user = response.data;
                  $state.go('perfil');
                  $state.reload();
              }
          });
      }

      //PAGINATION TABLE

      //funcion que muestra los temas maximos que se pueden mostrar en una pagina
      function showTemas(){
          var startIndex = (vm.currentPage - 1) * vm.pageSize;
          var endIndex = Math.min(startIndex + vm.pageSize - 1, vm.temas.length - 1);
          vm.temasPage = vm.temas.slice(startIndex, endIndex + 1);
      }

      function showMessages(){
          var startIndex = (vm.currentPage - 1) * vm.pageSize;
          var endIndex = Math.min(startIndex + vm.pageSize - 1, vm.mensajes.todos.length - 1);
          vm.mensajesPage = vm.mensajes.todos.slice(startIndex, endIndex + 1);
          for (var i=0; i<vm.mensajesPage.length; i++) {
              if(vm.mensajesPage[i].leido == 0){
                  vm.mensajesPage[i].leido = "noleido";
              }else{
                  vm.mensajesPage[i].leido = "leido";
              }
          }
      }

      //funcion que saca el numero de paginas que habra segun el numero de temas que haya.
      function countPagesTemas() {
          vm.pagesTemas = Math.ceil(vm.temas.length/vm.pageSize);
          for (var i=1; i<=vm.pagesTemas; i++) {
              vm.maxPagesTemas.push(i);
          }
      }

      //funcion que saca el numero de paginas que habra segun el numero de temas que haya.
      function countPagesMensajes() {
          vm.pagesMessage = Math.ceil(vm.mensajes.todos.length/vm.pageSize);
          for (var i=1; i<=vm.pagesMessage; i++) {
              vm.maxPagesMessage.push(i);
          }
      }

      //funcion para paginar
      function paginationTemas(page){
          if (page == "first"){
              vm.currentPage= 1;
          }else if(page == "prev"){
              vm.currentPage=vm.currentPage-1;
          }else if(page == "next"){
              vm.currentPage=vm.currentPage+1;
          }else if(page == "last"){
              vm.currentPage=vm.pagesTemas;
          }
      }

      function paginationMensajes(page){
          if (page == "first"){
              vm.currentPage= 1;
          }else if(page == "prev"){
              vm.currentPage=vm.currentPage-1;
          }else if(page == "next"){
              vm.currentPage=vm.currentPage+1;
          }else if(page == "last"){
              vm.currentPage=vm.pagesMessage;
          }
      }
  }
})();
