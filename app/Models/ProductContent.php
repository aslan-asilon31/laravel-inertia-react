<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductContent extends Model
{
  use \Illuminate\Database\Eloquent\Factories\HasFactory;
  use \Illuminate\Database\Eloquent\Concerns\HasUuids;
  use \App\Helpers\BootModel\Traits\WithMasterBootModel;

  protected $keyType = 'string';
  public $incrementing = false;

  protected $guarded = [];

  public function product()
  {
    return $this->belongsTo(Product::class);
  }

  public function productContentMetas()
  {
    return $this->hasMany(ProductContentMeta::class);
  }

  public function productContentDisplays()
  {
    return $this->hasMany(ProductContentDisplay::class);
  }

  public function productContentVideos()
  {
    return $this->hasMany(ProductContentVideo::class);
  }

  public function productContentFeatures()
  {
    return $this->hasMany(ProductContentFeature::class);
  }

  public function productContentMarketplaces()
  {
    return $this->hasMany(ProductContentMarketplace::class);
  }

  public function productContentSpecifications()
  {
    return $this->hasMany(ProductContentSpecification::class);
  }

  public function productContentReviews()
  {
    return $this->hasMany(ProductContentReview::class);
  }

  public function productContentQnas()
  {
    return $this->hasMany(ProductContentQna::class);
  }
}
