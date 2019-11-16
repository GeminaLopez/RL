<?php

namespace App\Http\Controllers\API;

use App\User;
use App\Models\Contacto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Hash;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Storage\File;

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
        /*if($input['avatar']) {
           $path = $input['avatar']->store('/public/imgs/usuarios');
           $path = explode('/',$path);
           $input['avatar']= $path[3];
        } else {
            $input['avatar'] = 'aaaa';
        }*/

        
        if($input['avatar']) {
            $input['avatar'] = File::subirImagen($input['avatar'],'usuarios');
        } else {
            $input['avatar'] = 'imgs/usuarios/defaultAvatar.png';
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
        /*if($request->hasFile('avatar')) {
            $path = $request->avatar->store('/public/imgs/usuarios');
            $path = explode('/',$path);
            $input['avatar']= $path[3];
        } else {
            $input['avatar'] = '';
        }*/
        if($input['avatar']) {
            $input['avatar'] = File::subirImagen($input['avatar'],'usuarios');
        } else {
            $input['avatar'] = 'imgs/usuarios/defaultAvatar.png';
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
        $input["fecha_nac"] = Carbon::parse($request->fecha_nac);
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

    /**
     * Inserta un nuevo amigo del usuario en la base de datos.
     *
     */
	public function agregarAmigo(Request $request)
	{
        // verificación para saber si el usuario está autenticado para hacer esta acción
       $userId = Auth::user()->id_user;

       //var_dump($request->all()[0]);

       $idNuevoAmigo = $request->all()[0]; 

		// Valido que los datos vengan y no sean vacíos
		if(isset($idNuevoAmigo) && !empty($idNuevoAmigo))
	 	{
			try {
				if($userId < $idNuevoAmigo){
                    $masChico = $userId;
                    $masGrande = $idNuevoAmigo;
                }
                else{
                    $masChico = $idNuevoAmigo;
                    $masGrande = $userId;
                }
        
                //var_dump($masChico);
                //var_dump($masGrande);
                //die();

                $created_at = Carbon::now();
                $updated_at = Carbon::now();

                $query = "INSERT INTO contactos (id_user_1, id_user_2, created_at, updated_at) VALUES (:id_user_1, :id_user_2, :created_at, :updated_at)";
                $stmt = DB::getPdo()->prepare($query);
                $exito = $stmt->execute([
                    'id_user_1'   => $masChico,
                    'id_user_2'   => $masGrande,
                    'created_at'  => $created_at,
                    'updated_at'  => $updated_at
                ]);

                //$results = $stmt->fetch();
                //echo '<pre>';
                //print_r($exito);
                //echo '</pre>';   
                //die();
                        
                if($exito) {
                    // Todo ok!
                    return response()->json(['status' => 1]);
                } else {
                    // Todo mal :(
                    return response()->json(['status' => 0]);
                }

				
			} catch(Exception $e) {
				// Todo mal :(
                return response()->json(['status' => -1]);
			}
		}
		else{
			// algun dato no vino o es vacío
            return response()->json(['status' => -2]);
        }

    }
    

    /**
	 * elimina un amigo.
	 *
	 */
	public function eliminarAmigo($idAmigoAEliminar)
	{
		// verificación para saber si el usuario está autenticado para hacer esta acción
        $userId = Auth::user()->id_user;
        //var_dump($userId);
        //die();

        $idAmigoAEliminar = (int)$idAmigoAEliminar;

		// Valido que los datos vengan y no sean vacíos
		if(isset($idAmigoAEliminar) && !empty($idAmigoAEliminar))
	 	{
			try {

                if($userId < $idAmigoAEliminar){
                    $masChico = $userId;
                    $masGrande = $idAmigoAEliminar;
                }
                else{
                    $masChico = $idAmigoAEliminar;
                    $masGrande = $userId;
                }

                //var_dump($masGrande);
                //die();
                $query = "DELETE FROM contactos WHERE id_user_1 = ? and id_user_2 = ?";
                $stmt = DB::getPdo()->prepare($query);
                $exitoDeleteAmigo = $stmt->execute([$masChico,$masGrande]);

                if(!$exitoDeleteAmigo)
                {
                    // Todo mal :(
                    return response()->json(['status' => 0]);
                }else{
                    // Todo ok!
				    return response()->json(['status' => 1]);
                }
				
			} catch(Exception $e) {
				// Todo mal :(
                return response()->json(['status' => 0]);
			}
		}
		else{
			// algun dato no vino o es vacío
			return response()->json(['status' => -1]);
		}
	}

    /**
	 * Obtiene todos los mensajes enviados al usuario
	 *
	 */
	public function getMensajes()
	{
        $userId = Auth::user()->id_user;
        $sql = "SELECT id_user,
                CONCAT(u.nombre,' ', u.apellido) AS nombre,
                u.avatar
                FROM users u 
                WHERE EXISTS ( SELECT 1 
                            FROM mensajes m
                            WHERE m.id_user_1 = u.id_user
                            AND m.id_user_2 = ? 
                        )
                OR EXISTS ( SELECT 1
                            FROM mensajes me
                            WHERE me.id_user_2 = u.id_user
                            AND me.id_user_1 = ? )";
        
        $stmt = DB::getPdo()->prepare($sql);
        $stmt->execute([$userId,$userId]);
        $mensajes = $stmt->fetchAll(\PDO::FETCH_CLASS, 'stdClass');

       //$amigos = DB::select($sql,array($id,$id,$id));
        //var_dump($result);
        //die();

        return response()->json($mensajes);
    }

    /**
	 * Obtiene todos los mensajes enviados/recibos entre usuario logueado y otro usuario
	 *
	 */
	public function getChat($id)
	{
        $userId = Auth::user()->id_user;
        $sql = "SELECT u.id_user,
                u.nombre,
                u.apellido,
                u.avatar,
                m.mensaje,
                m.created_at
                from users u
                inner join mensajes m on m.id_user_1 = u.id_user
                where (m.id_user_1 = ? and m.id_user_2 = ?)
                or (m.id_user_1 = ? and m.id_user_2 = ?)
                order by m.created_at asc";
        
        $stmt = DB::getPdo()->prepare($sql);
        $stmt->execute([$userId, $id, $id, $userId]);
        $mensajes = $stmt->fetchAll(\PDO::FETCH_CLASS, 'stdClass');

       //$amigos = DB::select($sql,array($id,$id,$id));
        //var_dump($result);
        //die();

        return response()->json($mensajes);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function todosMenosLogged()
    {
        $userId = Auth::user()->id_user;
        $usuarios = User::where('id_user','<>',$userId)->get();
        return response()->json($usuarios);
    }

    /**
	 * Crea un msj nuevo
	 *
	 */
	public function crearMensajeNuevo(Request $request)
	{
        $userId = Auth::user()->id_user;

        $request->validate(User::$rulesMensajeNuevo, User::$errorMessagesMensajeNuevo);

        $input = $request->all();

        $created_at = Carbon::now();
        $updated_at = Carbon::now();

        $query = "INSERT INTO mensajes (mensaje, id_user_1, id_user_2, created_at, updated_at)
                  VALUES (:mensaje, :id_user_1, :id_user_2, :created_at, :updated_at)";
        $stmt = DB::getPdo()->prepare($query);
        $exito = $stmt->execute([
            'mensaje'     => $input['mensaje'],
            'id_user_1'   => $userId,
            'id_user_2'   => $input['id_user'],
            'created_at'  => $created_at,
            'updated_at'  => $updated_at
        ]);

        if($exito) {
            // Todo ok!
            return response()->json(['status' => 1]);
        } else {
            // Todo mal :(
            return response()->json(['status' => 0]);
        }
    }

    /**
	 * envia un msj de chat
	 *
	 */
	public function enviarMensaje(Request $request, $id)
	{
        $userId = Auth::user()->id_user;

        $request->validate(User::$rulesMensajeChat, User::$errorMessagesMensajeChat);

        $input = $request->all();

        $created_at = Carbon::now();
        $updated_at = Carbon::now();

        $query = "INSERT INTO mensajes (mensaje,id_user_1, id_user_2, created_at, updated_at) VALUES (:mensaje, :id_user_1, :id_user_2, :created_at, :updated_at)";
        $stmt = DB::getPdo()->prepare($query);
        $exito = $stmt->execute([
            'mensaje'     => $input['mensaje'],
            'id_user_1'   => $userId,
            'id_user_2'   => $id,
            'created_at'  => $created_at,
            'updated_at'  => $updated_at
        ]);

        if($exito) {
            // Todo ok!
            return response()->json(['status' => 1]);
        } else {
            // Todo mal :(
            return response()->json(['status' => 0]);
        }
    }

    /**
	 * Actualiza ubicación
	 *
	 */
	public function actualizarUbicacion(Request $request)
	{
        $userId = Auth::user()->id_user;
        $input = $request->all();
        $usuario = User::findOrFail($userId);
        $usuario->update($input);
        return response()->json(['status' => 1]);
    }

}
