<?php

namespace App\Docs;

/**
 * @OA\Schema(
 *     schema="BookResource",
 *     type="object",
 *     title="Book",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="title", type="string", example="Cien años de soledad"),
 *     @OA\Property(property="author", type="string", example="Gabriel García Márquez"),
 *     @OA\Property(property="ISBN", type="string", example="0060114185"),
 *     @OA\Property(property="publication_year", type="number", example="1970"),
 *     @OA\Property(property="available", type="boolean", example=1)
 * )
 */
class BookResource {}