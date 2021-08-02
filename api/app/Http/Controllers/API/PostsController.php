<?php

namespace App\Http\Controllers\API;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PostsController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $posts = Post::with(['users'])->get();
        return response()->json($posts);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function nuevoPost(Request $request)
    {
        $input = $request->input();
        $request->validate(Post::$rules, Post::$errorMessages);
        Post::create($input);
        return response()->json([
            'status' => 1,
            'success' => true]);
    }

    /**
	 * elimina un post.
	 *
	 */
	public function eliminarPost($idPost)
	{
        $post = Post::findOrFail($idPost);
        $post->delete($idPost);
        return response()->json(['status' => 1]);
    }

    /**
     * listado de los post de los amigos
     *
     */
    public function postAmigos()
	{
        // verificación para saber si el usuario está autenticado para hacer esta acción
        $userId = Auth::user()->id_user;

        $sql = "SELECT p.id_post,
                titulo,
                CONCAT(u.nombre,' ', u.apellido) AS nombre,
                u.avatar,
                texto,
                p.created_at,
                p.deleted_at
                FROM posts as p
                left join users as u on u.id_user = p.id_user 
                where p.deleted_at IS NULL 
                and (p.id_user in (select id_user_2 from contactos where id_user_1 = ?)
                or p.id_user in (select id_user_1 from contactos where id_user_2 = ?)) 
                order by p.created_at ASC";
        
        $stmt = DB::getPdo()->prepare($sql);
        $stmt->execute([$userId,$userId]);
        $postAmigos = $stmt->fetchAll(\PDO::FETCH_CLASS, 'stdClass');

        return response()->json($postAmigos);
    }
}
