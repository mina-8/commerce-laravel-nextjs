<?php

namespace App\Http\Controllers;

use App\Service\HomeService;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    protected HomeService $HomeService ;
    public function __construct(HomeService $HomeService)
    {
        $this->HomeService = $HomeService ;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['category', 'brand']);
        $products = $this->HomeService->getAllProjects($filters);
        $categories = $this->HomeService->AllCategory();
        $brands = $this->HomeService->AllBrands();
        return response()->json([
            'products' => $products,
            'categories' => $categories,
            'brands' => $brands
        ]);
    }

}
