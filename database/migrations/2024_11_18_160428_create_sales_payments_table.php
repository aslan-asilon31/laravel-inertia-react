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
    Schema::create('sales_payments', function (Blueprint $table) {
      $table->uuid('id')->primary();
      $table->uuid('sales_invoice_id');
      $table->foreign('sales_invoice_id')->references('id')->on('sales_invoices')->onDelete('cascade')->onUpdate('cascade');

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
    Schema::dropIfExists('sales_payments');
  }
};
