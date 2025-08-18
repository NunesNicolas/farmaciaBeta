<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product extends Model
{
   use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'img',
        'category',
        'price',
        'description',
    ];

    public function productSurveys()
    {
        return $this->hasMany(product::class, 'product_id');
    }
}

