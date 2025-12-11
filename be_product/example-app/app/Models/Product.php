<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Product extends Model
{
    protected $fillable = [
        'name',
        'image_path',  // Đường dẫn tương đối
        'price',
        'description'
    ];

    /**
     * Accessor để tự động trả về full URL của ảnh
     * Sử dụng: $product->image_url
     */
    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->image_path 
                ? asset('storage/' . $this->image_path) 
                : null,
        );
    }

    /**
     * Append accessor vào JSON response
     */
    protected $appends = ['image_url'];
}
