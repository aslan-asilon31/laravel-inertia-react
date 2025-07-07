<?php

use Illuminate\Database\Seeder;
use App\Models\ProductCategorySecond;
use Illuminate\Support\Str;

class ProductCategorySecondSeeder extends Seeder
{
    public function run()
    {
        // Create 10 entries for product_category_seconds
        for ($i = 0; $i < 10; $i++) {
            ProductCategorySecond::create([
                'id' => Str::uuid(), // Using UUID for the 'id' field
                'name' => 'Sub Category ' . Str::random(5), // Random category name
                'slug' => Str::slug('Sub Category ' . Str::random(5)), // Generate a slug from the name
                'image_url' => 'https://example.com/image.jpg', // Placeholder image URL, change as necessary
                'created_by' => 'admin', // Set as 'admin' or dynamically use the user session if required
                'updated_by' => 'admin', // Set as 'admin' or dynamically use the user session if required
                'is_activated' => true, // Set as activated
            ]);
        }
    }
}
