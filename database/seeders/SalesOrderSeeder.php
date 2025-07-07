<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SalesOrder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class SalesOrderSeeder extends Seeder
{

    public function run(): void
    {
        for ($i = 0; $i < 2; $i++) {
            SalesOrder::create([
                'id'  => Str::uuid(),
                'employee_id'  => '9ebc3087-173e-4f4a-804d-1e2855442711',
                'customer_id'   => '019680ce-f9dd-737e-84f7-9609cfa452c5',
                'snap_url'   => '-',
                'snap_token'   => '-',
                'date'        => Carbon::now()->subDays(rand(0, 30))->toDateString(),
                'number'      => strtoupper(Str::random(10)),
                'status'      => fake()->randomElement(['pending', 'approved', 'shipped', 'cancelled']),
                'fraud_status'  => 'success',
                'created_by'  => fake()->name,
                'updated_by'  => fake()->name,
                'created_at'  => Carbon::now()->subDays(rand(5, 15)),
                'updated_at'  => Carbon::now(),
                'status'  => 1,
                'is_activated'  => 1,
            ]);
        }
    }
}
