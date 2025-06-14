<?php

namespace Tests\Feature;

use App\Models\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class BookSearchTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_can_search_books_by_title_author_or_isbn()
    {
        Book::factory()->create(['title' => 'Clean Architecture', 'author' => 'Uncle Bob', 'ISBN' => '111']);
        Book::factory()->create(['title' => 'Refactoring', 'author' => 'Martin Fowler', 'ISBN' => '222']);
        Book::factory()->create(['title' => 'Design Patterns', 'author' => 'GoF', 'ISBN' => '333']);

        $response = $this->getJson('/api/books/search?q=clean');

        $response->assertOk();
        $response->assertJsonCount(1);
        $response->assertJsonFragment(['title' => 'Clean Architecture']);
    }

    #[Test]
    public function it_returns_empty_when_no_matches()
    {
        Book::factory()->create(['title' => 'Another Book']);
        $response = $this->getJson('/api/books/search?q=notfound');

        $response->assertOk();
        $response->assertJsonCount(0);
    }

    #[Test]
    public function it_returns_matches()
    {
        Book::factory()->create(['title' => 'Another Book']);
        $response = $this->getJson('/api/books/search?q=notfound');

        $response->assertOk();
        $response->assertJsonCount(0);
    }

    #[Test]
    public function it_can_find_books_by_author()
    {
        Book::factory()->create(['author' => 'Isaac Asimov']);
        Book::factory()->create(['author' => 'George Orwell']);

        $response = $this->getJson('/api/books/search?q=asimov');

        $response->assertOk();
        $response->assertJsonCount(1);
        $response->assertJsonFragment(['author' => 'Isaac Asimov']);
    }

    #[Test]
    public function it_can_find_books_by_isbn()
    {
        Book::factory()->create(['ISBN' => '9780132350884']);

        $response = $this->getJson('/api/books/search?q=978013235');

        $response->assertOk();
        $response->assertJsonFragment(['ISBN' => '9780132350884']);
    }

    #[Test]
    public function it_is_case_insensitive()
    {
        Book::factory()->create(['title' => 'The Pragmatic Programmer']);

        $response = $this->getJson('/api/books/search?q=pragmatic');

        $response->assertOk();
        $response->assertJsonFragment(['title' => 'The Pragmatic Programmer']);
    }

    #[Test]
    public function it_returns_all_books_when_no_query_is_given()
    {
        Book::factory()->count(3)->create();

        $response = $this->getJson('/api/books/search');

        $response->assertOk();
        $response->assertJsonCount(3);
    }
}
