(function() {
    'use strict';

    angular
        .module('app.profile')
        .run(appRun);

    appRun.$inject = ['routerHelper','dataservice'];

    function appRun(routerHelper,dataservice) {
        routerHelper.configureStates(getStates(dataservice));
    }

    function getStates(dataservice) {
        return [
            {
                state: 'mensaje',
                config: {
                    url: '/enviar_mensaje?user&tema',
                    templateUrl: 'app/mensaje/enviar_mensaje.html',
                    controller: 'mensajeController',
                    controllerAs: 'vm',
                    title: 'Mensaje'
                }
            }
        ];
    }
})();