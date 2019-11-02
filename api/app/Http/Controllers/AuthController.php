<?php
namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $request->validate(User::$rules, User::$errorMessages);
        $input = $request->input();
        User::create();
        return response()->json(['status' => 1]);
        
    }

    public function login(Request $request)
    {
        $request->validate(User::$rulesLogin, User::$errorMessagesLogin);
        $credentials = request(['email', 'password']);
        if (!$token = Auth::attempt($credentials)) {
            return response()->json([
                'status' => 401,
                'mensaje' => 'Credenciales no válidas'], 401);
        }
        $user = $request->user();
        
        return response()->json([
            'status' => 1,
            'access_token' => $token
        ])->withCookie('token', $token, 3600, '/', null, false, true);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'status' => 1,
            'message' => 'Successfully logged out'
        ]);
    }

    public function user(Request $request)
    {
        $user = $request->user();
        $user["fecha_nac"] = Carbon::parse($request->user()->fecha_nac);
        return response()->json($user);
    }
}