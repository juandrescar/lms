<?php

namespace Tests\Unit;

use App\Models\User;
use App\Services\AuthService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class AuthServiceTest extends TestCase
{
    use RefreshDatabase;

    protected AuthService $authService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->authService = new AuthService();
    }

    public function test_login_successful()
    {
        $user = User::factory()->create([
            'name'=> 'Test User',
            'email' => 'user@example.com',
            'password' => bcrypt('secret123'),
            'role' => 'user',
        ]);

        $response = $this->authService->login([
            'email' => 'user@example.com',
            'password' => 'secret123',
        ]);

        $this->assertEquals($user->name, $response['user']['name']);
        $this->assertEquals('user', $response['user']['role']);
        $this->assertArrayHasKey('token', $response);
    }

    public function test_login_fails_with_wrong_password()
    {
        User::factory()->create([
            'email' => 'user@example.com',
            'password' => bcrypt('correct-password'),
        ]);

        $this->expectException(ValidationException::class);

        $this->authService->login([
            'email' => 'user@example.com',
            'password' => 'wrong-password',
        ]);
    }

    public function test_login_fails_with_unknown_email()
    {
        $this->expectException(ValidationException::class);

        $this->authService->login([
            'email' => 'unknown@example.com',
            'password' => 'whatever',
        ]);
    }
}
