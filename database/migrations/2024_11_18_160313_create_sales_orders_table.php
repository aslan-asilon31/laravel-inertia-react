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
    Schema::create('sales_orders', function (Blueprint $table) {
      $table->uuid('id')->primary();
      $table->uuid('employee_id')->nullable();
      $table->foreign('employee_id')->references('id')->on('employees')->onDelete('cascade')->onUpdate('cascade');

      $table->uuid('customer_id')->nullable();
      $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade')->onUpdate('cascade');

      $table->string('snap_url', 255)->nullable()->index();
      $table->string('snap_token', 255)->nullable()->index();
      $table->timestamp('date')->index();

      $table->string('number', 255)->index();

      $table->string('created_by', 255)->nullable()->index();
      $table->string('updated_by', 255)->nullable()->index();
      $table->timestamps();
      $table->string('status', 255)->index(); // authorize, capture, settlement, deny, pending, cancel, refund, partial_refund, chargeback, partial_chargeback, expire, failure
      $table->boolean('is_activated')->default(true);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('sales_orders');
  }
};
