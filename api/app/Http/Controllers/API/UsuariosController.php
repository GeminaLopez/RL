<?php

namespace App\Http\Controllers\API;

use App\User;
use App\Models\Contacto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Hash;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

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
        $request->validate(User::$rules, User::$errorMessages);
        $input = $request->input();
        $input['fecha_nac'] = Carbon::parse($request->fecha_nac);//->format('Y-m-d');

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
        return response()->json(['status' => 1]);
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
        $request->validate(User::$rulesEdicion, User::$errorMessagesEdicion);
        $input = $request->input();
        $usuario = User::findOrFail($input["id_user"]);
        $input["fecha_nac"] = Carbon::parse($request->fecha_nac);
        // Chequeamos si hay una imagen avatar.
        if($request->hasFile('avatar')) {
            $path = $request->avatar->store('/public/imgs/usuarios');
            $path = explode('/',$path);
            $input['avatar']= $path[3];
        } else {
            $input['avatar'] = '';
        }
        $usuario->update($input);
        return response()->json(['status' => 1]);
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
        $usuario = User::findOrFail($input["id_user"]);
        $password = $request->password;
        $input['password'] = Hash::make($password);
        $usuario->update($input);
        return response()->json(['status' => 1]);
    }

    /**
	 * Obtiene todos los usuarios que no son amigos del usuario
	 *
	 */
    public function getNoAmigos($userId)
	{
        $id = $userId;
        $sql = "SELECT *
                FROM users u
                WHERE NOT EXISTS ( SELECT 1 FROM contactos c 
                                WHERE c.id_user_1 = u.id_user AND c.id_user_2 = ?)
                AND NOT EXISTS ( SELECT 1 FROM contactos co 
                                WHERE co.id_user_2 = u.id_user AND co.id_user_1 = ?) 
                AND u.id_user <> ?";
        
        $stmt = DB::getPdo()->prepare($sql);
        $stmt->execute([$id,$id,$id]);
        $noAmigos = $stmt->fetchAll(\PDO::FETCH_CLASS, 'stdClass');

       //$noAmigos = DB::select($sql,array($id,$id,$id));
        //var_dump($result);
        //die();

        //$results = $stmt->fetch();
        //echo '<pre>';
        //print_r($results);
        //echo '</pre>';   
        //die();

        return response()->json($noAmigos);
	}

	/**
	 * Obtiene todos los amigos del usuario
	 *
	 */
	public function getAmigos($userId)
	{
		$id = $userId;
        $sql = "SELECT * FROM users u 
                WHERE EXISTS ( SELECT 1 FROM contactos c
                            WHERE c.id_user_1 = u.id_user AND c.id_user_2 = ?)
                OR EXISTS ( SELECT 1 FROM contactos co
                            WHERE co.id_user_2 = u.id_user AND co.id_user_1 = ? )
                AND u.id_user <> ?";
        
        $stmt = DB::getPdo()->prepare($sql);
        $stmt->execute([$id,$id,$id]);
        $amigos = $stmt->fetchAll(\PDO::FETCH_CLASS, 'stdClass');

       //$amigos = DB::select($sql,array($id,$id,$id));
        //var_dump($result);
        //die();

        return response()->json($amigos);
	}
}
