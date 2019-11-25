// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('MensajesCtrl', [
	'$scope',
	'Usuario',
	'SERVER',
	'Chat',
	'$ionicLoading',
	function($scope, Usuario,SERVER, Chat, $ionicLoading) {
		$scope.mensajes = [];
		$scope.api_server = SERVER;
	

		// Justo de antes de entrar a la vista, le pedimos que traiga los mensajes./*
		$scope.$on('$ionicView.beforeEnter', function() {
			$scope.mensajes = [];
			$ionicLoading.show({
				template: '<ion-spinner icon="android"></ion-spinner><br>Cargando...',
				noBackdrop: true
			});
			Chat.getChats().then(function(response){
				$ionicLoading.hide();
				let info = [];
				response.forEach(function(id){
					let id_user = parseInt(id);
					Usuario.detallesUsuario(id_user).then(function(response) {
						let responseInfo = response.data;
						if(response.status == 200) {
							return info.push(responseInfo);
						}
					});
				});
				$scope.mensajes = info;
			});
		});	
    }

]);