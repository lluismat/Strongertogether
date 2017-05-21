(function() {
    'use strict';

    angular
        .module('app.mensaje')
        .controller('mensajeController', mensajeController);

    mensajeController.$inject = ['$q', '$state', 'logger', '$scope', '$rootScope', 'dataservice', '$cookieStore', 'Upload', '$stateParams'];
    /* @ngInject */
    function mensajeController($q, $state, logger, $scope, $rootScope, dataservice, $cookieStore, Upload, $stateParams) {
        var vm = this;
        vm.title = 'mensaje';
        vm.asunto = "";
        vm.mensaje = "";
        vm.autor = "";
        vm.destinatario = "";
        vm.tema = $stateParams.tema;
        vm.username = $cookieStore.get('session').user;
        vm.sendMessage = sendMessage;
        vm.imageUpload = imageUpload;

        //opciones del editor de texto
        vm.options = {
            height: 300,
            lang: 'es-ES',
            focus: true,
            disableResizeEditor: true,
            disableDragAndDrop: true,
            toolbar: [
                ['edit',['undo','redo']],
                ['headline', ['style']],
                ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
                ['fontface', ['fontname']],
                ['textsize', ['fontsize']],
                ['fontclr', ['color']],
                ['alignment', ['ul', 'ol', 'paragraph']],
                ['insert', ['link','picture','video','hr']],
                ['view', ['fullscreen']],
                ['help', ['help']]
            ]
        };


        //SUBE LA IMAGEN AL PROYECTO Y LA PINTA EN EL EDITOR DE TEXTO
        function imageUpload(files) {
            Upload.upload({
                url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
                data:{
                    type:"image",
                    file:files[0]
                } //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){
                    //validate success

                    $scope.editor.summernote('insertImage', resp.data.path + resp.data.filename);

                    logger.success('Imagen subido con exito.');
                } else {
                    logger.error('Ha Habido un error al subir la imagen.');
                }
            }, function (resp) { //catch error
                logger.error('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        }

        //RECOGE LOS DATOS DEL EDITOR DE TEXTO Y ENVIA EL MENSAJE
        function sendMessage(){
            if(vm.username !=""){
                var data = {
                    'asunto': vm.asunto,
                    'mensaje': vm.mensaje,
                    'autor': vm.username,
                    'destinatario': $stateParams.user
                };

                return dataservice.sendMessage(data).then(function(response) {
                    if(response.data != "error"){
                        logger.success('Mensaje enviado con exito');
                        $state.go('foro');
                    }else{
                        logger.error('Ha habido un error al enviar el mensaje');
                    }

                });
            }else{
                logger.error('Para enviar mensajes debes estar registrado');
            }
        }
    }
})();