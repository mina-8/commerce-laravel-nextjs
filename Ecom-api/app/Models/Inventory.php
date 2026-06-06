<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    protected $fillable = ['product_variant_id', 'quantity'];

    public function productVariant()
    {
        return $this->belongsTo(ProductVariant::class);
    }
}
