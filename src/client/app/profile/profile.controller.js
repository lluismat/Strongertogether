(function() {
  'use strict';

  angular
    .module('app.profile')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$q', '$state', 'logger', '$rootScope', 'dataservice', '$cookieStore', 'Upload'];
  /* @ngInject */
  function ProfileController($q, $state, logger, $rootScope, dataservice, $cookieStore, Upload) {
      var vm = this;
      vm.title = 'Profile';
      vm.saveProfile = saveProfile;
      vm.saveAccount = saveAccount;
      vm.email = "";
      vm.newpass = "";
      vm.actualPass = "";
      vm.avatar = "";
      vm.temas = [];
      vm.currentPage = 1;
      vm.pageSize = 15;
      vm.maxPages = [];
      vm.pages = 1;
      vm.numTemas = 0;
      vm.temasPage =[];
      vm.currentCat = "";
      vm.countPages=countPages;
      vm.pagination = pagination;
      vm.username = $cookieStore.get('session').user;

      activate();

      function activate() {
          var promises = [getProfile()];
          return $q.all(promises).then(function() {
          });
      }

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
              });
      }

      function saveProfile(){
          console.log(vm.avatar);
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

      function countPages() {
          vm.pages = Math.ceil(vm.temas.length/vm.pageSize);
          for (var i=1; i<=vm.pages; i++) {
              vm.maxPages.push(i);
          }
      }

      function pagination(page){
          if (page == "first"){
              vm.currentPage= 1;
          }else if(page == "prev"){
              vm.currentPage=vm.currentPage-1;
          }else if(page == "next"){
              vm.currentPage=vm.currentPage+1;
          }else if(page == "last"){
              vm.currentPage=vm.pages;
          }
          console.log(vm.currentPage);
      }
  }
})();
