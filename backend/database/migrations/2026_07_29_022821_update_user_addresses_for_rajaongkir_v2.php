<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('user_addresses', function (Blueprint $table) {
            // Check and drop foreign keys first
            $foreignKeys = [
                'province_code' => 'user_addresses_province_code_foreign',
                'regency_code' => 'user_addresses_regency_code_foreign',
                'district_code' => 'user_addresses_district_code_foreign',
                'village_code' => 'user_addresses_village_code_foreign'
            ];
            
            foreach ($foreignKeys as $col => $fk) {
                if (Schema::hasColumn('user_addresses', $col)) {
                    // Try to drop the foreign key, ignore if it doesn't exist
                    try {
                        $table->dropForeign($fk);
                    } catch (\Exception $e) {
                        // ignore
                    }
                }
            }
        });

        Schema::table('user_addresses', function (Blueprint $table) {
            if (Schema::hasColumn('user_addresses', 'province_id')) {
                $table->dropColumn('province_id');
            }
            if (Schema::hasColumn('user_addresses', 'city_id')) {
                $table->dropColumn('city_id');
            }
            if (Schema::hasColumn('user_addresses', 'district')) {
                $table->dropColumn('district');
            }
            if (Schema::hasColumn('user_addresses', 'province_code')) {
                $table->dropColumn('province_code');
            }
            if (Schema::hasColumn('user_addresses', 'regency_code')) {
                $table->dropColumn('regency_code');
            }
            if (Schema::hasColumn('user_addresses', 'district_code')) {
                $table->dropColumn('district_code');
            }
            if (Schema::hasColumn('user_addresses', 'village_code')) {
                $table->dropColumn('village_code');
            }
        });

        Schema::table('user_addresses', function (Blueprint $table) {
            $table->string('province_id')->nullable()->after('address');
            $table->string('province_name')->nullable()->after('province_id');
            $table->string('city_id')->nullable()->after('province_name');
            $table->string('city_name')->nullable()->after('city_id');
            $table->string('district_id')->nullable()->after('city_name');
            $table->string('district_name')->nullable()->after('district_id');
            $table->string('subdistrict_id')->nullable()->after('district_name');
            $table->string('subdistrict_name')->nullable()->after('subdistrict_id');
        });

        Schema::dropIfExists('cities');
        Schema::dropIfExists('provinces');
    }

    public function down(): void
    {
        Schema::table('user_addresses', function (Blueprint $table) {
            $table->dropColumn([
                'province_id', 'province_name', 
                'city_id', 'city_name', 
                'district_id', 'district_name', 
                'subdistrict_id', 'subdistrict_name'
            ]);

            $table->string('province_id')->nullable();
            $table->string('city_id')->nullable();
            $table->string('district')->nullable();
        });
    }
};
