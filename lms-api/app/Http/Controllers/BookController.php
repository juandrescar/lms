<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Models\Book;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class BookController extends Controller
{
    use AuthorizesRequests;

    /**
     * @OA\Get(
     *     path="/api/books",
     *     summary="Obtener todos los libros",
     *     tags={"Books"},
     *
     *     @OA\Response(
     *         response=200,
     *         description="Lista de libros",
     *
     *         @OA\JsonContent(
     *             type="array",
     *
     *             @OA\Items(
     *                 @OA\Property(property="book", ref="#/components/schemas/BookResource"),
     *             )
     *         )
     *     )
     * )
     */
    public function index(Book $book)
    {
        return Book::all();
    }

    /**
     * @OA\Post(
     *     path="/api/books",
     *     summary="Crear un nuevo libro",
     *     tags={"Books"},
     *     security={{"sanctum":{}}},
     *
     *     @OA\RequestBody(
     *         required=true,
     *
     *         @OA\JsonContent(
     *             required={"title", "author"},
     *
     *             @OA\Property(property="title", type="string", example="El amor en los tiempos del cólera"),
     *             @OA\Property(property="author", type="string", example="Gabriel García Márquez"),
     *             @OA\Property(property="ISBN", type="string", example="9788439735427"),
     *             @OA\Property(property="publication_year", type="number", example="1985")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=201,
     *         description="Libro creado exitosamente",
     *
     *         @OA\JsonContent(
     *             @OA\Property(property="book", ref="#/components/schemas/BookResource")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(ref="#/components/schemas/Error401")
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden",
     *         @OA\JsonContent(ref="#/components/schemas/Error403")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Unprocessable Content",
     *         @OA\JsonContent(ref="#/components/schemas/Error422")
     *     )
     * )
     */
    public function store(StoreBookRequest $request)
    {
        $this->authorize('create', Book::class);

        return Book::create($request->validated());
    }

    /**
     * @OA\Get(
     *     path="/api/books/{id}",
     *     summary="Obtener un libro por ID",
     *     tags={"Books"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del libro",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Libro encontrado",
     *         @OA\JsonContent(
     *             @OA\Property(property="book", ref="#/components/schemas/BookResource")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Libro no encontrado"
     *     )
     * )
     */
    public function show(Book $book)
    {
        return $book;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        $this->authorize('update', $book);
        $book->update($request->validated());

        return $book;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $this->authorize('delete', $book);
        $book->delete();

        return response()->noContent();
    }

    public function search(Request $request)
    {
        $query = $request->input('q');

        $books = Book::query()
            ->where('title', 'like', "%{$query}%")
            ->orWhere('author', 'like', "%{$query}%")
            ->orWhere('ISBN', 'like', "%{$query}%")
            ->get();

        return response()->json($books);
    }
}
