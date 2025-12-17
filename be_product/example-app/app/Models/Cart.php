<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'session_id',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(CartItem::class);
    }

    // Accessors
    public function getTotalAttribute()
    {
        return $this->items->sum(function ($item) {
            return $item->price * $item->quantity;
        });
    }

    public function getItemCountAttribute()
    {
        return $this->items->sum('quantity');
    }

    // Methods
    public function addItem($productId, $quantity = 1, $price)
    {
        $item = $this->items()->where('product_id', $productId)->first();

        if ($item) {
            $item->quantity += $quantity;
            $item->save();
        } else {
            $this->items()->create([
                'product_id' => $productId,
                'quantity' => $quantity,
                'price' => $price,
            ]);
        }

        return $this->fresh('items');
    }

    public function updateItem($itemId, $quantity)
    {
        $item = $this->items()->find($itemId);
        
        if ($item) {
            $item->quantity = $quantity;
            $item->save();
        }

        return $this->fresh('items');
    }

    public function removeItem($itemId)
    {
        $this->items()->where('id', $itemId)->delete();
        return $this->fresh('items');
    }
}
