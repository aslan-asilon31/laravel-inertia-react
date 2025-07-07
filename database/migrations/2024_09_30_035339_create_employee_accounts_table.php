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
    Schema::create('employee_accounts', function (Blueprint $table) {
      $table->uuid('id')->primary();
      $table->uuid('employee_id');
      $table->foreign('employee_id')->references('id')->on('employees')->onDelete('cascade')->onUpdate('cascade');
      $table->string('username')->unique();
      $table->timestamp('account_verified_at')->nullable();
      $table->string('password');
      $table->rememberToken();
      $table->string('created_by', 255)->nullable()->index();
      $table->string('updated_by', 255)->nullable()->index();
      $table->timestamps();
      $table->boolean('is_activated')->default(true);
    });

    Schema::create('employee_password_reset_tokens', function (Blueprint $table) {
      $table->string('email')->primary();
      $table->string('token');
      $table->timestamp('created_at')->nullable();
    });

    Schema::create('employee_sessions', function (Blueprint $table) {
      $table->string('id')->primary();
      $table->uuid('user_id')->nullable()->index();
      $table->foreign('user_id')->references('id')->on('employee_accounts')->onDelete('cascade')->onUpdate('cascade');
      $table->string('ip_address', 45)->nullable();
      $table->text('user_agent')->nullable();
      $table->longText('payload');
      $table->integer('last_activity')->index();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('employee_accounts');
    Schema::dropIfExists('employee_password_reset_tokens');
    Schema::dropIfExists('employee_sessions');
  }
};
