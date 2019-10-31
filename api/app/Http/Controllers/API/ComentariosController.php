<?php

namespace App\Http\Controllers\API;

use App\Models\Comentario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ComentariosController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $comentarios = Comentario::all();
        return response()->json($comentarios);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function nuevoComentario(Request $request)
    {
        $input = $request->input();
        $request->validate(Comentario::$rules, Comentario::$errorMessages);
        Comentario::create($input);
        return response()->json([
            'status' => 1,
            'success' => true
        ]);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function detalleComentario($id)
    {
        $comentario = Comentario::with(['users'])->where('id_post',$id)->get();
        return response()->json($comentario);
    }



}
