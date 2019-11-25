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

		$ionicLoading.show({
			template: '<ion-spinner icon="android"></ion-spinner><br>Cargando...',
			noBackdrop: true
		});
		

		// Justo de antes de entrar a la vista, le pedimos que traiga los mensajes./*
		$scope.$on('$ionicView.beforeEnter', function() {
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

			/*Usuario.getMensajes().then(function(response) {
				// Resolve
				//console.log(response.data);
				$scope.mensajes = response.data;
			}).catch(function(err) {
				if(err.data.message === 'Unauthenticated.')
				{
					$ionicPopup.alert({
						title: 'Error',
						template: 'Tenés que estar logueado para poder acceder a esta pantalla.'
					}).then(function() {
						$state.go('tab.login');
					});
				}
			});*/
		});	
    }

]);