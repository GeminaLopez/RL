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

Route::middleware('auth:api')->group( function () {
    // Perfil
    Route::put('/perfil', 'API\\UsuariosController@editarPerfilUsuario');
    Route::patch('/perfil', 'API\\UsuariosController@editarPasswordUsuario');
    Route::get('/perfil/getNoAmigos/{id}', 'API\\UsuariosController@getNoAmigos');
    Route::get('/perfil/getAmigos/{id}', 'API\\UsuariosController@getAmigos');
    Route::post('/perfil/agregarAmigo', 'API\\UsuariosController@agregarAmigo');
    Route::delete('/perfil/eliminarAmigo/{id}', 'API\\UsuariosController@eliminarAmigo');

    // Comentarios
    Route::get('comentarios', 'API\\ComentariosController@index');
    Route::post('comentarios', 'API\\ComentariosController@nuevoComentario');
    Route::get('comentarios/{id}', 'API\\ComentariosController@detalleComentario');

    // Posts
    Route::get('posts', 'API\\PostsController@index');
    Route::post('posts', 'API\\PostsController@nuevoPost');

});

// Usuarios
Route::get('usuarios', 'API\\UsuariosController@index');
Route::post('usuarios', 'API\\UsuariosController@nuevoUsuario');

// Ciudad
Route::get('ciudad', 'API\\CiudadesController@index');
Route::get('ciudad/{id}', 'API\\CiudadesController@traerCiudadPorID');

// Genero
Route::get('genero', 'API\\GenerosController@index');
Route::get('genero/{id}', 'API\\GenerosController@traerGeneroPorID');

// Auth - Login
Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login');
      
    Route::group(['middleware' => 'auth:api'], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    }); 
});
