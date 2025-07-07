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
    Schema::create('product_category_firsts', function (Blueprint $table) {
      $table->uuid('id')->primary();
      $table->uuid('product_category_second_id');
      $table->foreign('product_category_second_id')->references('id')->on('product_category_seconds')->onDelete('cascade')->onUpdate('cascade');
      $table->string('name', 255);
      $table->string('slug', 255)->index();
      $table->string('image_url', 255)->nullable();
      $table->string('created_by', 255)->nullable()->index();
      $table->string('updated_by', 255)->nullable()->index();
      $table->timestamps();
      $table->boolean('is_activated')->default(true);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('product_category_firsts');
  }
};
