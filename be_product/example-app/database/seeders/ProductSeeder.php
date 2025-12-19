<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Xóa dữ liệu cũ trước khi seed lại
        DB::table('products')->truncate();

        // Danh sách ảnh từ thư mục /image của bạn
        $images = [
            '/image/iphone-17-pro-256-gb.png',                    // iPhone
            '/image/samsung-galaxy-s25-ultra-blue-thumbai-600x600.jpg',  // Samsung
            '/image/xiaomi 17 pro max.jpg',                      // Xiaomi
            '/image/oppo  Find X7 Ultra.jpg',                    // Oppo
            '/image/vivoX300 Pro.jpg',                           // Vivo
            '/image/realme-GT8Pro.jpg',                          // Realme
            '/image/images.jpeg',                                // Google Pixel
        ];

        // Dữ liệu sản phẩm thực tế
        $products = [
            [
                'name' => 'iPhone 16 Pro Max',
                'image_path' => $images[0],
                'price' => '34.990.000₫',
                'description' => 'iPhone 16 Pro Max với chip A18 Pro mạnh mẽ, camera 48MP Pro, thời lượng pin đột phá.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Samsung Galaxy S24 Ultra',
                'image_path' => $images[1],
                'price' => '27.280.000₫',
                'description' => 'Samsung Galaxy S24 Ultra với camera 200MP, chip Snapdragon 8 Gen 3, màn hình 6.8 inch QHD+ AMOLED.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Xiaomi 14T Pro',
                'image_path' => $images[2],
                'price' => '13.990.000₫',
                'description' => 'Xiaomi 14T Pro trang bị Leica camera 50 MP, chip MediaTek Dimensity 9300+ và màn hình AMOLED 6.67 inch.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Oppo Find X7 Ultra',
                'image_path' => $images[3],
                'price' => '19.990.000₫',
                'description' => 'Oppo Find X7 Ultra màn hình AMOLED 6.82 inch, bộ vi xử lý Qualcomm Snapdragon 8 Gen 3.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Vivo V40 Pro 5G',
                'image_path' => $images[4],
                'price' => '12.990.000₫',
                'description' => 'Vivo V40 Pro camera ZEISS 50 MP, chip MediaTek Dimensity 9200+ và màn hình AMOLED 6.78 inch',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Realme 13 Pro+ 5G',
                'image_path' => $images[5],
                'price' => '10.990.000₫',
                'description' => 'Realme 13 Pro+ với chip Snapdragon 7s Gen 2, màn hình AMOLED 6.7 inch, camera chính 50MP.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Google Pixel 8 Pro',
                'image_path' => $images[6],
                'price' => '20.990.000₫',
                'description' => 'Google Pixel 8 Pro với chip Tensor G3, camera 50MP, AI photography.',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        // Insert dữ liệu
        DB::table('products')->insert($products);

        // Hoặc nếu muốn tạo nhiều sản phẩm demo với ảnh random:
        // $data = [];
        // for ($i = 1; $i <= 50; $i++) {
        //     $data[] = [
        //         'name' => 'Sản phẩm Demo ' . $i,
        //         'price' => number_format(rand(100000, 2000000), 0, ',', '.') . '₫',
        //         'description' => 'Mô tả ngắn cho sản phẩm ' . $i,
        //         'image_path' => $images[array_rand($images)], // Random ảnh
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ];
        // }
        // DB::table('products')->insert($data);
    }
}
