<?php

namespace Database\Seeders;

use App\Models\Action;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ActionSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $records = [
      [
        'id' => str('Index')->slug('_'),
        'name' => 'Index',
        'ordinal' => 1,
        'created_at' => now(),
        'updated_at' => now(),
        'is_activated' => true,
      ],
      [
        'id' => str('View')->slug('_'),
        'name' => 'View',
        'ordinal' => 2,
        'created_at' => now(),
        'updated_at' => now(),
        'is_activated' => true,
      ],
      [
        'id' => str('Create')->slug('_'),
        'name' => 'Create',
        'ordinal' => 3,
        'created_at' => now(),
        'updated_at' => now(),
        'is_activated' => true,
      ],
      [
        'id' => str('Update')->slug('_'),
        'name' => 'Update',
        'ordinal' => 4,
        'created_at' => now(),
        'updated_at' => now(),
        'is_activated' => true,
      ],
      [
        'id' => str('Delete')->slug('_'),
        'name' => 'Delete',
        'ordinal' => 5,
        'created_at' => now(),
        'updated_at' => now(),
        'is_activated' => true,
      ],
    ];

    Action::insert($records);
  }
}
