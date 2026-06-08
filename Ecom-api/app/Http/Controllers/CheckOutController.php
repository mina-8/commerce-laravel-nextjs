<?php

namespace App\Http\Controllers;

use App\Service\CheckOutService;
use Illuminate\Http\Request;

class CheckOutController extends Controller
{
    protected CheckOutService $checkOutService;
    public function __construct(CheckOutService $checkOutService)
    {
        $this->checkOutService = $checkOutService;
    }

    public function checkout(Request $request)
    {
        $data = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.variant_id' => 'nullable|integer',
            'items.*.quantity' => 'required|integer|min:1',
        ]);


        $checkoutData = $this->checkOutService->processCheckout($data);

        return response()->json($checkoutData);
    }
}
