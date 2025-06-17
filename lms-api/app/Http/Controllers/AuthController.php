<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(private AuthService $auth) {}

    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="Login de usuario",
     *     tags={"Auth"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(ref="#/components/schemas/LoginRequest")
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Login exitoso",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="user", ref="#/components/schemas/UserResource"),
     *             @OA\Property(property="token", type="string")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=422,
     *         description="Credenciales inválidas",
     *
     *         @OA\JsonContent(ref="#/components/schemas/Error422")
     *     )
     *
     * )
     */
    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $result = $this->auth->login($data);

        return response()->json($result);
    }

    /**
     * @OA\Post(
     *     path="/api/logout",
     *     summary="Cerrar sesión del usuario",
     *     tags={"Auth"},
     *     security={{"sanctum":{}}},
     *
     *     @OA\Response(
     *         response=200,
     *         description="Sesión cerrada correctamente",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Sesión cerrada")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *
     *         @OA\JsonContent(ref="#/components/schemas/Error401")
     *     )
     * )
     */
    public function logout(Request $request)
    {
        $this->auth->logout($request->user());

        return response()->json(['message' => 'Sesión cerrada']);
    }
}
