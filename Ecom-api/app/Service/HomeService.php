<?php

namespace App\Service;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;

class HomeService
{
    public function getAllProjects($filters = [])
    {
        $query = Product::query();

        // filter by category
        if(!empty($filters['category']))
            {
                $query->where('category_id', $filters['category']);
            }

        // filter by brand
        if(!empty($filters['brand']))
        {
            $query->where('brand_id', $filters['brand']);
        }

        $products = $query->with('defaultVariant:id,product_id,price,images')
            ->select('id', 'name', 'slug', 'description')
            ->latest()
            ->paginate(9)
            ->withQueryString();

        $products->getCollection()->transform(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'description' => $product->description,
                'price' => $product->defaultVariant->price ?? null,
                'image' => $product->defaultVariant->images ?? null,
            ];
        });

        return $products;
    }

    public function AllCategory()
    {
        $categories = Category::select('id', 'name')->get();
        return $categories;
    }

    public function AllBrands()
    {
        $brands = Brand::select('id', 'name')->get();
        return $brands;
    }
}
