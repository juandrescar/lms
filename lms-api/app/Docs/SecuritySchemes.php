<?php

namespace App\Docs;
/**
 * @OA\SecurityScheme(
 *     securityScheme="sanctum",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 */
class SecuritySchemes {}

/**
 * @OA\Schema(
 *     schema="Error404",
 *     type="object",
 *     title="Not Found",
 *     @OA\Property(property="result", type="string", example="error"),
 *     @OA\Property(property="message", type="string", example="Elemento no encontrado"),
 * )
 */
class Error404 {}