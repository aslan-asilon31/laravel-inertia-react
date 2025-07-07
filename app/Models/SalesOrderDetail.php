<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class SalesOrderDetail extends Pivot
{
  use HasFactory, HasUuids;

  protected $keyType = 'string';
  protected $table = 'sales_order_detail';
  public $incrementing = false;


  protected $fillable = [
    'id',
    'sales_order_id',
    'product_id',
    'selling_price',
    'qty',
    'image_url',
    'created_by',
    'updated_by',
    'created_at',
    'updated_at',
    'is_activated',
  ];

  public function sales_orders()
  {
    return $this->belongsTo(SalesOrder::class);
  }

  public function product()
  {
    return $this->belongsTo(Product::class);
  }
}
