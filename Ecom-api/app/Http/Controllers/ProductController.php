<?php

namespace App\Http\Controllers;

use App\Service\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected ProductService $productService;
    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }
    public function show($slug)
    {
        $product = $this->productService->getProductBySlug($slug);
        return response()->json($product);
        // Implementation for showing a specific product
    }
}
