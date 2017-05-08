(function() {
    'use strict';

    angular
        .module('app.users')
        .controller('recoveryController', recoveryController);

    recoveryController.$inject = ['$q', '$rootScope', 'dataservice', 'logger', '$state', '$cookieStore', '$uibModal', '$stateParams'];
    /* @ngInject */
    function recoveryController($q, $rootScope, dataservice, logger, $state, $cookieStore, $uibModal, $stateParams) {
        var vm = this;
        vm.changePass = changePass;
        vm.inputPass = '';
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Cambiar Contraseña';

        //verify
        function changePass(){

            var data = {
                'id'    : $stateParams,
                'pass'     : vm.inputPass
            };

            dataservice.changePass(data).then(function (response) {
                if (response.data.affectedRows != 0) {
                    logger.success('La contraseña ha sido restaurada con exito');
                    $state.go('home');
                }else{
                    logger.error('No se ha podido restaurar la contraseña, por favor intentelo de nuevo.');
                    $state.go('home');
                }
            });
        }
    }
})();