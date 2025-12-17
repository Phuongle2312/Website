<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'sku',
        'brand',
        'price',
        'stock',
        'image_url',
        'description',
        'description_short',
        'description_long',
        'specifications',
        'is_featured',
        'is_active',
        'discount_percentage',
        'rating_average',
        'rating_count',
        'view_count',
        'weight',
        'length',
        'width',
        'height',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'discount_percentage' => 'decimal:2',
        'rating_average' => 'decimal:2',
        'specifications' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
    ];

    protected $appends = ['discounted_price', 'main_image'];

    // Relationships
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class)->orderBy('display_order');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function wishlists()
    {
        return $this->hasMany(Wishlist::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeInStock($query)
    {
        return $query->where('stock', '>', 0);
    }

    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    // Accessors
    protected function discountedPrice(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->price - ($this->price * $this->discount_percentage / 100)
        );
    }

    protected function mainImage(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->images()->where('is_primary', true)->first()?->image_url ?? $this->image_url
        );
    }

    // Methods
    public function updateRating()
    {
        $this->rating_average = $this->reviews()->approved()->avg('rating') ?? 0;
        $this->rating_count = $this->reviews()->approved()->count();
        $this->save();
    }

    public function incrementViewCount()
    {
        $this->increment('view_count');
    }
}
