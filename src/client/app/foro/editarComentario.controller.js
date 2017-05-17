(function() {
    'use strict';

    angular
        .module('app.foro')
        .controller('editarComentarioController', editarComentarioController);

    editarComentarioController.$inject = ['$q', 'dataservice', 'logger', '$scope', '$cookieStore', '$state', 'Upload', '$stateParams'];
    /* @ngInject */
    function editarComentarioController($q, dataservice, logger, $scope, $cookieStore,$state, Upload, $stateParams) {
        var vm = this;
        vm.username ="";
        vm.comentario = [];
        vm.tema = $stateParams.tema;
        vm.imageUpload = imageUpload;
        vm.editar_comentario = editar_comentario;

        if($cookieStore.get('session')){
            vm.username = $cookieStore.get('session').user;
        }

        //OPCIONES DEL EDITOR DE TEXTO SUMMERNOTE
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

        comentario();

        function comentario() {
            if($stateParams.id){
                var promises = [getComentario()];
                return $q.all(promises).then(function() {
                });
            }
        }

        //RECOGE LOS DATOS DEL COMENTARIO
        function getComentario(){
            var data = {
                'id': $stateParams.id
            };
            return dataservice.getComentario(data).then(function(response) {
                if(response.data != "error"){
                    vm.comentario = response.data;
                }
            });
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

        //RECOGE LOS DATOS DEL EDITOR DE TEXTO Y EDITA EL COMENTARIO
        function editar_comentario(){
            if(vm.username !="" && vm.username == vm.comentario.autor){
                var data = {
                    'contenido': vm.comentario.contenido,
                    'comentario': $stateParams.id
                };

                return dataservice.editar_comentario(data).then(function(response) {
                    if(response.data != "error"){
                        vm.coment = response.data.contenido;
                        logger.success('Cometario editado con exito');
                        $state.go('tema',{id:vm.tema});
                    }else{
                        logger.error('Ha habido un error al editar el comentario');
                        $state.go('tema',{id:vm.tema});
                    }

                });
            }else{
                logger.error('No puedes editar un comentario que no es tuyo!!');
                $state.go('tema',{id:vm.tema});
            }
        }
    }
})();