<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marketplace extends Model
{
  use HasFactory;

  protected $keyType = 'string';
  public $incrementing = false;

  protected static function boot(): void
  {
    parent::boot();

    static::creating(function ($record) {
      if (empty($record->id)) {
        $record->id = str()->slug($record->name, '_');
      }

      if (empty($record->created_by)) {
        $record->created_by = auth()->user()->username;
      }

      if (empty($record->updated_by)) {
        $record->updated_by = auth()->user()->username;
      }
    });
  }

  protected $fillable = [
    'name',
    'url',
    'image_url',
    'ordinal',
    'is_activated',
  ];
}
