<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    protected function authenticateAdmin()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin, 'sanctum');

        return $admin;
    }

    protected function authenticateUser()
    {
        $user = User::factory()->create(['role' => 'User']);
        $this->actingAs($user, 'sanctum');

        return $user;
    }

    #[Test]
    public function admin_can_create_a_user()
    {
        $this->authenticateAdmin();

        $response = $this->postJson('/api/users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'secret123',
            // 'library_id' => 'LIB001',
            'role' => 'user',
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
    }

    #[Test]
    public function normal_user_cannot_create_users()
    {
        $this->authenticateUser();

        $response = $this->postJson('/api/users', [
            'name' => 'Blocked User',
            'email' => 'blocked@example.com',
            'password' => 'secret123',
            // 'library_id' => 'LIB002',
            'role' => 'user',
        ]);

        $response->assertForbidden();
    }

    #[Test]
    public function admin_can_list_users()
    {
        User::factory(5)->create();
        $this->authenticateAdmin();

        $response = $this->getJson('/api/users');

        $response->assertOk()->assertJsonCount(6); // incluye el admin autenticado
    }

    #[Test]
    public function normal_user_cannot_list_users()
    {
        $this->authenticateUser();

        $response = $this->getJson('/api/users');

        $response->assertForbidden();
    }

    #[Test]
    public function admin_can_update_a_user()
    {
        $this->authenticateAdmin();
        $user = User::factory()->create();

        $response = $this->putJson("/api/users/{$user->id}", [
            'name' => 'Updated Name',
        ]);

        $response->assertOk();
        $this->assertDatabaseHas('users', ['id' => $user->id, 'name' => 'Updated Name']);
    }

    #[Test]
    public function admin_can_delete_a_user()
    {
        $this->authenticateAdmin();
        $user = User::factory()->create();

        $response = $this->deleteJson("/api/users/{$user->id}");

        $response->assertNoContent();
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    #[Test]
    public function validation_errors_are_returned()
    {
        $this->authenticateAdmin();

        $response = $this->postJson('/api/users', [
            'name' => '',
            'email' => 'not-an-email',
            'password' => '',
            // 'library_id' => '',
            'role' => 'Unknown',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name', 'email', 'password', 'role']);
    }
}
