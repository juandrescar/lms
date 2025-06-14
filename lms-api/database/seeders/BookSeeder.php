<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Book::create([
            'title' => 'El Principito',
            'author' => 'Antoine de Saint-Exupéry',
            'ISBN' => '1234567890',
            'publication_year' => 1990,
            'available' => true,
        ]);

        Book::create([
            'title' => 'Cien Años de Soledad',
            'author' => 'Gabriel García Márquez',
            'ISBN' => '1234567891',
            'publication_year' => 1990,
            'available' => true,
        ]);

        Book::create([
            'title' => '1984',
            'author' => 'George Orwell',
            'ISBN' => '1234567892',
            'publication_year' => 1990,
            'available' => true,
        ]);
    }
}
