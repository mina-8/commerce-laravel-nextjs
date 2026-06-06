<?php

namespace App\Filament\Resources\Products\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ProductsTable
{
    public static function configure(Table $table): Table
    {
        return $table
        ->defaultSort("id")
            ->columns([
                TextColumn::make('id')->label('ID')->sortable(),
                TextColumn::make('brand.name')->label('Brand Name')->searchable()->sortable(),
                TextColumn::make('category.name')->label('Category Name')->searchable()->sortable(),
                TextColumn::make('name')->label('Product Name')->searchable()->sortable(),
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
