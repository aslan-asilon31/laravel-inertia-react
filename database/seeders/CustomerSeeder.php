<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Customer; // Pastikan model Customer sudah ada
use Illuminate\Support\Str;

class CustomerSeeder extends Seeder
{
    public function run()
    {
        // Contoh data dummy
        $customers = [
            [
                'first_name' => 'Andi',
                'last_name' => 'Saputra',
                'email' => 'andi.saputra@example.com',
                'phone' => '081234567890',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Budi',
                'last_name' => 'Santoso',
                'email' => 'budi.santoso@example.com',
                'phone' => '082345678901',
                'is_activated' => 0,
            ],
            [
                'first_name' => 'Citra',
                'last_name' => 'Wulandari',
                'email' => 'citra.wulandari@example.com',
                'phone' => '083456789012',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Dewi',
                'last_name' => 'Prasetya',
                'email' => 'dewi.prasetya@example.com',
                'phone' => '084567890123',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Eko',
                'last_name' => 'Wijaya',
                'email' => 'eko.wijaya@example.com',
                'phone' => '085678901234',
                'is_activated' => 0,
            ],
            [
                'first_name' => 'Fajar',
                'last_name' => 'Hidayat',
                'email' => 'fajar.hidayat@example.com',
                'phone' => '086789012345',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Gita',
                'last_name' => 'Lestari',
                'email' => 'gita.lestari@example.com',
                'phone' => '087890123456',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Hadi',
                'last_name' => 'Santoso',
                'email' => 'hadi.santoso@example.com',
                'phone' => '088901234567',
                'is_activated' => 0,
            ],
            [
                'first_name' => 'Intan',
                'last_name' => 'Permata',
                'email' => 'intan.permata@example.com',
                'phone' => '089012345678',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Joko',
                'last_name' => 'Prabowo',
                'email' => 'joko.prabowo@example.com',
                'phone' => '081123456789',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Andi',
                'last_name' => 'Saputra',
                'email' => 'andi.saputra@example.com',
                'phone' => '081234567890',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Budi',
                'last_name' => 'Santoso',
                'email' => 'budi.santoso@example.com',
                'phone' => '082345678901',
                'is_activated' => 0,
            ],
            [
                'first_name' => 'Citra',
                'last_name' => 'Wulandari',
                'email' => 'citra.wulandari@example.com',
                'phone' => '083456789012',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Dewi',
                'last_name' => 'Prasetya',
                'email' => 'dewi.prasetya@example.com',
                'phone' => '084567890123',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Eko',
                'last_name' => 'Wijaya',
                'email' => 'eko.wijaya@example.com',
                'phone' => '085678901234',
                'is_activated' => 0,
            ],
            [
                'first_name' => 'Fajar',
                'last_name' => 'Hidayat',
                'email' => 'fajar.hidayat@example.com',
                'phone' => '086789012345',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Gita',
                'last_name' => 'Lestari',
                'email' => 'gita.lestari@example.com',
                'phone' => '087890123456',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Hadi',
                'last_name' => 'Santoso',
                'email' => 'hadi.santoso@example.com',
                'phone' => '088901234567',
                'is_activated' => 0,
            ],
            [
                'first_name' => 'Intan',
                'last_name' => 'Permata',
                'email' => 'intan.permata@example.com',
                'phone' => '089012345678',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Joko',
                'last_name' => 'Prabowo',
                'email' => 'joko.prabowo@example.com',
                'phone' => '081123456789',
                'is_activated' => 1,
            ],

            // 20 data tambahan
            [
                'first_name' => 'Kiki',
                'last_name' => 'Ramadhan',
                'email' => 'kiki.ramadhan@example.com',
                'phone' => '081234567891',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Lina',
                'last_name' => 'Sari',
                'email' => 'lina.sari@example.com',
                'phone' => '082345678902',
                'is_activated' => 0,
            ],
            [
                'first_name' => 'Mira',
                'last_name' => 'Putri',
                'email' => 'mira.putri@example.com',
                'phone' => '083456789013',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Nina',
                'last_name' => 'Kusuma',
                'email' => 'nina.kusuma@example.com',
                'phone' => '084567890124',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Oki',
                'last_name' => 'Pratama',
                'email' => 'oki.pratama@example.com',
                'phone' => '085678901235',
                'is_activated' => 0,
            ],
            [
                'first_name' => 'Putu',
                'last_name' => 'Santika',
                'email' => 'putu.santika@example.com',
                'phone' => '086789012346',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Qori',
                'last_name' => 'Halim',
                'email' => 'qori.halim@example.com',
                'phone' => '087890123457',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Rina',
                'last_name' => 'Wibowo',
                'email' => 'rina.wibowo@example.com',
                'phone' => '088901234568',
                'is_activated' => 0,
            ],
            [
                'first_name' => 'Sari',
                'last_name' => 'Lestari',
                'email' => 'sari.lestari@example.com',
                'phone' => '089012345679',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Tono',
                'last_name' => 'Prasetyo',
                'email' => 'tono.prasetyo@example.com',
                'phone' => '081123456780',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Uli',
                'last_name' => 'Saputra',
                'email' => 'uli.saputra@example.com',
                'phone' => '082234567891',
                'is_activated' => 0,
            ],
            [
                'first_name' => 'Vina',
                'last_name' => 'Permata',
                'email' => 'vina.permata@example.com',
                'phone' => '083345678902',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Wawan',
                'last_name' => 'Hidayat',
                'email' => 'wawan.hidayat@example.com',
                'phone' => '084456789013',
                'is_activated' => 1,
            ],
            [
                'first_name' => 'Xena',
                'last_name' => 'Putri',
                'email' => 'xena.putri@example.com',
                'phone' => '085567890124',
                'is_activated' => 0,
            ],
            [
                'first_name' => 'Yudi',
                'last_name' => 'Santoso',
                'email' => 'yudi.santoso@example.com',
                'phone' => '086678901235',
                'is_activated' => 1,
            ],
        ];

        foreach ($customers as $customer) {
            Customer::create($customer);
        }

        // Atau kamu bisa buat data dummy random dengan factory (jika sudah ada factory)
        // Customer::factory()->count(10)->create();
    }
}
