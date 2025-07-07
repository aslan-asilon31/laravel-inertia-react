<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{

  public function run(): void
  {
    $records = [
      [
        'id' => str('Dashboard')->slug('_'),
        'name' => 'Dashboard',
        'created_by' => 'system',
        'updated_by' => 'system',
        'created_at' => now(),
        'updated_at' => now(),
        'is_activated' => true,
      ],
      [
        'id' => str('Position')->slug('_'),
        'name' => 'Position',
        'created_by' => 'system',
        'updated_by' => 'system',
        'created_at' => now(),
        'updated_at' => now(),
        'is_activated' => true,
      ],
      [
        'id' => str('Employee')->slug('_'),
        'name' => 'Employee',
        'created_by' => 'system',
        'updated_by' => 'system',
        'created_at' => now(),
        'updated_at' => now(),
        'is_activated' => true,
      ],
      [
        'id' => str('Employee Account')->slug('_'),
        'name' => 'Employee Account',
        'created_by' => 'system',
        'updated_by' => 'system',
        'created_at' => now(),
        'updated_at' => now(),
        'is_activated' => true,
      ],
      [
        'id' => str('Page')->slug('_'),
        'name' => 'Page',
        'created_by' => 'system',
        'updated_by' => 'system',
        'created_at' => now(),
        'updated_at' => now(),
        'is_activated' => true,
      ],
      [
        'id' => str('Permission')->slug('_'),
        'name' => 'Permission',
        'created_by' => 'system',
        'updated_by' => 'system',
        'created_at' => now(),
        'updated_at' => now(),
        'is_activated' => true,
      ],
      [
        'id' => str('Product Category First')->slug('_'),
        'name' => 'Product Category First',
        'created_by' => 'system',
        'updated_by' => 'system',
        'created_at' => now(),
        'updated_at' => now(),
        'is_activated' => true,
      ],
      [
        'id' => str('Product')->slug('_'),
        'name' => 'Product',
        'created_by' => 'system',
        'updated_by' => 'system',
        'created_at' => now(),
        'updated_at' => now(),
        'is_activated' => true,
      ],
    ];

    Page::insert($records);
  }
}
