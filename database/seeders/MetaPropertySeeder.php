<?php

namespace Database\Seeders;

use App\Models\MetaProperty;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MetaPropertySeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {

    $metaProperties = [
      ['name' => 'title'],
      ['name' => 'description'],
      ['name' => 'keywords'],
    ];

    $records = [];
    foreach ($metaProperties as $metaPropertyIndex => $metaProperty) {
      $records[] = [
        'id' => str($metaProperty['name'])->slug('_'),
        'meta_property_group_id' => 'general',
        'name' => $metaProperty['name'],
        'created_by' => 'system',
        'updated_by' => 'system',
        'created_at' => now(),
        'updated_at' => now(),
        'ordinal' => $metaPropertyIndex + 1,
        'is_activated' => true,
      ];
    }

    MetaProperty::insert($records);
  }
}
