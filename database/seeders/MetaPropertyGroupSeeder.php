<?php

namespace Database\Seeders;

use App\Models\MetaPropertyGroup;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MetaPropertyGroupSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {

    $metaPropertyGroups = [
      ['name' => '(General)'],
      ['name' => 'Facebook'],
      ['name' => 'Instagram'],
      ['name' => 'Tiktok'],
      ['name' => 'Twitter'],
    ];

    $records = [];
    foreach ($metaPropertyGroups as $metaPropertyGroupIndex => $metaPropertyGroup) {
      $records[] = [
        'id' => str($metaPropertyGroup['name'])->slug('_'),
        'name' => $metaPropertyGroup['name'],
        'created_by' => 'system',
        'updated_by' => 'system',
        'created_at' => now(),
        'updated_at' => now(),
        'ordinal' => $metaPropertyGroupIndex + 1,
        'is_activated' => true,
      ];
    }

    MetaPropertyGroup::insert($records);
  }
}
