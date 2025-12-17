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
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable()->after('id')->constrained()->onDelete('set null');
            $table->string('sku', 100)->unique()->nullable()->after('name');
            $table->text('description_short')->nullable()->after('description');
            $table->text('description_long')->nullable()->after('description_short');
            $table->json('specifications')->nullable()->after('description_long');
            $table->boolean('is_featured')->default(false)->after('stock');
            $table->boolean('is_active')->default(true)->after('is_featured');
            $table->decimal('discount_percentage', 5, 2)->default(0)->after('price');
            $table->decimal('rating_average', 3, 2)->default(0)->after('is_active');
            $table->integer('rating_count')->default(0)->after('rating_average');
            $table->integer('view_count')->default(0)->after('rating_count');
            $table->integer('weight')->nullable()->comment('Trọng lượng (gram)')->after('view_count');
            $table->integer('length')->nullable()->comment('Chiều dài (cm)')->after('weight');
            $table->integer('width')->nullable()->comment('Chiều rộng (cm)')->after('length');
            $table->integer('height')->nullable()->comment('Chiều cao (cm)')->after('width');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropColumn([
                'category_id', 'sku', 'description_short', 'description_long', 
                'specifications', 'is_featured', 'is_active', 'discount_percentage',
                'rating_average', 'rating_count', 'view_count', 
                'weight', 'length', 'width', 'height'
            ]);
        });
    }
};
