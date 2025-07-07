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
        Schema::create('gelombang_pmbs', function (Blueprint $table) {
            $table->id();
            $table->string('kode');
            $table->string('name');
            $table->string('tahun');
            $table->integer('urutan')->default(0);
            $table->string('format_sk')->nulable();
            $table->string('format_pendaftaran')->nulable();
            $table->string('format_pendaftaran_angka')->nulable();
            $table->string('format_aplikan')->nulable();
            $table->string('format_aplikan_angka')->nulable();
            $table->date('pmb_start')->nulable();
            $table->date('pmb_end')->nulable();
            $table->date('usm_start')->nulable();
            $table->date('usm_end')->nulable();
            $table->date('registrasi_start')->nulable();
            $table->date('registrasi_end')->nulable();
            $table->date('pembayaran_start')->nulable();
            $table->date('pembayaran_end')->nulable();
            $table->date('pra_pkk')->nulable();
            $table->date('bimbingan_akademik')->nulable();
            $table->date('krs')->nulable();
            $table->date('perkuliahan')->nulable();
            $table->text('materi_sk')->nulable();
            $table->integer('status')->nulable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gelombang_pmbs');
    }
};
