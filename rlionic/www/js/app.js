// defino el modulo ng-app
angular.module('RedLight', ['ionic', 'RedLight.controllers', 'RedLight.services','ngCordova'])
.run(function($ionicPlatform, $ionicPopup, $rootScope, $state, Auth) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
	  StatusBar.styleLightContent();
	}
  });

  // Agrego la lógica para el bloqueo de usuarios no autorizados a ciertas vistas.   
  // Detectamos el cambio de rutas.
  $rootScope.$on('$stateChangeStart', function(event, toState){
    // Pregunto si esta ruta requiere autenticación o no.
    if(toState.data != undefined && toState.data.requiresAuth == true) {
      // Verifico si el usuario está autenticado o no.
      if(!Auth.isLogged()) {
        // No está logueado, así que prohibimos el acceso.
        event.preventDefault();
        $ionicPopup.alert({
			  title: 'Error',
			  template: 'Tenés que estar logueado para poder acceder a esta pantalla.'
        }).then(function() {
			$state.go('tab.login');
		});
      }
	}else if(toState.data != undefined && toState.data.requiresGuest == true)
	{
		if(Auth.isLogged()) {
			// si está logueado, lo llevo a su perfil
			event.preventDefault();
			$state.go(toState.data.redirectTo);
		  }
	}
  });
})

// Módulo permite el uso de subvistas.
.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {

	$httpProvider.defaults.withCredentials = true;
	$ionicConfigProvider.tabs.position("bottom");

  	$stateProvider
 	 .state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'templates/tabs.html'
	})

	// Creo la vista de Posts.
	.state('tab.posts', {
		url: '/posts',
		views: {
		'tab-home': {
			templateUrl: 'templates/tab-posts.html',
			controller: 'PostsCtrl'
			}
		}
	})

	// Creo la vista de Posts de amigos.
	.state('tab.posts-amigos', {
		url: '/posts/amigos',
		views: {
		'tab-home': {
			templateUrl: 'templates/tab-posts-amigos.html',
			controller: 'PostsAmigosCtrl'
			}
		},
		data: {
			requiresAuth: true,
			redirectTo:'tab.perfil'
		}
	})

	// Creo la vista de posts nuevos.
	.state('tab.posts-nuevo', {
		url: '/posts/nuevo',
		views: {
			'tab-home': {
			templateUrl: 'templates/tab-posts-nuevo.html',
			controller: 'PostsNuevoCtrl'
			}
		},
		data: {
			requiresAuth: true,
			redirectTo:'tab.perfil'
		}
	})

	// Creo la vista de Comentarios
	.state('tab.comentarios', {
		url: '/comentarios/:id',
		views: {
			'tab-home': {
				templateUrl: 'templates/tab-comentarios.html',
				controller: 'ComentariosCtrl'
			}
		},
		data: {
			requiresAuth: true,
			redirectTo:'tab.perfil'
		}
	})

	// Creo la vista de comentarios nuevos.
	.state('tab.comentarios-nuevo', {
		url: '/comentarios/nuevo/:id',
		views: {
			'tab-home': {
				templateUrl: 'templates/tab-comentarios-nuevo.html',
				controller: 'ComentariosNuevoCtrl'
			}
		},
		data: {
			requiresAuth: true,
			redirectTo:'tab.perfil'
		}
	})

	// Creo la vista de contactos.
	.state('tab.contactos', {
		url: '/contactos',
		views: {
			'tab-perfil': {
				templateUrl: 'templates/tab-contactos.html',
				controller: 'ContactosCtrl'
			}
		},
		data: {
			requiresAuth: true,
			redirectTo:'tab.perfil'
		}
	})

	// Creo la vista de login.
	.state('tab.login', {
		url: '/login',
		views: {
			'tab-perfil': {
				templateUrl: 'templates/tab-login.html',
				controller: 'LoginCtrl'
			}
		},
		data:{
			requiresGuest:true,
			redirectTo:'tab.perfil'
		}
	})

	// Creo la vista de registro.
	.state('tab.registro', {
		url: '/registro',
		views: {
			'tab-perfil': {
				templateUrl: 'templates/tab-registro.html',
				controller: 'LoginCtrl'
			}
		}
	})

	// creo la vista de perfil.
	.state('tab.perfil', {
		url: '/perfil',
			views: {
			'tab-perfil': {
				templateUrl: 'templates/tab-perfil.html',
				controller: 'PerfilCtrl'
			}
		},
		data: {
			requiresAuth: true
		}
	})

	// creo la vista de edición del perfil.
	.state('tab.perfil-editar', {
		url: '/perfil/editar',
			views: {
			'tab-perfil': {
				templateUrl: 'templates/tab-perfil-editar.html',
				controller: 'PerfilEditarCtrl'
			}
		},
		data: {
			requiresAuth: true
		}
	})

	// creo la vista de perfil.
	.state('tab.perfil-editar-password', {
		url: '/perfil/editar/password',
			views: {
			'tab-perfil': {
				templateUrl: 'templates/tab-perfil-editar-password.html',
				controller: 'PerfilEditarCtrl'
			}
		},
		data: {
			requiresAuth: true
		}
	})

	// creo la vista de mensajes.
	.state('tab.mensajes', {
		url: '/mensajes',
			views: {
			'tab-mensajes': {
				templateUrl: 'templates/tab-mensajes.html',
				controller: 'MensajesCtrl'
			}
		},
		data: {
			requiresAuth: true
		}
	})

	// Creo la vista de mensajes por idUsuario.
	.state('tab.mensajes-chat', {
		url: '/mensajes/:id',
		views: {
			'tab-mensajes': {
				templateUrl: 'templates/tab-mensajes-chat.html',
				controller: 'MensajesChatCtrl'
			}
		},
		data: {
			requiresAuth: true,
			redirectTo:'tab.perfil'
		}
	})

	// Creo la vista de mensaje nuevo.
	.state('tab.mensajes-nuevo', {
		url: '/mensajes-nuevo',
		views: {
			'tab-mensajes': {
				templateUrl: 'templates/tab-mensajes-nuevo.html',
				controller: 'MensajesNuevoCtrl'
			}
		},
		data: {
			requiresAuth: true,
			redirectTo:'tab.perfil'
		}
	})

	// Creo la vista de mapa.
	.state('tab.mapa', {
		url: '/mapa',
		views: {
			'tab-mapa': {
				templateUrl: 'templates/tab-mapa.html',
				controller: 'MapaCtrl'
			}
		}/*,
		data: {
			requiresAuth: true,
			redirectTo:'tab.perfil'
		}*/
	})

	;

	// Si no encuentra la ruta lo lleva a posts
	$urlRouterProvider.otherwise('/tab/posts');

})

// Definimos la constante con la ruta de la api.
//.constant('API_SERVER', 'http://localhost:8000/api')
.constant('API_SERVER', 'https://gemlopez.space/public/api')
// Definimos la constante con la ruta de la api.
//.constant('SERVER', 'http://localhost:8000/');
.constant('SERVER', 'https://gemlopez.space/public/');
