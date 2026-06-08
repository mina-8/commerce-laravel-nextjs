<?php

namespace App\Service;

use App\Models\Product;

class ProductService
{
    public function getProductBySlug($slug)
    {
        $product = Product::with(
            "category:id,name",
            "brand:id,name",
            "defaultVariant.attributeValues.attribute",
            "productVariants.attributeValues.attribute",
        )
            ->where("slug", "=", $slug)
            ->firstOrFail();

        $attributes = [];
        $variantsMap = [];

        foreach ($product->productVariants as $variant) {

            $attributeIds = [];

            foreach ($variant->attributeValues as $value) {

                $attributeName = $value->attribute->name;

                if (!isset($attributes[$attributeName])) {
                    $attributes[$attributeName] = [];
                }

                $attributes[$attributeName][$value->id] = [
                    'id' => $value->id,
                    'name' => $value->name,
                ];

                $attributeIds[] = $value->id;
            }

            sort($attributeIds);

            $key = implode('-', $attributeIds);

            $variantsMap[$key] = [
                'id' => $variant->id,
                'price' => $variant->price,
                'sku' => $variant->sku,
                'images' => $variant->images,
                'is_default' => $variant->is_default,
            ];
        }

        $productData =  [
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,

            'category' => [
                'name' => $product->category?->name,
            ],

            'brand' => [
                'name' => $product->brand?->name,
            ],

            'attributes' => array_map(
                fn($values) => array_values($values),
                $attributes
            ),

            'default_variant' => [
                'id' => $product->defaultVariant?->id,
                'price' => $product->defaultVariant?->price,
                'sku' => $product->defaultVariant?->sku,
                'images' => $product->defaultVariant?->images,
            ],

            'variants_map' => $variantsMap,
        ];

        return $productData;
    }
}
