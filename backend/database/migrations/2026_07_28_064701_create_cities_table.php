<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->string('city_id')->unique(); // RajaOngkir city ID
            $table->string('province_id');
            $table->string('type'); // Kabupaten / Kota
            $table->string('city_name');
            $table->string('postal_code')->nullable();
            $table->timestamps();

            $table->index('province_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cities');
    }
};
