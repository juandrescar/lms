<?php

namespace App\Docs;

/**
 * @OA\Schema(
 *   schema="LoginRequest",
 *   required={"email", "password"},
 *
 *   @OA\Property(property="email", type="string", format="email", example="user@example.com"),
 *   @OA\Property(property="password", type="string", format="password", example="password")
 * )
 */
class LoginRequest {}

/**
 * @OA\Schema(
 *     schema="UserResource",
 *     type="object",
 *     title="Usuario",
 *     @OA\Property(property="id", type="string"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="role", type="string")
 * )
 */
class UserResource {}

/**
 * @OA\Schema(
 *     schema="Error422",
 *     type="object",
 *     title="Error de validación",
 *     @OA\Property(property="message", type="string", example="Credenciales inválidas."),
 *     @OA\Property(
 *         property="errors",
 *         type="object",
 *         @OA\Property(
 *             property="email",
 *             type="array",
 *             @OA\Items(type="string", example="Credenciales inválidas.")
 *         )
 *     )
 * )
 */
class Error422 {}

/**
 * @OA\Schema(
 *     schema="Error401",
 *     type="object",
 *     title="Unauthorized",
 *     @OA\Property(property="result", type="string", example="error"),
 *     @OA\Property(property="message", type="string", example="Unauthenticated."),
 * )
 */
class Error401 {}

/**
 * @OA\Schema(
 *     schema="Error403",
 *     type="object",
 *     title="Forbidden",
 *     @OA\Property(property="result", type="string", example="error"),
 *     @OA\Property(property="message", type="string", example="Prohibido – Usted no tiene permiso para acceder a este servidor"),
 * )
 */
class Error403 {}
