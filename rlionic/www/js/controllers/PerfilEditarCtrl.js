// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('PerfilEditarCtrl', [
	'$scope',
	'$state',
	'$ionicPopup',
	'Usuario',
	'Ciudad',
	'Genero',
	'API_SERVER',
	'Auth',
	function($scope,$state,$ionicPopup, Usuario, Ciudad, Genero, API_SERVER, Auth) {
		$scope.user = {
			nombre: null,
			apellido: null,
			id_ciudad: null,
			id_genero: null,
			email: null,
			avatar: null,
		};

		$scope.api_server = API_SERVER+'/';

		// Justo de antes de entrar a la vista, le pedimos que traiga los datos del usuario.
		$scope.$on('$ionicView.beforeEnter', function() {
			Auth.getUser().then(function(response) {
				//console.log(response);
				if(response.id_user !== null) {
					Ciudad.traerCiudadPorID(response.id_ciudad).then(function(resp){
						console.log(resp.data);
						// le asigno la ciudad que se corresponde por el id
						$scope.user['id_ciudad'] = resp.data.id_ciudad;
					});
					Genero.traerGeneroPorID(response.id_genero).then(function(resp){
						// le asigno la ciudad que se corresponde por el id
						$scope.user['id_genero'] = resp.data.id_genero;
					});
					$scope.user = {
						id_user: response.id_user,
						nombre: response.nombre,
						apellido: response.apellido,
						email: response.email,
						avatar: response.avatar,
					}
				}
				else{
					$ionicPopup.alert({
						title: 'Error',
						template: 'No pudimos encontrar sus datos. Por favor, contactate con nosotros.'
					});
				}
			});
		});

		// busco todas las ciudades para cargar el dropdown
		Ciudad.todas().then(function(resp){
			$scope.ciudades = resp.data;
		});

		// busco todas los generos para cargar el dropdown
		Genero.todos().then(function(resp){
			$scope.generos = resp.data;
		});

		$scope.editar = function (user){
			// Guardo los datos que el usuario editó
			Usuario.editar(user).then(function(response) {
				if(response.status == 1) {
					$ionicPopup.alert({
						title: 'Éxito!',
						template: 'El usuario fue editado con éxito'
					}).then(function() {
						// Lo redireccionamos al perfil nuevamente.
						$state.go('tab.perfil');
					});
				} else if(responseInfo.status == 0) {
					$ionicPopup.alert({
						title: 'Error',
						template: 'Oops! Hubo un error al editar el perfil. Por favor, probá de nuevo.'
					});
				}else{
					$scope.errores = responseInfo.errores;
					$ionicPopup.alert({
						title: 'Error',
						template: 'Por favor, revisá los campos del formulario.'
					});
				}
			});
		};

		$scope.editarPassword = function(user){
			// Guardo la password nueva del usuario
			Usuario.editarPassword(user).then(function(response) {
				if(response.data.success) {
					$ionicPopup.alert({
						title: 'Éxito!',
						template: 'La password fue editada con éxito'
					}).then(function() {
						// Lo redireccionamos al perfil nuevamente.
						$state.go('tab.perfil');
					});
				} else if(responseInfo.status == 0) {
					$ionicPopup.alert({
						title: 'Error',
						template: 'Oops! Hubo un error al editar la password. Por favor, probá de nuevo.'
					});
				} else{
					$scope.errores = responseInfo.errores;
					$ionicPopup.alert({
						title: 'Error',
						template: 'Por favor, revisá el campo clave'
					});
				}
			});
		};

		$scope.calcularEdad = function(fecha_nac){ 
			var ageDifMs = Date.now() - fecha_nac.getTime();
			$scope.edad = Math.floor(ageDifMs / 1000 / 60 / 60 / 24 / 365);
		}

		$scope.ocultarOMostrarPassword = function(mostrar)
		{
			let clave = document.getElementById("clave");
			if(mostrar) // Si el checkbox de mostrar contraseña está activado
			{
				clave.type = "text";
			}
			else // Si no está activado
			{
				clave.type = "password";
			}
		};
	}
]);