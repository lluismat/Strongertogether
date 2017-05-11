(function() {
  'use strict';

  angular
    .module('app.foro')
    .controller('ForoController', ForoController);

  ForoController.$inject = ['$q', 'dataservice', 'logger', '$scope', '$cookieStore', '$state', '$stateParams'];
  /* @ngInject */
  function ForoController($q, dataservice, logger, $scope, $cookieStore,$state, $stateParams) {
      var vm = this;
      vm.titulo = "";
      vm.contenido = "";
      vm.temas = [];
      vm.categorias = [];
      vm.currentPage = 1;
      vm.pageSize = 15;
      vm.maxPages = [];
      vm.pages = 1;
      vm.numTemas = 0;
      vm.temasPage =[];
      vm.currentCat = "";
      vm.username = "";
      vm.countPages=countPages;
      vm.pagination = pagination;
      vm.showTemas = showTemas;
      vm.getTemas = getTemas;

      if($cookieStore.get('session')){
          vm.username = $cookieStore.get('session').user;
      }

      activate();

      function activate() {
          var promises = [getCategorias()];
          return $q.all(promises).then(function() {
          });
      }

      //RECOGE LOS TEMAS DE CADA CATEGORIA Y LOS PINTA
      function getTemas(cat){
          vm.currentCat = cat;
          vm.temasPage =[];
          vm.maxPages = [];
          var data = {
              'categoria': cat
          };
          return dataservice.getTemas(data).then(function(response) {
              vm.temas = response.data;
              countPages();
              showTemas();
          });
      }

      function getCategorias(){
          return dataservice.getCategorias().then(function(response) {
              vm.categorias = response.data;
              vm.currentCat = response.data[0].id;
              getTemas(vm.currentCat);
          });
      }

      //PAGINATION
      function showTemas(){
          var startIndex = (vm.currentPage - 1) * vm.pageSize;
          var endIndex = Math.min(startIndex + vm.pageSize - 1, vm.temas.length - 1);
          vm.temasPage = vm.temas.slice(startIndex, endIndex + 1);
      }

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
