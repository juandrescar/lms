<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Borrowing;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class BorrowingController extends Controller
{
    use AuthorizesRequests;

    /**
     * @OA\Get(
     *     path="/api/users/{user}/borrowings",
     *     summary="Listar préstamos activos de un usuario",
     *     description="Devuelve los préstamos activos (no devueltos) del usuario especificado.",
     *     operationId="getUserBorrowings",
     *     tags={"Borrowings"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         description="ID del usuario",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de préstamos activos",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Borrowing")
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
     * )
     */
    public function index(User $user)
    {
        // dd($user);
        Gate::authorize('view-borrowings', $user);
        $borrowings = Borrowing::with('book')
            ->where('user_id', $user->id)
            ->whereNull('returned_at')
            ->get();
        


        return response()->json($borrowings);
    }

    /**
     * @OA\Post(
     *     path="/api/users/{user}/borrowings",
     *     summary="Solicitar el préstamo de un libro",
     *     description="Permite a un usuario solicitar el préstamo de un libro disponible.",
     *     operationId="borrowBook",
     *     tags={"Borrowings"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         description="ID del usuario",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"book_id"},
     *             @OA\Property(property="book_id", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Libro prestado exitosamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Book borrowed successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(ref="#/components/schemas/Error401")
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden: El usuario no tiene permiso o alcanzó el límite de préstamos.",
     *         @OA\JsonContent(
     *             oneOf={
     *                 @OA\Schema(ref="#/components/schemas/Error403Limit"),
     *                 @OA\Schema(ref="#/components/schemas/Error403"),
     *             }
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(ref="#/components/schemas/Error400Unavailable")
     *     ),
     * )
     */
    public function store(Request $request, User $user)
    {
        $this->authorize('create', Borrowing::class);

        $request->validate(['book_id' => 'required|exists:books,id']);

        $book = Book::findOrFail($request->book_id);

        if (! $book->available) {
            return response()->json(['error' => 'Book is not available'], 400);
        }

        $activeBorrowings = Borrowing::where('user_id', $user->id)
            ->whereNull('returned_at')
            ->count();

        if ($activeBorrowings >= 3) {
            return response()->json(['error' => 'You cannot borrow more than 3 books'], 403);
        }

        Borrowing::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
            'borrowed_at' => now(),
            'due_date' => now()->addDays(14),
        ]);

        $book->update(['available' => false]);

        return response()->json(['message' => 'Book borrowed successfully']);
    }

    /**
     * @OA\Delete(
     *     path="/api/users/{user}/borrowings/{book}",
     *     summary="Devolver un libro prestado",
     *     description="Permite a un usuario devolver un libro que tiene prestado.",
     *     operationId="returnBook",
     *     tags={"Borrowings"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         description="ID del usuario",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="book",
     *         in="path",
     *         description="ID del libro",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Libro devuelto exitosamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Book returned successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(ref="#/components/schemas/Error404")
     *     ),
     * )
     * )
     */
    public function delete(User $user, Book $book)
    {
        $this->authorize('delete', $user, Borrowing::class);
        $borrowing = Borrowing::where('user_id', $user->id)
            ->where('book_id', $book->id)
            ->whereNull('returned_at')
            ->firstOrFail();

        $borrowing->update(['returned_at' => now()]);
        $borrowing->delete();

        $book->update(['available' => true]);

        return response()->json(['message' => 'Book returned successfully']);
    }

    /**
     * @OA\Get(
     *     path="/api/users/{user}/borrowings/history",
     *     summary="Historial de préstamos de un usuario",
     *     description="Devuelve el historial completo de préstamos (incluyendo los devueltos) del usuario.",
     *     operationId="getUserBorrowingHistory",
     *     tags={"Borrowings"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         description="ID del usuario",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Historial de préstamos",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Borrowing")
     *         )
     *     )
     * )
     */
    public function history(User $user)
    {
        Gate::authorize('view-borrowings', $user);

        $borrowings = Borrowing::withTrashed()
            ->with('book')
            ->where('user_id', $user->id)
            ->get();

        return response()->json($borrowings);
    }

    /**
     * @OA\Get(
     *     path="/api/books/{book}/current-borrowed",
     *     summary="Consultar quién tiene prestado un libro",
     *     description="Devuelve el usuario que actualmente tiene prestado el libro especificado.",
     *     operationId="getCurrentBorrower",
     *     tags={"Borrowings"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="book",
     *         in="path",
     *         description="ID del libro",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Usuario que tiene el libro prestado",
     *         @OA\JsonContent(
     *             @OA\Property(property="user", type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="Juan Pérez"),
     *                 @OA\Property(property="email", type="string", example="juan@example.com")
     *             )
     *         )
     *     ),
     * )
     */
    public function currentBorrowed(Book $book)
    {
        $borrowing = $book->borrowings()
            ->whereNull('returned_at')
            ->with('user')
            ->first();

        return $borrowing
            ? response()->json(['user' => $borrowing->user->only('id', 'name', 'email')])
            : response()->json(null);
    }
}
