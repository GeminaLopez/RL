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
    Route::get('/perfil', 'API\\UsuarioController@perfil');
    /*Route::put('/perfil', 'API\\UsuarioController@editar');
    Route::patch('/perfil', 'API\\UsuarioController@editarPassword');
    Route::get('/perfil/getNoAmigos', 'API\\UsuarioController@getNoAmigos');
    Route::get('/perfil/getAmigos', 'API\\UsuarioController@getAmigos');
    Route::post('/perfil/agregarAmigo', 'API\\UsuarioController@agregarAmigo');
    Route::delete('/perfil/eliminarAmigo/{id}', 'API\\UsuarioController@eliminarAmigo');*/
});

// Ciudad
Route::resource('ciudad', 'API\\CiudadesController');
Route::get('ciudad/{id}', 'API\\CiudadesController@traerCiudadPorID');


Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
      
    Route::group(['middleware' => 'auth:api'], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });   
});
