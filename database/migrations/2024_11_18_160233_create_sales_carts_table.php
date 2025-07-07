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
    Schema::create('sales_carts', function (Blueprint $table) {
      $table->uuid('id')->primary();
      $table->uuid('session_id')->nullable();
      $table->foreign('session_id')->references('id')->on('sessions')->onDelete('cascade')->onUpdate('cascade');

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
    Schema::dropIfExists('sales_carts');
  }
};
