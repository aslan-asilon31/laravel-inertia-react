<?php

use Illuminate\Database\Seeder;
use App\Models\ProductCategoryFirst;
use App\Models\ProductCategorySecond;
use Illuminate\Support\Str;

class ProductCategoryFirstSeeder extends Seeder
{
    public function run()
    {
        $categorySecondIds = ProductCategorySecond::pluck('id')->toArray();

        for ($i = 0; $i < 10; $i++) {
            ProductCategoryFirst::create([
                'id' => Str::uuid(), // Using UUID for id
                'product_category_second_id' => $categorySecondIds[array_rand($categorySecondIds)], // Randomly assign category_second_id
                'name' => 'Category ' . Str::random(5), // Random category name
                'slug' => Str::slug('Category ' . Str::random(5)), // Generate a slug from the name
                'image_url' => 'https://example.com/image.jpg', // Placeholder image URL, change as necessary
                'created_by' => 'admin', // Set as 'admin' or dynamically use the user session if required
                'updated_by' => 'admin', // Set as 'admin' or dynamically use the user session if required
                'is_activated' => true, // Set as activated
            ]);
        }
    }
}
