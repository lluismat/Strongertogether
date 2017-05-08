(function() {
    'use strict';

    angular
        .module('app.foro')
        .controller('crearTemaController', crearTemaController);

    crearTemaController.$inject = ['$q', 'dataservice', 'logger', '$scope', '$cookieStore', '$state', 'Upload', '$stateParams'];
    /* @ngInject */
    function crearTemaController($q, dataservice, logger, $scope, $cookieStore,$state, Upload, $stateParams) {
        var vm = this;
        vm.titulo = "";
        vm.username ="";
        vm.contenido = "";
        vm.crearTema = crearTema;
        vm.imageUpload = imageUpload;

        if($cookieStore.get('session')){
            vm.username = $cookieStore.get('session').user;
        }

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
                ['alignment', ['ul', 'ol']],
                ['table', ['table']],
                ['insert', ['link','picture','video']],
                ['view', ['fullscreen']],
                ['help', ['help']]
            ]
        };

        tema();

        function tema() {
            if(vm.username == ""){
                logger.warning('Para crear un usuario debes iniciar session en Strongertogether!');
                $state.go('foro');
            }
        }

        //SUBE LA IMAGEN AL PROYECTO Y LA PINTA EN EL EDITOR DE TEXTO
        function imageUpload(files) {
            console.log(files[0]);
            Upload.upload({
                url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
                data:{
                    type:"image",
                    file:files[0]
                } //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){
                    //validate success
                    console.log(resp);

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

        //RECOGE LOS DATOS DEL EDITOR DE TEXTO Y CREA EL TEMA
        function crearTema(){
            if(vm.username !=""){
                var data = {
                    'titulo': vm.titulo,
                    'contenido': vm.contenido,
                    'autor': vm.username,
                    'categoria': $stateParams.categoria
                };
                console.log(data);

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
