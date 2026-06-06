<?php

namespace App\Models;

use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasSlug;
    protected $fillable = ['name', 'slug'];

    protected static function getSlugPrefix(): string
    {
        return 'brand-';
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
