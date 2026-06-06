<?php

namespace App\Filament\Resources\Products\Resources\ProductVariants\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class ProductVariantsTable
{
    public static function configure(Table $table): Table
    {
        return $table
        ->defaultSort("id")
            ->columns([
                TextColumn::make('id')->label('ID')->sortable(),
                TextColumn::make('price')->label('Price')->sortable(),
                TextColumn::make('sku')->label('SKU')->sortable(),
                ToggleColumn::make('is_default')
                    ->label('Default Variant')
                    ->sortable()
                    ->disabled(), // Disable toggle to prevent changes from the table
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
