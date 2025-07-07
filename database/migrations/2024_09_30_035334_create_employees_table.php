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
    Schema::create('employees', function (Blueprint $table) {
      $table->uuid('id')->primary();
      $table->string('position_id', 64);
      $table->foreign('position_id')->references('id')->on('positions')->onDelete('cascade')->onUpdate('cascade');
      $table->string('name', 255);
      $table->string('phone', 255);
      $table->string('email')->unique();
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
    Schema::dropIfExists('employees');
  }
};
