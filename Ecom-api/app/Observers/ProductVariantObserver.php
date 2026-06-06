<?php

namespace App\Observers;

use App\Models\ProductVariant;

class ProductVariantObserver
{
    /**
     * Handle the ProductVariant "saving" event.
     */
    public function saving(ProductVariant $productVariant): void
    {
        if ($productVariant->is_default) {

            ProductVariant::where('product_id', $productVariant->product_id)
                ->where('id', '!=', $productVariant->id)
                ->update(['is_default' => false]);
        }
    }

    /**
     * Handle the ProductVariant "created" event.
     */
    public function created(ProductVariant $productVariant): void
    {
        $exists = ProductVariant::where('product_id', $productVariant->product_id)->count();

        if ($exists === 1) {
            $productVariant->is_default = true;
            $productVariant->saveQuietly(); // مهم جدًا
        }
    }
}
