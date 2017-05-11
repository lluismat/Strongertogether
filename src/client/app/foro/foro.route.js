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
          }
      ];
  }
})();
