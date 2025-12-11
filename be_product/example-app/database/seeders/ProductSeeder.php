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
        // Danh sách ảnh mẫu trong storage/app/public/products/
        // Bạn cần copy ảnh vào thư mục đó trước khi seed
        $images = [
            'products/p1.jpg',
            'products/p2.jpg',
            'products/p3.jpg',
            'products/p4.jpg',
            'products/p5.jpg',
            'products/p6.jpg',
            'products/p7.jpg',
        ];

        // Dữ liệu sản phẩm thực tế
        $products = [
            [
                'name' => 'iPhone 17 Pro Max',
                'image_path' => $images[0], // products/p1.jpg
                'price' => '34.990.000₫',
                'description' => 'iPhone 17 Pro Max với chip A19 Pro mạnh mẽ, camera 48MP Pro, thời lượng pin đột phá.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Samsung Galaxy S25 Ultra',
                'image_path' => $images[1], // products/p2.jpg
                'price' => '27.280.000₫',
                'description' => 'Samsung Galaxy S25 Ultra với camera 200MP, chip Exynos 2400, màn hình 6.8 inch QHD+ AMOLED.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Xiaomi 17 Pro Max',
                'image_path' => $images[2], // products/p3.jpg
                'price' => '26.990.000₫',
                'description' => 'Xiaomi 17 Pro Max trang bị Leica Summilux 50 MP, chip Snapdragon 8 Elite Gen 5 và màn hình LTPO AMOLED 6.9 inch.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Oppo Find X7 Pro',
                'image_path' => $images[3], // products/p4.jpg
                'price' => '19.990.000₫',
                'description' => 'Oppo Find X7 Pro màn hình AMOLED 6,7 inch, bộ vi xử lý là Qualcomm Snapdragon 8 Gen2.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Vivo X300 Pro',
                'image_path' => $images[4], // products/p5.jpg
                'price' => '34.990.000₫',
                'description' => 'Vivo X300 Pro camera tiềm vọng khủng 200 MP, chip Dimensity 9500 và màn hình 4.500 nits',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Realme GT 8 Pro',
                'image_path' => $images[5], // products/p6.jpg
                'price' => '14.990.000₫',
                'description' => 'Realme GT 8 Pro với chip Snapdragon 8 Gen 5, màn hình AMOLED 6.7 inch, camera chính 50MP.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Google Pixel 8 Pro',
                'image_path' => $images[6], // products/p7.jpg
                'price' => '29.990.000₫',
                'description' => 'Google Pixel 8 Pro với chip Tensor G3, camera 50MP.',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        // Insert dữ liệu (nhanh hơn create từng dòng)
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
