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
				if(response.id_user !== null) {
					Ciudad.traerCiudadPorID(response.id_ciudad).then(function(resp){
						console.log(resp.data.data.id_ciudad);
						// le asigno la ciudad que se corresponde por el id
						$scope.user['id_ciudad'] = resp.data.ciudad;
					});
					Genero.traerGeneroPorID(response.id_genero).then(function(resp){
						console.log(resp.data.data.id_genero);
						// le asigno la ciudad que se corresponde por el id
						$scope.user['id_genero'] = resp.data.genero;
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
					if(response.success) {
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
			console.log(user);
			// Guardo la password nueva del usuario
			Usuario.editarPassword(user).then(function(response) {
				if(response.success) {
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