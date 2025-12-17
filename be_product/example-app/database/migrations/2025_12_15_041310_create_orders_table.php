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
            $table->string('order_number', 50)->unique();
            $table->enum('status', ['pending', 'confirmed', 'processing', 'shipping', 'delivered', 'cancelled', 'refunded'])->default('pending');
            
            // Pricing
            $table->decimal('subtotal', 15, 2);
            $table->decimal('shipping_fee', 15, 2)->default(0);
            $table->decimal('tax', 15, 2)->default(0);
            $table->decimal('discount', 15, 2)->default(0);
            $table->decimal('total', 15, 2);
            
            // Payment
            $table->enum('payment_method', ['cod', 'vnpay', 'momo']);
            $table->enum('payment_status', ['pending', 'paid', 'failed', 'refunded'])->default('pending');
            $table->string('payment_transaction_id')->nullable();
            $table->json('payment_data')->nullable();
            
            // Shipping
            $table->string('shipping_name');
            $table->string('shipping_phone', 20);
            $table->text('shipping_address');
            $table->string('shipping_province', 100)->nullable();
            $table->string('shipping_district', 100)->nullable();
            $table->string('shipping_ward', 100)->nullable();
            $table->string('shipping_method', 50)->nullable();
            $table->string('shipping_tracking_number', 100)->nullable();
            $table->json('shipping_data')->nullable();
            
            $table->text('notes')->nullable();
            $table->timestamps();
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
