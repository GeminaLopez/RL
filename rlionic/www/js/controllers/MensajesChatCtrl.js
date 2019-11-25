// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('MensajesChatCtrl', [
	'$scope',
	'$stateParams',
	'Usuario',
	'Chat',
	'Auth',
	'$ionicPopup',
	'SERVER',
	'$ionicLoading',
	'$ionicScrollDelegate',
	function($scope, $stateParams, Usuario, Chat, Auth, $ionicPopup, SERVER, $ionicLoading, $ionicScrollDelegate) {
		$scope.mensajes = [];
		$scope.authUser = {};
		$scope.chatUser = {};

		$scope.api_server = SERVER;
		// info del usuario logueado
		Auth.getUser().then(user => $scope.authUser = user);
		// busco data del usuario con el cual estoy chateando.
		Usuario.detallesUsuario($stateParams.id).then(function(response) {
			let responseInfo = response.data;
			if(response.status == 200) {
				$scope.chatUser = responseInfo;
			}
		});
		
		$scope.getUser = function(id) {
			if($scope.chatUser.id_user == id) {
				return $scope.chatUser;
			} else {
				return $scope.authUser;
			}
		}

		$ionicLoading.show({
			template: '<ion-spinner icon="android"></ion-spinner><br>Cargando...',
			noBackdrop: true
		});

		// Justo de antes de entrar a la vista, le pedimos que traiga los mensajes.
		$scope.$on('$ionicView.beforeEnter', function() {
			// obtengo los msj usando servicio de firebase
			Chat.getMensajes($stateParams.id).then(function(response){
				$ionicLoading.hide();
				$scope.mensajes = response;
				$ionicScrollDelegate.scrollBottom(true);
			});
		});
	
		$scope.grabar = function(mensaje) {
			$ionicLoading.show({
				template: '<ion-spinner icon="android"></ion-spinner><br>Cargando...',
				noBackdrop: true
			});
			Chat.sendMensaje(mensaje, $stateParams.id).then(function(){
				Chat.getMensajes($stateParams.id).then(mensajes => {
					$scope.mensajes = mensajes;
				});
				mensaje.mensaje = '';
				$ionicScrollDelegate.scrollBottom(true);	
				$ionicLoading.hide();	
			});
		};

    }

]);