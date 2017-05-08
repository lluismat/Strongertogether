(function() {
    'use strict';

    angular
        .module('app.users')
        .controller('verifyController', verifyController);

    verifyController.$inject = ['$q', '$rootScope', 'dataservice', 'logger', '$state', '$cookieStore', '$stateParams'];
    /* @ngInject */
    function verifyController($q, $rootScope, dataservice, logger, $state, $cookieStore, $stateParams) {
        var vm = this;
        vm.verify = verify;

        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'verifyController';

        verify($stateParams);

        //verify
        function verify(id){
            var data = {
                'token' : id
            };

            dataservice.verify(data).then(function (response) {
                console.log(response.data);
                if (response.data.username) {
                    logger.success('Usuario verificado con exito.');
                    $cookieStore.put('session', {
                        user: response.data.username,
                        avatar: response.data.avatar
                    });
                    $rootScope.Session = true;
                    $rootScope.username = response.data.username;
                    $rootScope.avatar = response.data.avatar;
                    $rootScope.tipo = response.data.tipo;
                    $state.go('home');
                }else{
                    logger.error('No se ha podido verificar el usuario o ya ha sido verificado anteriormente.');
                    $state.go('home');
                }
            });
        }
    }
})();