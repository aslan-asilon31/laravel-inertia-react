<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductCategorySecond extends Model
{
  use \Illuminate\Database\Eloquent\Factories\HasFactory;
  use \Illuminate\Database\Eloquent\Concerns\HasUuids;
  use \App\Helpers\BootModel\Traits\WithMasterBootModel;

  protected $keyType = 'string';
  public $incrementing = false;

  protected $fillable = [
    'product_category_second_id',
    'name',
    'slug',
    'image_url',
    'is_activated',
  ];
}
