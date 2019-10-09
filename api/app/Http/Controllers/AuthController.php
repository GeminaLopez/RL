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
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'status' => 401,
                'mensaje' => 'Credenciales no válidas'], 401);
        }
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        //if ($request->remember_me) {
        $token->expires_at = Carbon::now()->addWeeks(1);
        //}
        $token->save();
        return response()->json([
            'status' => 1,
            'access_token' => $tokenResult->accessToken,
            'token_type'   => 'Bearer',
            'expires_at'   => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString(),
        ]);
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