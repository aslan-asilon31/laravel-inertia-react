<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MetaPropertyGroup extends Model
{
  use \Illuminate\Database\Eloquent\Factories\HasFactory;

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

    static::updating(function ($record) {
      if ($record?->name) {
        $record->id = str()->slug($record->name, '_');
      }

      if (empty($record->updated_by)) {
        $record->updated_by = auth()->user()->username;
      }
    });
  }

  protected $keyType = 'string';
  public $incrementing = false;

  protected $fillable = [
    'name',
    'created_by',
    'updated_by',
    'created_at',
    'updated_at',
    'ordinal',
    'is_activated',
  ];

  public function metaProperties()
  {
    return $this->hasMany(MetaProperty::class);
  }
}
