<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});


// Esto lo vamos a necesitar para CORS, eventualmente.
//Route::options('/{any}', function() {return '';})->where('any', '.*');

// primer parametro la ruta
// segundo parametro el controlador
// tercer parametro que use el middleware
//Route::resource('/ciudad', 'CiudadesController', ['middleware' => 'auth:api']);

Route::middleware('auth:api')->group( function () {
    // Perfil
    Route::put('/perfil', 'API\\UsuariosController@editarPerfilUsuario');
    Route::patch('/perfil', 'API\\UsuariosController@editarPasswordUsuario');
    /*Route::get('/perfil/getNoAmigos', 'API\\UsuarioController@getNoAmigos');
    Route::get('/perfil/getAmigos', 'API\\UsuarioController@getAmigos');
    Route::post('/perfil/agregarAmigo', 'API\\UsuarioController@agregarAmigo');
    Route::delete('/perfil/eliminarAmigo/{id}', 'API\\UsuarioController@eliminarAmigo');*/

});

// Usuarios
Route::get('usuarios', 'API\\UsuariosController@index');
Route::post('usuarios', 'API\\UsuariosController@nuevoUsuario');
/*Route::get('usuarios/{id}', 'API\\UsuariosController@detallesUsuario');
Route::delete('usuarios/{id}', 'API\\UsuariosController@eliminarUsuario');
Route::put('usuarios/{id}/Password', 'API\\UsuariosController@editarPasswordUsuario');
Route::put('usuarios/{id}/Perfil', 'API\\UsuariosController@editarPerfilUsuario');*/

// Ciudad
Route::get('ciudad', 'API\\CiudadesController@index');
Route::get('ciudad/{id}', 'API\\CiudadesController@traerCiudadPorID');

// Genero
Route::get('genero', 'API\\GenerosController@index');
Route::get('genero/{id}', 'API\\GenerosController@traerGeneroPorID');


Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login');
      
    Route::group(['middleware' => 'auth:api'], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });   
});
