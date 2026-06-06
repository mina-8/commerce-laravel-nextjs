<?php

namespace App\Filament\Resources\Products\Resources\ProductVariants;

use App\Filament\Resources\Products\ProductResource;
use App\Filament\Resources\Products\Resources\ProductVariants\Pages\CreateProductVariant;
use App\Filament\Resources\Products\Resources\ProductVariants\Pages\EditProductVariant;
use App\Filament\Resources\Products\Resources\ProductVariants\RelationManagers\AttributeValuesRelationManager;
use App\Filament\Resources\Products\Resources\ProductVariants\Schemas\ProductVariantForm;
use App\Filament\Resources\Products\Resources\ProductVariants\Tables\ProductVariantsTable;
use App\Models\ProductVariant;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ProductVariantResource extends Resource
{
    protected static ?string $model = ProductVariant::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $parentResource = ProductResource::class;

    public static function form(Schema $schema): Schema
    {
        return ProductVariantForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ProductVariantsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            AttributeValuesRelationManager::class
        ];
    }

    public static function getPages(): array
    {
        return [
            'create' => CreateProductVariant::route('/create'),
            'edit' => EditProductVariant::route('/{record}/edit'),
        ];
    }
}
