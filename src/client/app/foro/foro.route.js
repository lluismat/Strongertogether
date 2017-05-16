(function() {
  'use strict';

  angular
    .module('app.foro')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
      return [
          {
              state: 'foro',
              config: {
                  url: '/foros',
                  templateUrl: 'app/foro/foro.html',
                  controller: 'ForoController',
                  controllerAs: 'vm',
                  title: 'Foros'
              }
          },
          {
              state: 'NuevoTema',
              config: {
                  url: '/nuevo_tema?categoria',
                  templateUrl: 'app/foro/newTema.html',
                  controller: 'crearTemaController',
                  controllerAs: 'vm',
                  title: 'Nuevo Tema'
              }
          },
          {
              state: 'tema',
              config: {
                  url: '/tema?id',
                  templateUrl: 'app/foro/tema.html',
                  controller: 'temaController',
                  controllerAs: 'vm',
                  title: 'Tema'
              }
          },
          {
              state: 'comentario',
              config: {
                  url: '/nuevo_comentario?id',
                  templateUrl: 'app/foro/comentario.html',
                  controller: 'temaController',
                  controllerAs: 'vm',
                  title: 'Nuevo Comentario'
              }
          },
          {
              state: 'editar_tema',
              config: {
                  url: '/editar_tema?id',
                  templateUrl: 'app/foro/editar_tema.html',
                  controller: 'temaController',
                  controllerAs: 'vm',
                  title: 'Editar Tema'
              }
          },
          {
              state: 'editar_comentario',
              config: {
                  url: '/editar_comentario?id&tema',
                  templateUrl: 'app/foro/editar_comentario.html',
                  controller: 'editarComentarioController',
                  controllerAs: 'vm',
                  title: 'Editar Comentario'
              }
          }
      ];
  }
})();
