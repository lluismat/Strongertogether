(function() {
    'use strict';

    angular
        .module('app.foro')
        .controller('crearTemaController', crearTemaController);

    crearTemaController.$inject = ['$q', 'dataservice', 'logger', '$scope', '$cookieStore', '$state', 'Upload', '$stateParams', '$timeout'];
    /* @ngInject */
    function crearTemaController($q, dataservice, logger, $scope, $cookieStore,$state, Upload, $stateParams, $timeout) {
        var vm = this;
        vm.titulo = "";
        vm.username ="";
        vm.contenido = "";
        vm.crearTema = crearTema;
        vm.imageUpload = imageUpload;

        if($cookieStore.get('session')){
            vm.username = $cookieStore.get('session').user;
        }

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

        tema();

        //Si llegara a entrar algun usuario a la vista de crear tema sin estar logeado se le avisa y redirige al foro
        function tema() {
            if(vm.username == ""){
                logger.warning('Para crear un tema debes iniciar session en Strongertogether!');
                $timeout(function() {
                    $state.go('foro');
                }, 1000);

            }
        }

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

        //RECOGE LOS DATOS DEL EDITOR DE TEXTO Y LOS ENVIA AL SERVIDOR PARA QUE SE GUARDEN LOS DATOS DEL TEMA EN BASE DE DATOS
        function crearTema(){
            if(vm.username !=""){
                var data = {
                    'titulo': vm.titulo,
                    'contenido': vm.contenido,
                    'autor': vm.username,
                    'categoria': $stateParams.categoria
                };

                return dataservice.crearTema(data).then(function(response) {
                    if(response.data != "error"){
                        logger.success('Tema Creado con exito');
                        $state.go('foro');
                    }else{
                        logger.error('Ha habido un erro al crear el tema');
                    }

                });
            }else{
                logger.error('Para crear un tema debes de estar registrado');
            }
        }

    }
})();
