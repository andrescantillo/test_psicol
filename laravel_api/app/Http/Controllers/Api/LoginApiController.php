<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\HandleResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\User;

class LoginApiController extends Controller
{

    public function validateToken(Request $request){
        return HandleResponse::sendResponse([], 'Authenticated');
    }

    public function login(Request $request){
        
        $validate =  Validator::make([
            'email' => 'required|email',
            'password' => 'required'
        ],[
            'email.required' => 'Se necesita ingresar el correo',
            'password.required' => 'Ingrese la contraseña',
        ]);

        if($validate->fails()){
            return HandleResponse::sendError('Error  de validacion.', $validate->errors());       
        }

        if(!Auth::attempt($request->only('email', 'password'))){
            return HandleResponse::sendError('Credenciales incorrectas', json_encode($request->only('email', 'password')));
        }

        $user = User::find(Auth::user()->id);
        $accessToken = $user->createToken('authToken')->accessToken;

        return HandleResponse::sendResponse(['user' => Auth::user(),'access_token' => $accessToken], 'Ha iniciado correctamente');
    }
}
