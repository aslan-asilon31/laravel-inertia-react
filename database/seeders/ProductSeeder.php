<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{

    public function run(): void
    {

        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        $products = [
            [
                "id"=> Str::uuid(),
                 "product_category_first_id"=> "",
                 "name"=> "Air Conditioner 1",
                 "selling_price"=>350.00,
                 "availability"=>"in-stock",
                 "image_url"=>"https://example.com/images/air_conditioner.jpg",
                 "created_by"=>null,
                 "updated_by"=>null,
                  "is_activated"=>true
            ],
            [
                  "id"=> Str::uuid(),
                  "product_category_first_id" =>"",
                   "name"=>"Microwave Oven 1",
                   "selling_price"=>(float)120.50,
                   "availability"=>"in-stock",
                   "image_url"=>"https://example.com/images/microwave_oven.jpg",
                    "created_by"=> NULL ,
                    "updated_by"=> NULL ,
                    "is_activated"=> TRUE 
             ],
            [
                  "id"=> Str::uuid(),
                  "product_category_first_id" =>"",
                   "name"=>"Refrigerator FrostFree",
                   "selling_price"=>(float)120.50,
                   "availability"=>"in-stock",
                   "image_url"=>"https://example.com/images/microwave_oven.jpg",
                    "created_by"=> NULL ,
                    "updated_by"=> NULL ,
                    "is_activated"=> TRUE 
             ],
            [
                  "id"=> Str::uuid(),
                  "product_category_first_id" =>"",
                   "name"=>"Washing Machine UltraClean",
                   "selling_price"=>(float)120.50,
                   "availability"=>"in-stock",
                   "image_url"=>"https://example.com/images/microwave_oven.jpg",
                    "created_by"=> NULL ,
                    "updated_by"=> NULL ,
                    "is_activated"=> TRUE 
             ],
            [
                  "id"=> Str::uuid(),
                  "product_category_first_id" =>"",
                   "name"=>"Electric Kettle QuickBoil",
                   "selling_price"=>(float)105.50,
                   "availability"=>"in-stock",
                   "image_url"=>"https://example.com/images/microwave_oven.jpg",
                    "created_by"=> NULL ,
                    "updated_by"=> NULL ,
                    "is_activated"=> TRUE 
             ],
            [
                  "id"=> Str::uuid(),
                  "product_category_first_id" =>"",
                   "name"=>"Vacuum Cleaner PowerMax",
                   "selling_price"=>(float)110.50,
                   "availability"=>"in-stock",
                   "image_url"=>"https://example.com/images/microwave_oven.jpg",
                    "created_by"=> NULL ,
                    "updated_by"=> NULL ,
                    "is_activated"=> TRUE 
             ],
            [
                  "id"=> Str::uuid(),
                  "product_category_first_id" =>"",
                   "name"=>"Blender SmoothMix Pro",
                   "selling_price"=>(float)110.50,
                   "availability"=>"in-stock",
                   "image_url"=>"https://example.com/images/microwave_oven.jpg",
                    "created_by"=> NULL ,
                    "updated_by"=> NULL ,
                    "is_activated"=> TRUE 
             ],
            [
                  "id"=> Str::uuid(),
                  "product_category_first_id" =>"",
                   "name"=>"Toaster CrispyGold 4-Slice",
                   "selling_price"=>(float)110.50,
                   "availability"=>"in-stock",
                   "image_url"=>"https://example.com/images/microwave_oven.jpg",
                    "created_by"=> NULL ,
                    "updated_by"=> NULL ,
                    "is_activated"=> TRUE 
             ],
            [
                  "id"=> Str::uuid(),
                  "product_category_first_id" =>"",
                   "name"=>"Coffee Maker AromaBrew Deluxe",
                   "selling_price"=>(float)110.50,
                   "availability"=>"in-stock",
                   "image_url"=>"https://example.com/images/microwave_oven.jpg",
                    "created_by"=> NULL ,
                    "updated_by"=> NULL ,
                    "is_activated"=> TRUE 
             ],
            [
                  "id"=> Str::uuid(),
                  "product_category_first_id" =>"",
                   "name"=>"Dishwasher SparkleWash 12 Sets",
                   "selling_price"=>(float)110.50,
                   "availability"=>"in-stock",
                   "image_url"=>"https://example.com/images/microwave_oven.jpg",
                    "created_by"=> NULL ,
                    "updated_by"=> NULL ,
                    "is_activated"=> TRUE 
             ],
            [
                  "id"=> Str::uuid(),
                  "product_category_first_id" =>"",
                   "name"=>"Rice Cooker SmartCook 5 Cups",
                   "selling_price"=>(float)110.50,
                   "availability"=>"in-stock",
                   "image_url"=>"https://example.com/images/microwave_oven.jpg",
                    "created_by"=> NULL ,
                    "updated_by"=> NULL ,
                    "is_activated"=> TRUE 
             ],
            [
                  "id"=> Str::uuid(),
                  "product_category_first_id" =>"",
                   "name"=>"Ceiling Fan BreezeFlow 52 inch",
                   "selling_price"=>(float)110.50,
                   "availability"=>"in-stock",
                   "image_url"=>"https://example.com/images/microwave_oven.jpg",
                    "created_by"=> NULL ,
                    "updated_by"=> NULL ,
                    "is_activated"=> TRUE 
             ],
            [
                  "id"=> Str::uuid(),
                  "product_category_first_id" =>"",
                   "name"=>"Water Heater InstantHeat Plus",
                   "selling_price"=>(float)110.50,
                   "availability"=>"in-stock",
                   "image_url"=>"https://example.com/images/microwave_oven.jpg",
                    "created_by"=> NULL ,
                    "updated_by"=> NULL ,
                    "is_activated"=> TRUE 
             ],
            [
                  "id"=> Str::uuid(),
                  "product_category_first_id" =>"",
                   "name"=>"Juicer FreshPress XL",
                   "selling_price"=>(float)110.50,
                   "availability"=>"in-stock",
                   "image_url"=>"https://example.com/images/microwave_oven.jpg",
                    "created_by"=> NULL ,
                    "updated_by"=> NULL ,
                    "is_activated"=> TRUE 
             ],
            [
                  "id"=> Str::uuid(),
                  "product_category_first_id" =>"",
                   "name"=>"Air Purifier PureAir360",
                   "selling_price"=>(float)110.50,
                   "availability"=>"in-stock",
                   "image_url"=>"https://example.com/images/microwave_oven.jpg",
                    "created_by"=> NULL ,
                    "updated_by"=> NULL ,
                    "is_activated"=> TRUE 
             ],
            [
                  "id"=> Str::uuid(),
                  "product_category_first_id" =>"",
                   "name"=>"Food Processor MultiChop Pro",
                   "selling_price"=>(float)110.50,
                   "availability"=>"in-stock",
                   "image_url"=>"https://example.com/images/microwave_oven.jpg",
                    "created_by"=> NULL ,
                    "updated_by"=> NULL ,
                    "is_activated"=> TRUE 
             ],
            [
                  "id"=> Str::uuid(),
                  "product_category_first_id" =>"",
                   "name"=>"Electric Grill SmokeFree BBQ",
                   "selling_price"=>(float)110.50,
                   "availability"=>"in-stock",
                   "image_url"=>"https://example.com/images/microwave_oven.jpg",
                    "created_by"=> NULL ,
                    "updated_by"=> NULL ,
                    "is_activated"=> TRUE 
             ],
            [
                  "id"=> Str::uuid(),
                  "product_category_first_id" =>"",
                   "name"=>"Dehumidifier DryAir Compact",
                   "selling_price"=>(float)110.50,
                   "availability"=>"in-stock",
                   "image_url"=>"https://example.com/images/microwave_oven.jpg",
                    "created_by"=> NULL ,
                    "updated_by"=> NULL ,
                    "is_activated"=> TRUE 
             ],
             
        ];

        foreach ($products as $prod){
           Product::create($prod);
        }

        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
