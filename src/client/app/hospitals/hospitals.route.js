(function() {
    'use strict';

    angular
        .module('app.hospitals')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'hospitals',
                config: {
                    url: '/hospitales',
                    templateUrl: 'app/hospitals/hospitals.html',
                    controller: 'hospitalsController',
                    controllerAs: 'vm',
                    title: 'Hospitales',
                }
            }
        ];
    }
})();
