<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
  use HasFactory, HasUuids;

  public function newUniqueId(): string
  {
    return (string) str()->orderedUuid();
  }

  protected $guarded = [];

  protected function casts(): array
  {
    return [
      'created_at' => 'datetime: Y-m-d H:i:s',
      'updated_at' => 'datetime: Y-m-d H:i:s',
    ];
  }

  protected function serializeDate(\DateTimeInterface $date): string
  {
    return $date->format('Y-m-d H:i:s');
  }

  public function position()
  {
    return $this->belongsTo(Position::class);
  }
}
