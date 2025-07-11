<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductContentVideo extends Model
{
  use \Illuminate\Database\Eloquent\Factories\HasFactory;
  use \Illuminate\Database\Eloquent\Concerns\HasUuids;
  // use \App\Helpers\BootModel\Traits\WithMasterBootModel;

  protected $keyType = 'string';
  public $incrementing = false;

  protected $fillable = [
    'name',
    'thumbnail_url',
    'video_url',
    'ordinal',
    'is_activated',
  ];
}
