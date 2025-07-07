<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
  use \Illuminate\Database\Eloquent\Factories\HasFactory;
  use \Illuminate\Database\Eloquent\Concerns\HasUuids;

  protected $keyType = 'string';
  public $incrementing = false;
  // protected $guarded = [''];

  protected $fillable = [
    'product_category_first_id',
    'name',
    'selling_price',
    'availability',
    'image_url',
    'is_activated',
  ];

  public function productContent()
  {
    return $this->hasMany(ProductContent::class);
  }
}
