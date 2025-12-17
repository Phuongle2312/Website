<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_number',
        'status',
        'subtotal',
        'shipping_fee',
        'tax',
        'discount',
        'total',
        'payment_method',
        'payment_status',
        'payment_transaction_id',
        'payment_data',
        'shipping_name',
        'shipping_phone',
        'shipping_address',
        'shipping_province',
        'shipping_district',
        'shipping_ward',
        'shipping_method',
        'shipping_tracking_number',
        'shipping_data',
        'notes',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'shipping_fee' => 'decimal:2',
        'tax' => 'decimal:2',
        'discount' => 'decimal:2',
        'total' => 'decimal:2',
        'payment_data' => 'array',
        'shipping_data' => 'array',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    // Scopes
    public function scopeRecent($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByPaymentStatus($query, $status)
    {
        return $query->where('payment_status', $status);
    }

    // Methods
    public static function generateOrderNumber()
    {
        return 'ORD-' . strtoupper(Str::random(10)) . '-' . time();
    }

    public function canBeCancelled()
    {
        return in_array($this->status, ['pending', 'confirmed']);
    }

    public function updatePaymentStatus($status, $transactionId = null, $data = null)
    {
        $this->payment_status = $status;
        
        if ($transactionId) {
            $this->payment_transaction_id = $transactionId;
        }
        
        if ($data) {
            $this->payment_data = $data;
        }
        
        $this->save();
    }

    public function updateShippingStatus($status, $trackingNumber = null, $data = null)
    {
        $this->status = $status;
        
        if ($trackingNumber) {
            $this->shipping_tracking_number = $trackingNumber;
        }
        
        if ($data) {
            $this->shipping_data = $data;
        }
        
        $this->save();
    }
}
