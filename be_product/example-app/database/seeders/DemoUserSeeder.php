<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DemoUserSeeder extends Seeder
{
    /**
     * Seed demo user for testing authentication
     */
    public function run(): void
    {
        // Tạo user demo
        User::create([
            'name' => 'Demo User',
            'email' => 'demo@example.com',
            'password' => Hash::make('demo123456'),
            'phone' => '0123456789',
            'address' => '123 Demo Street, Demo City',
        ]);

        // Tạo admin demo
        User::create([
            'name' => 'Admin Demo',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123456'),
            'phone' => '0987654321',
            'address' => '456 Admin Avenue, Admin City',
        ]);

        echo "✅ Demo users created successfully!\n";
        echo "📧 Email: demo@example.com | Password: demo123456\n";
        echo "📧 Email: admin@example.com | Password: admin123456\n";
    }
}
