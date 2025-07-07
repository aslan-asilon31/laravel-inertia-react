<?php

namespace Database\Seeders;

use App\Models\Marketplace;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MarketplaceSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $marketPlaces = [
      ['name' => 'Tokopedia', 'url' => 'https://www.tokopedia.com'],
      ['name' => 'Blibli', 'url' => 'https://www.blibli.com'],
      ['name' => 'Shopee', 'url' => 'https://shopee.co.id'],
    ];

    $records = [];
    foreach ($marketPlaces as $marketPlaceIndex => $marketPlace) {
      $records[] = [
        'id' => str($marketPlace['name'])->slug('_'),
        'name' => $marketPlace['name'],
        'url' => $marketPlace['url'],
        'image_url' => '/assets/images/no-image.webp',
        'created_by' => 'system',
        'updated_by' => 'system',
        'created_at' => now(),
        'updated_at' => now(),
        'ordinal' => $marketPlaceIndex + 1,
        'is_activated' => true,
      ];
    }

    Marketplace::insert($records);
  }
}
