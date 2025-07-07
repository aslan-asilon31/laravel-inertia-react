<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('marketplaces', function (Blueprint $table) {
      $table->uuid('id')->primary();
      $table->string('name', 255);
      $table->string('url', 255)->nullable();
      $table->string('image_url', 255)->nullable();
      $table->string('created_by', 255)->nullable()->index();
      $table->string('updated_by', 255)->nullable()->index();
      $table->timestamp('created_at')->nullable()->index();
      $table->timestamp('updated_at')->nullable()->index();
      $table->tinyInteger('ordinal')->unsigned()->default(0);
      $table->boolean('is_activated')->default(true);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('marketplaces');
  }
};
