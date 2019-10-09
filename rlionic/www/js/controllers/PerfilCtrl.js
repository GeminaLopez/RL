// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('PerfilCtrl', [
	'$scope',
	'$state',
	'$ionicPopup',
	'Usuario',
	'Ciudad',
	'Genero',
	'Auth',
	'API_SERVER',
	function($scope, $state, $ionicPopup, Usuario, Ciudad, Genero, Auth, API_SERVER) {
		$scope.user = {
			nombre: null,
			apellido: null,
			id_ciudad: null,
			id_genero: null,
			email: null,
			avatar: null,
			brinda_servicio: null,	
			fecha_nac: null
		};

		//$scope.api_server = API_SERVER+'/';

		// Justo de antes de entrar a la vista, le pedimos que traiga los datos del usuario.
		$scope.$on('$ionicView.beforeEnter', function() {
			Auth.getUser().then(function(response) {
				// console.log(response);
				if(response.id_user !== null) {
					Ciudad.traerCiudadPorID(response.id_ciudad).then(function(resp){
						// le asigno la ciudad que se corresponde por el id
						$scope.user['id_ciudad'] = resp.data.ciudad;
					});
					Genero.traerGeneroPorID(response.id_genero).then(function(resp){
						// le asigno la ciudad que se corresponde por el id
						$scope.user['id_genero'] = resp.data.genero;
					});

					$soloFecha = response.fecha_nac.split(" ")[0];
					$formatoEspaniol = $soloFecha.split("-")[2]+"/"+$soloFecha.split("-")[1]+"/"+$soloFecha.split("-")[0];

					$scope.user = {
						nombre: response.nombre,
						apellido: response.apellido,
						email: response.email,
						avatar: response.avatar, 
						brinda_servicio: response.brinda_servicio,	
						fecha_nac: $formatoEspaniol,
					};

				}
				else{
					$ionicPopup.alert({
						title: 'Error',
						template: 'No pudimos encontrar sus datos. Por favor, contactate con nosotros.'
					});
				}
			});
		});

		// funcion logout para Cerrar Sesión
		$scope.logout = function(){
			Auth.logout().then(function(response) {
				if(response.status == 1)
				{
					$ionicPopup.alert({
						title: 'Éxito',
						template: 'Cerró la sesión exitosamente'
					}).then(function() {
						$state.go('tab.login');
					});
				}
				else{
					$ionicPopup.alert({
						title: 'Error',
						template: 'Parece que hubo un problema. Por favor, contactate con nosotros.'
					});
				}
			});
		};	
	}
]);