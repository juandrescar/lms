<?php

namespace App\Docs;

/**
 * @OA\Schema(
 *   schema="User",
 *   type="object",
 *   required={"id", "name", "email"},
 *   @OA\Property(property="id", type="integer", example=1),
 *   @OA\Property(property="name", type="string", example="Juan Pérez"),
 *   @OA\Property(property="email", type="string", format="email", example="juan@example.com"),
 *   @OA\Property(property="role", type="string", example="user", description="Rol del usuario, puede ser 'admin' o 'user'"),
 *   @OA\Property(property="created_at", type="string", format="date-time", example="2024-06-16T12:34:56Z"),
 *   @OA\Property(property="updated_at", type="string", format="date-time", example="2024-06-16T12:34:56Z")
 * )
 */
 class User {}

/**
 * @OA\Schema(
 *   schema="UserCreateRequest",
 *   type="object",
 *   required={"name", "email", "password"},
 *   @OA\Property(property="name", type="string", example="Juan Pérez"),
 *   @OA\Property(property="email", type="string", format="email", example="juan@example.com"),
 *   @OA\Property(property="password", type="string", format="password", example="secret123"),
 *   @OA\Property(
 *     property="role",
 *     type="string",
 *     enum={"admin", "user"},
 *     example="user",
 *     description="Rol del usuario, solo puede ser 'admin' o 'user'"
 *   )
 * )
 */
 class UserCreateRequest {}

/**
 * @OA\Schema(
 *   schema="UserUpdateRequest",
 *   type="object",
 *   @OA\Property(property="name", type="string", example="Juan Pérez"),
 *   @OA\Property(property="email", type="string", format="email", example="juan@example.com"),
 *   @OA\Property(
 *     property="role",
 *     type="string",
 *     enum={"admin", "user"},
 *     example="user",
 *     description="Rol del usuario, solo puede ser 'admin' o 'user'"
 *   )
 * )
 */
 class UserUpdateRequest {}

 /**
 * @OA\Schema(
 *     schema="Error422User",
 *     type="object",
 *     title="Error de validación",
 *     @OA\Property(property="result", type="string", example="error"),
 *     @OA\Property(property="message", type="string", example="Datos inválidos."),
 *     @OA\Property(
 *         property="errors",
 *         type="object",
 *         @OA\Property(
 *             property="role",
 *             type="array",
 *             @OA\Items(type="string", example="The role field is required.")
 *         )
 *     )
 * )
 */
class Error422User {}