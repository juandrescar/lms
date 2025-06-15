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

    public function index(User $user)
    {
        Gate::authorize('view-borrowings', $user);
        $borrowings = Borrowing::with('book')
            ->where('user_id', $user->id)
            ->whereNull('returned_at')
            ->get();

        return response()->json($borrowings);
    }

    public function store(Request $request, User $user)
    {
        $this->authorize('create', Borrowing::class);

        $request->validate(['book_id' => 'required|exists:books,id']);

        $book = Book::findOrFail($request->book_id);

        if (!$book->available) {
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

    public function history(User $user)
    {
        Gate::authorize('view-borrowings', $user);

        $borrowings = Borrowing::withTrashed()
            ->with('book')
            ->where('user_id', $user->id)
            ->get();

        return response()->json($borrowings);
    }

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
