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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('invoice_number')->unique();
            $table->string('status')->default('Pending'); // Pending, Processing, Shipped, Completed, Cancelled
            $table->integer('subtotal');
            $table->integer('shipping_fee')->default(0);
            $table->integer('insurance_fee')->default(0);
            $table->integer('discount')->default(0);
            $table->integer('tax')->default(0);
            $table->integer('grand_total');
            $table->unsignedBigInteger('shipping_address_id')->nullable(); // nullable if address deleted
            $table->string('shipping_method')->nullable();
            $table->timestamps();

            $table->foreign('shipping_address_id')->references('id')->on('user_addresses')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
