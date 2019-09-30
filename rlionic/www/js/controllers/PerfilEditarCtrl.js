// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('PerfilEditarCtrl', [
	'$scope',
	'$state',
	'$ionicPopup',
	'Usuario',
	'Ciudad',
	'API_SERVER',
	function($scope,$state,$ionicPopup, Usuario, Ciudad,API_SERVER) {
		$scope.user = {
			nombre: null,
			apellido: null,
			fkciudad: null,
			email: null,
			avatar: null,
		};

		$scope.api_server = API_SERVER+'/';

		Usuario.getLoggedUser().then(function(response) {
			let responsePayload = response.data;
			if(responsePayload.status == 1) {
				$scope.user = {
					nombre: responsePayload.data.nombre,
					apellido: responsePayload.data.apellido,
					fkciudad: responsePayload.data.fkciudad,
					email: responsePayload.data.email,
					avatar: responsePayload.data.avatar,
				}
			}
		});

		// busco todas las ciudades para cargar el dropdown
		Ciudad.todas().then(function(exito){
			$scope.ciudades = exito.data;
		});
	
		$scope.editar = function(user) {

			let avatar = document.getElementById('avatar');
			
			// valido si cargaron la imagen para convertirla en base64
            if(avatar.files.length == 0){
                editar(user);
            } else{
                // convierto la imagen a base64 para guardarla en la base
                const reader = new FileReader();            
                reader.readAsDataURL(avatar.files[0]);

                reader.addEventListener('load', function () {                   
                    let base64 = reader.result;
                    $scope.user.avatar = base64;                  
                    editar(user);
                });
                
			}

			function editar(user){
				// Guardo los datos que el usuario editó
				Usuario.editar(user).then(function(response) {
					let responseInfo = response.data;
					if(responseInfo.status == 1) {
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
			}
		};

		$scope.editarPassword = function(user){
			// Guardo la password nueva del usuario
			Usuario.editarPassword(user).then(function(response) {
				let responseInfo = response.data;
				if(responseInfo.status == 1) {
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