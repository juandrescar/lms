<?php

namespace Tests\Feature;

use App\Models\Book;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BorrowingTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create(['role' => 'admin']);
        $this->user = User::factory()->create(['role' => 'user']);
    }

    public function test_admin_can_borrow_book()
    {
        $book = Book::factory()->create(['available' => true]);

        $this->actingAs($this->admin, 'sanctum')
            ->postJson("/api/users/{$this->user->id}/borrowings", [
                'book_id' => $book->id,
            ])
            ->assertStatus(200)
            ->assertJson(['message' => 'Book borrowed successfully']);

        $this->assertDatabaseHas('borrowings', [
            'user_id' => $this->user->id,
            'book_id' => $book->id,
        ]);
    }

    public function test_user_cannot_borrow_book()
    {
        $book = Book::factory()->create(['available' => true]);

        $this->actingAs($this->user, 'sanctum')
            ->postJson("/api/users/{$this->user->id}/borrowings", [
                'book_id' => $book->id,
            ])
            ->assertStatus(403);
    }

    public function test_admin_can_return_book()
    {
        $book = Book::factory()->create(['available' => false]);
        $borrowing = $this->user->borrowings()->create([
            'book_id' => $book->id,
            'borrowed_at' => now(),
            'due_date' => now()->addDays(14),
        ]);

        $this->actingAs($this->admin, 'sanctum')
            ->deleteJson("/api/users/{$this->user->id}/borrowings/{$book->id}")
            ->assertStatus(200)
            ->assertJson(['message' => 'Book returned successfully']);

        $this->assertSoftDeleted('borrowings', ['id' => $borrowing->id]);
    }

    public function test_user_cannot_return_book()
    {
        $book = Book::factory()->create(['available' => false]);
        $this->user->borrowings()->create([
            'book_id' => $book->id,
            'borrowed_at' => now(),
            'due_date' => now()->addDays(14),
        ]);

        $this->actingAs($this->user, 'sanctum')
            ->deleteJson("/api/users/{$this->user->id}/borrowings/{$book->id}")
            ->assertStatus(403);
    }

    public function test_user_can_view_their_own_borrowings()
    {
        $book = Book::factory()->create(['available' => false]);
        $this->user->borrowings()->create([
            'book_id' => $book->id,
            'borrowed_at' => now(),
            'due_date' => now()->addDays(14),
        ]);

        $this->actingAs($this->user, 'sanctum')
            ->getJson("/api/users/{$this->user->id}/borrowings")
            ->assertStatus(200)
            ->assertJsonFragment(['book_id' => $book->id]);
    }

    public function test_user_cannot_view_others_borrowings()
    {
        $other = User::factory()->create(['role' => 'user']);

        $this->actingAs($this->user, 'sanctum')
            ->getJson("/api/users/{$other->id}/borrowings")
            ->assertStatus(403);
    }

    public function test_user_can_view_their_borrowing_history()
    {
        $book = Book::factory()->create(['available' => false]);
        $borrowing = $this->user->borrowings()->create([
            'book_id' => $book->id,
            'borrowed_at' => now(),
            'due_date' => now()->addDays(14),
            'returned_at' => now(),
        ]);
        $borrowing->delete();

        $this->actingAs($this->user, 'sanctum')
            ->getJson("/api/users/{$this->user->id}/borrowings/history")
            ->assertStatus(200)
            ->assertJsonFragment(['book_id' => $book->id]);
    }

    public function test_user_cannot_borrow_more_than_3_books()
    {
        $books = Book::factory()->count(4)->create(['available' => true]);

        $this->actingAs($this->user, 'sanctum');

        // Préstamo de 3 libros
        foreach ($books->take(3) as $book) {
            $response = $this->actingAs($this->admin, 'sanctum')->postJson("/api/users/{$this->user->id}/borrowings", [
                'book_id' => $book->id,
            ]);
            $response->assertStatus(200);
        }

        // Intento de un 4to libro
        $response = $this->actingAs($this->admin, 'sanctum')->postJson("/api/users/{$this->user->id}/borrowings", [
            'book_id' => $books[3]->id,
        ]);

        $response->assertStatus(403);
        $response->assertJson([
            'error' => 'You cannot borrow more than 3 books',
        ]);
    }

    public function test_user_cannot_borrow_unavailable_book()
    {
        $book = Book::factory()->create(['available' => false]);

        $this->actingAs($this->user, 'sanctum');

        $response = $this->actingAs($this->admin, 'sanctum')->postJson("/api/users/{$this->user->id}/borrowings", [
            'book_id' => $book->id,
        ]);

        $response->assertStatus(400);
        $response->assertJson([
            'error' => 'Book is not available',
        ]);
    }
}
