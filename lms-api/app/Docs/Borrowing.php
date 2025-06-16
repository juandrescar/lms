<?php

namespace App\Docs;

/**
 * @OA\Schema(
 *   schema="Borrowing",
 *   type="object",
 *   title="Borrowing",
 *   required={"id", "user_id", "book_id", "borrowed_at", "due_date"},
 *   @OA\Property(property="id", type="integer", example=100),
 *   @OA\Property(property="user_id", type="integer", example=1),
 *   @OA\Property(property="book_id", type="integer", example=10),
 *   @OA\Property(property="borrowed_at", type="string", format="date-time", example="2025-06-16T12:00:00Z"),
 *   @OA\Property(property="due_date", type="string", format="date-time", example="2025-06-30T12:00:00Z"),
 *   @OA\Property(property="returned_at", type="string", format="date-time", nullable=true, example=null),
 *   @OA\Property(property="book", ref="#/components/schemas/BookBorrowing"),
 * )
 */
class Borrowing {}

/**
 * @OA\Schema(
 *   schema="BookBorrowing",
 *   type="object",
 *   title="Book",
 *   required={"id", "title", "author", "available"},
 *   @OA\Property(property="id", type="integer", example=10),
 *   @OA\Property(property="title", type="string", example="Cien años de soledad"),
 *   @OA\Property(property="author", type="string", example="Gabriel García Márquez"),
 *   @OA\Property(property="available", type="boolean", example=true)
 * )
 */
class BookBorrowing {}

/**
 * @OA\Schema(
 *     schema="Error403Limit",
 *     type="object",
 *     title="Forbidden",
 *     @OA\Property(property="result", type="string", example="error"),
 *     @OA\Property(property="message", type="string", example="You cannot borrow more than 3 books"),
 * )
 */
class Error403Limit {}

/**
 * @OA\Schema(
 *     schema="Error400Unavailable",
 *     type="object",
 *     title="Forbidden",
 *     @OA\Property(property="result", type="string", example="error"),
 *     @OA\Property(property="message", type="string", example="Book is not available"),
 * )
 */
class Error400Unavailable {}
