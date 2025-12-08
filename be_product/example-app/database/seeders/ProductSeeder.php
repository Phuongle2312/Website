<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'iPhone 17 Pro Max',
                'image' => '/image/iphone-17-pro-256-gb.png',
                'price' => '34.990.000₫',
                'description' => 'iPhone 17 Pro Max với chip A19 Pro mạnh mẽ, camera 48MP Pro, thời lượng pin đột phá.'
            ],
            [
                'name' => 'Samsung Galaxy S25 Ultra',
                'image' => '/image/samsung-galaxy-s25-ultra-blue-thumbai-600x600.jpg',
                'price' => '27.280.000₫',
                'description' => 'Samsung Galaxy S25 Ultra với camera 200MP, chip Exynos 2400, màn hình 6.8 inch QHD+ AMOLED.'
            ],
            [
                'name' => 'Xiaomi 17 Pro Max',
                'image' => '/image/xiaomi-17-pro-3.PNG',
                'price' => '26.990.000₫',
                'description' => 'Xiaomi 17 Pro Max trang bị Leica Summilux 50 MP, chip Snapdragon 8 Elite Gen 5 và màn hình LTPO AMOLED 6.9 inch.'
            ],
            [
                'name' => 'Oppo Find X7 Pro',
                'image' => '/image/oppo  Find X7 Ultra.jpg',
                'price' => '19.990.000₫',
                'description' => 'Oppo Find X7 Pro màn hình AMOLED 6,7 inch, bộ vi xử lý là Qualcomm Snapdragon 8 Gen2 .'
            ],
            [
                'name' => 'Vivo X300 Pro',
                'image' => '/image/vivoX300 Pro.jpg',
                'price' => '34.990.000₫',
                'description' => 'Vivo X300 Pro camera tiềm vọng khủng 200 MP, chip Dimensity 9500 và màn hình 4.500 nits'
            ],
            [
                'name' => 'Realme GT 8 Pro',
                'image' => '/image/realme-gt8-pro-xanh-ngọc_1761059633.jpg.jpg',
                'price' => '14.990.000₫',
                'description' => 'Realme GT 5 Pro với chip Snapdragon 8 Gen 5, màn hình AMOLED 6.7 inch, camera chính 50MP.'
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
