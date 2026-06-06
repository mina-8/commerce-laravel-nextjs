<?php

namespace App\Filament\Resources\Products\Resources\ProductVariants\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ProductVariantForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make("price")
                    ->label("Price")
                    ->numeric()
                    ->required(),
                TextInput::make("sku")
                    ->label("SKU")
                    ->required(),
                FileUpload::make("images")
                    ->label("Variant Images")
                    ->image()
                    ->multiple()
                    ->panelLayout('grid')
                    ->reorderable()
                    ->maxParallelUploads(4)
                    ->disk("public")
                    ->directory("product-variant-images"),
            ]);
    }
}
