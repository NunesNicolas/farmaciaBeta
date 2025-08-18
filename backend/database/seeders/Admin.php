<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class Admin extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Criar usuário Admin
        DB::table('users')->insert([
            'name' => 'Administrador',
            'email' => 'admin@exemplo.com',
            'password' => Hash::make('admin123'), // senha criptografada
            'category' => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Criar usuário Client
        DB::table('users')->insert([
            'name' => 'Cliente',
            'email' => 'client@exemplo.com',
            'password' => Hash::make('client123'), // senha criptografada
            'category' => 'client',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

