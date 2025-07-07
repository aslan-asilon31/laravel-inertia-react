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
    Schema::create('customers', function (Blueprint $table) {
      $table->uuid('id')->primary();

      $table->string('first_name', 255);
      $table->string('last_name', 255);
      $table->string('phone', 255);
      $table->string('email', 255);

      $table->string('province_id', 255);
      $table->string('province_name', 255);
      $table->string('city_id', 255);
      $table->string('city_name', 255);
      $table->string('address', 255);
      $table->string('postal_code', 255);

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
    Schema::dropIfExists('customers');
  }
};
