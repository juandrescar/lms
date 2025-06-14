<?php

namespace Tests\Feature;

use App\Models\Book;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class BookTest extends TestCase
{
    use RefreshDatabase;

    protected function authenticateAdmin()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin, 'sanctum');

        return $admin;
    }

    #[Test]
    public function admin_can_create_a_book()
    {
        $this->authenticateAdmin();

        $response = $this->postJson('/api/books', [
            'title' => 'Clean Code',
            'author' => 'Robert C. Martin',
            'ISBN' => '1234567890',
            'publication_year' => 2008,
            'available' => true,
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('books', ['title' => 'Clean Code']);
    }

    #[Test]
    public function guest_cannot_create_a_book()
    {
        $response = $this->postJson('/api/books', [
            'title' => 'Unauthorized Book',
        ]);

        $response->assertUnauthorized();
    }

    #[Test]
    public function it_lists_books()
    {
        Book::factory(5)->create();

        $response = $this->getJson('/api/books');

        $response->assertOk()->assertJsonCount(5);
    }

    #[Test]
    public function admin_can_update_a_book()
    {
        $this->authenticateAdmin();

        $book = Book::factory()->create();
        $response = $this->putJson("/api/books/{$book->id}", [
            'title' => 'Updated Title',
            'author' => $book->author,
            'ISBN' => $book->ISBN,
            'publication_year' => $book->publication_year,
            'available' => false,
        ]);

        $response->assertOk();
        $this->assertDatabaseHas('books', ['title' => 'Updated Title']);
    }

    #[Test]
    public function admin_can_delete_a_book()
    {
        $this->authenticateAdmin();

        $book = Book::factory()->create();
        $response = $this->deleteJson("/api/books/{$book->id}");

        $response->assertNoContent();
        $this->assertDatabaseMissing('books', ['id' => $book->id]);
    }
}
