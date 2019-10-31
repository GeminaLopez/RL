<?php

namespace App\Http\Controllers\API;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
}
