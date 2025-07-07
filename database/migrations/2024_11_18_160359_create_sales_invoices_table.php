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
    Schema::create('sales_invoices', function (Blueprint $table) {
      $table->uuid('id')->primary();
      $table->uuid('sales_order_id');
      $table->foreign('sales_order_id')->references('id')->on('sales_orders')->onDelete('cascade')->onUpdate('cascade');

      $table->timestamp('date')->index();
      $table->string('number', 255)->index();

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
    Schema::dropIfExists('sales_invoices');
  }
};
