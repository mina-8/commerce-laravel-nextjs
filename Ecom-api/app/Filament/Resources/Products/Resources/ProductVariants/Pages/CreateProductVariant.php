<?php

namespace App\Filament\Resources\Products\Resources\ProductVariants\Pages;

use App\Filament\Resources\Products\Resources\ProductVariants\ProductVariantResource;
use Filament\Resources\Pages\CreateRecord;

class CreateProductVariant extends CreateRecord
{
    protected static string $resource = ProductVariantResource::class;
}
