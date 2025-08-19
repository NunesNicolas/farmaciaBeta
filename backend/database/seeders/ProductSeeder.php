<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $categories = ['medicamento', 'cosmetico', 'alimento', 'higiene', 'suplementos', 'outros'];

        for ($i = 0; $i < 50; $i++) {
            DB::table('products')->insert([
                'name' => ucfirst($faker->words(rand(2, 4), true)), 
                'img' => 'https://via.placeholder.com/150',
                'category' => $categories[array_rand($categories)],
                'price' => $faker->randomFloat(2, 5, 500),
                'description' => $faker->sentence(10), 
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
