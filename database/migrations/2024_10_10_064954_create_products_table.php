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
    Schema::create('products', function (Blueprint $table) {
      $table->uuid('id')->primary();
      $table->uuid('product_category_first_id');
      $table->foreign('product_category_first_id')->references('id')->on('product_category_firsts')->onDelete('cascade')->onUpdate('cascade');
      $table->string('name', 255);
      // $table->string('slug', 255);
      // $table->string('url', 255)->unique();
      $table->decimal('selling_price', 15, 2);
      $table->string('availability', 255)->index(); // in-stock, out-off-stock
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
    Schema::dropIfExists('products');
  }
};
