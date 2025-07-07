<?php

namespace Database\Seeders;

use App\Models\MetaProperty;
use App\Models\ProductContent;
use App\Models\ProductContentMeta;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductContentMetaSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $productContents = ProductContent::get();
    $metaProperties = MetaProperty::orderBy('ordinal')->get();

    $records = [];
    foreach ($productContents as $productContentIndex => $productContent) {
      foreach ($metaProperties as $metaPropertyIndex => $metaProperty) {
        $records[] = [
          'id' => str()->orderedUuid()->toString(),
          'product_content_id' => $productContent->id,
          'meta_property_id' => $metaProperty->id,
          'content' => fake()->unique()->sentence(),
          'created_by' => 'system',
          'updated_by' => 'system',
          'created_at' => now(),
          'updated_at' => now(),
          'ordinal' => $metaPropertyIndex + 1,
          'is_activated' => true,
        ];
      }
    }


    ProductContentMeta::insert($records);
  }
}
