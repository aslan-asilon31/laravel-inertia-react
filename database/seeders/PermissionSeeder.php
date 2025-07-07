<?php

namespace Database\Seeders;

use App\Models\Action;
use App\Models\Page;
use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $pages = Page::get();

    $actions = Action::get();

    $records = [];
    foreach ($pages as $pageIndex => $page) {
      foreach ($actions as $actionIndex => $action) {
        if ($page->id == 'dashboard' && $action->id != 'index') {
          continue;
        }
        $id = "{$page->id}_{$action->id}";
        $name = "{$page->name} ({$action->name})";

        $records[] = [
          'id' => $id,
          'page_id' => $page->id,
          'action_id' => $action->id,
          'name' => $name,
          'created_by' => 'system',
          'updated_by' => 'system',
          'created_at' => now(),
          'updated_at' => now(),
          'is_activated' => true,
        ];
      }
    }

    Permission::insert($records);
  }
}
