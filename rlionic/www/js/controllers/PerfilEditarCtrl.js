// Agregamos un nuevo controller al módulo de controllers que ionic
angular.module('RedLight.controllers')
.controller('PerfilEditarCtrl', [
	'$scope',
	'$state',
	'$ionicPopup',
	'Usuario',
	'Ciudad',
	'Genero',
	'SERVER',
	'Auth',
	function($scope,$state,$ionicPopup, Usuario, Ciudad, Genero, SERVER, Auth) {
		$scope.user = {
			nombre: null,
			apellido: null,
			id_ciudad: null,
			id_genero: null,
			avatar: null,
			brinda_servicio: null,	
			fecha_nac: null,
			password: null,
		};

		$scope.api_server = SERVER+"storage/";

		// Justo de antes de entrar a la vista, le pedimos que traiga los datos del usuario.
		$scope.$on('$ionicView.beforeEnter', function() {
			Auth.getUser().then(function(response) {
				//console.log(response);
				if(response.id_user !== null) {
					Ciudad.traerCiudadPorID(response.id_ciudad).then(function(resp){
						// le asigno la ciudad que se corresponde por el id
						$scope.user['id_ciudad'] = resp.data.id_ciudad;
					});
					Genero.traerGeneroPorID(response.id_genero).then(function(resp){
						// le asigno la ciudad que se corresponde por el id
						$scope.user['id_genero'] = resp.data.id_genero;
					});

					$soloFecha = response.fecha_nac.split(" ")[0];
					$formatoEspaniol = $soloFecha.split("-")[2]+"/"+$soloFecha.split("-")[1]+"/"+$soloFecha.split("-")[0];

					$scope.user = {
						id_user: response.id_user,
						nombre: response.nombre,
						apellido: response.apellido,
						avatar: response.avatar,
						brinda_servicio: response.brinda_servicio,	
						fecha_nac: new Date(response.fecha_nac),
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
                    //$scope.user.avatar = avatar.files[0];                  
                    editar(user);
                });
                
			}
			
			function editar(user){
				// Guardo los datos que el usuario editó
				Usuario.editar(user).then(function(response) {
					if(response.status == 200) {
						$ionicPopup.alert({
							title: 'Éxito!',
							template: 'El usuario fue editado con éxito'
						}).then(function() {
							// Lo redireccionamos al perfil nuevamente.
							$state.go('tab.perfil');
						});
					}
				}).catch(function(err)
				{
					$scope.errores = err.data.errors;
					$ionicPopup.alert({
						title: 'Error',
						template: 'Por favor, revisá los campos del formulario.'
					});
				});
			}
		};

		$scope.editarPassword = function(pass){
			// Guardo la password nueva del usuario
			Usuario.editarPassword(pass).then(function(resp) {
				//console.log(resp);
				if(resp.status == 200) {
					$ionicPopup.alert({
						title: 'Éxito!',
						template: 'La password fue editada con éxito'
					}).then(function() {
						// Lo redireccionamos al perfil nuevamente.
						$state.go('tab.perfil');
					});
				}
			}).catch(function(err)
			{
				$scope.errores = err.data.errors;
				$ionicPopup.alert({
					title: 'Error',
					template: 'Por favor, revisá el campo clave'
				});
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