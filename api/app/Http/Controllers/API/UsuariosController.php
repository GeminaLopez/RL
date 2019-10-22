<?php

namespace App\Http\Controllers\API;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Hash;
use Carbon\Carbon;

class UsuariosController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $usuarios = User::all();
        return response()->json($usuarios);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function nuevoUsuario(Request $request)
    {
        $input = $request->input();
        $request->validate(User::$rules, User::$errorMessages);
        var_dump($input['fecha_nac']);
        die();

        $input['fecha_nac']= Carbon::createFromFormat('Y-m-d', $input['fecha_nac']);

        var_dump($input['fecha_nac']);
        die();

        // Chequeamos si hay una imagen avatar.
        if($request->hasFile('avatar')) {
           $path = $request->avatar->store('/public/imgs/usuarios');
           $path = explode('/',$path);
           $input['avatar']= $path[3];
        } else {
            $input['avatar'] = '';
        }
        $password = $request->password;
        $input['password'] = Hash::make($password);

        User::create($input);
        return response()->json(['success' => true]);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function detallesUsuario($id)
    {
        $usuario = User::findOrFail($id);
        return response()->json($usuario);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function eliminarUsuario($id)
    {
        $usuario = User::findOrFail($id);
        $usuario->delete($id);
        return response()->json(['success' => true]);
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function editarPerfilUsuario(Request $request)
    {
        $input = $request->input();
        $request->validate(User::$rulesEdicion, User::$errorMessagesEdicion);
        $usuario = User::findOrFail($input->id_user);
        $usuario->update($input);
        return response()->json(['success' => true]);
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function editarPasswordUsuario(Request $request)
    {
        $input = $request->input();
        $request->validate(User::$rulePassword, User::$errorMessagesPassword);
        $usuario = User::findOrFail($id);
        $usuario->update($input);
        return response()->json(['success' => true]);
    }
}
