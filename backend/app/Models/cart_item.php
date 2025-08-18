<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class cart_item extends Model
{
    protected $fillable = [
        'cart_id',
        'product_id',
        'quantity',
        'price',
    ];

    public function cart_items()
    {
        return $this->hasMany(cart_item::class, 'cart_id');
    }
}
