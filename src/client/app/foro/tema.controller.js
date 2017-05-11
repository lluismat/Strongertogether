(function() {
    'use strict';

    angular
        .module('app.foro')
        .controller('temaController', temaController);

    temaController.$inject = ['$q', 'dataservice', 'logger', '$scope', '$cookieStore', '$state', 'Upload', '$stateParams', '$sce'];
    /* @ngInject */
    function temaController($q, dataservice, logger, $scope, $cookieStore,$state, Upload, $stateParams, $sce) {
        var vm = this;
        vm.titulo = "";
        vm.username ="";
        vm.contenido = "";
        vm.tema = [];
        vm.user = [];
        vm.coment = "";
        //vm.message = "";
        vm.contentTema = "";
        vm.comentario = comentario;
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
            if($stateParams.id){
                var promises = [getTema()];
                return $q.all(promises).then(function() {
                });
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

        //RECOGE LOS DATOS DEL EDITOR DE TEXTO Y CREA EL COMENTARIO
        function comentario(){
            if(vm.username !=""){
                var data = {
                    'contenido': vm.contenido,
                    'autor': vm.username,
                    'tema': $stateParams.id
                };
                console.log(data);

                return dataservice.crearComentario(data).then(function(response) {
                    if(response.data != "error"){
                        vm.coment = response.data.contenido;
                        logger.success('Comentario creado con exito');
                        $state.go('tema',{id:$stateParams.id});
                    }else{
                        logger.error('Ha habido un error al hacer el comentario');
                        $state.go('tema',{id:$stateParams.id});
                    }

                });
            }else{
                logger.error('Para Comentar debes de estar registrado');
            }
        }

        //RECOGE LOS TEMAS DE CADA CATEGORIA Y LOS PINTA
        function getTema(){
            var data = {
                'id': $stateParams.id
            };
            return dataservice.getTema(data).then(function(response) {
                if(response.data != "error"){
                    vm.tema = response.data["tema"];
                    vm.user = response.data["user"];
                    vm.coment = response.data["comentarios"];
                    vm.contentTema = $sce.trustAsHtml(vm.tema.contenido);

                    for(var i = 0; i < vm.coment.length;i++){
                        vm.coment[i].contenido = $sce.trustAsHtml(vm.coment[i].contenido);
                    }
                }
            });
        }

    }
})();