<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('user_addresses', function (Blueprint $table) {
            $table->renameColumn('province_id', 'province_code');
            $table->renameColumn('city_id', 'regency_code');
            $table->renameColumn('city_name', 'regency_name');
            $table->renameColumn('district_id', 'district_code');
            $table->renameColumn('subdistrict_id', 'village_code');
            $table->renameColumn('subdistrict_name', 'village_name');
        });
    }

    public function down(): void
    {
        Schema::table('user_addresses', function (Blueprint $table) {
            $table->renameColumn('province_code', 'province_id');
            $table->renameColumn('regency_code', 'city_id');
            $table->renameColumn('regency_name', 'city_name');
            $table->renameColumn('district_code', 'district_id');
            $table->renameColumn('village_code', 'subdistrict_id');
            $table->renameColumn('village_name', 'subdistrict_name');
        });
    }
};
