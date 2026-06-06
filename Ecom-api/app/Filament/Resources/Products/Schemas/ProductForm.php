<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make("category_id")
                    ->label("Category")
                    ->relationship("category", "name")
                    ->searchable()
                    ->preload(),
                Select::make('brand_id')
                    ->label('Brand')
                    ->relationship('brand', 'name')
                    ->searchable()
                    ->preload(),
                TextInput::make('name')
                    ->label('Product Name')
                    ->required()
                    ->maxLength(255),
                RichEditor::make('description')
                    ->label('Product Description')
                    ->required(),
            ]);
    }
}
