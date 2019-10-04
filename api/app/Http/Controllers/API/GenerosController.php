<?php

namespace App\Http\Controllers\API;

use App\Models\Genero;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GenerosController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $generos = Genero::all();
        return response()->json($generos);
    }

    /**
     * Muestra el genero
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function traerGeneroPorID($id)
    {
         // findOrFail evalua si el id no existe, en caso de no existir lanza un 404
         $genero = Genero::findOrFail($id); 
         return response()->json($genero);
    }

}
