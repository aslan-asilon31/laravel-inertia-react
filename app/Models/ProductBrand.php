<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductBrand extends Model
{
  use \Illuminate\Database\Eloquent\Factories\HasFactory;
  use \Illuminate\Database\Eloquent\Concerns\HasUuids;
  // use \App\Helpers\BootModel\Traits\WithMasterBootModel;

  protected $table = 'product_brands';
  protected $keyType = 'string';
  public $incrementing = false;

  protected $guarded = [];

}
