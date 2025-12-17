<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'phone',
        'address',
        'province',
        'district',
        'ward',
        'is_default',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Methods
    public function setAsDefault()
    {
        // Unset all other default addresses for this user
        $this->user->addresses()->update(['is_default' => false]);
        
        // Set this address as default
        $this->is_default = true;
        $this->save();
    }
}
