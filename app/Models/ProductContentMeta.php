<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductContentMeta extends Model
{
  use \Illuminate\Database\Eloquent\Factories\HasFactory;
  use \Illuminate\Database\Eloquent\Concerns\HasUuids;
  use \App\Helpers\BootModel\Traits\WithMasterBootModel;

  protected $keyType = 'string';
  public $incrementing = false;

  protected $fillable = [
    'meta_property_id',
    'content',
    'ordinal',
    'is_activated',
  ];

  public function metaProperty()
  {
    return $this->belongsTo(MetaProperty::class);
  }
}
