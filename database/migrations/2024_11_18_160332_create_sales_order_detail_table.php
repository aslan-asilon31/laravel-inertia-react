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
    Schema::create('sales_order_detail', function (Blueprint $table) {
      $table->uuid('id')->primary();

      $table->uuid('sales_order_id');
      $table->foreign('sales_order_id')->references('id')->on('sales_orders')->onDelete('cascade')->onUpdate('cascade');

      $table->uuid('product_id')->nullable();
      $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade')->onUpdate('cascade');

      $table->decimal('selling_price', 15, 2)->default(0);
      $table->decimal('qty', 8, 2)->default(0);

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
    Schema::dropIfExists('sales_order_detail');
  }
};
