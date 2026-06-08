<?php

namespace App\Service;

use App\Models\Inventory;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\DB;

class CheckOutService
{
    public function processCheckout(array $data)
    {

        $items = [];
        $grandTotal = 0;

        foreach ($data['items'] as $item) {
            $variant = ProductVariant::query()
                ->with([
                    'product:id,name',
                    'inventory'
                ])
                ->findOrFail($item['variant_id']);

            if (!$variant->inventory) {

                throw new \Exception('Inventory not found');
            }

            if ($variant->inventory->quantity < $item['quantity']) {

                throw new \Exception(
                    "{$variant->product->name} out of stock"
                );
            }

            $total = $variant->price * $item['quantity'];

            $items[] = [
                'variant_id' => $variant->id,
                'product_name' => $variant->product->name,
                'price' => $variant->price,
                'quantity' => $item['quantity'],
                'total' => $total,
            ];

            $grandTotal += $total;
        }

        return [
            'items' => $items,
            'grand_total' => $grandTotal,
        ];
    }


    public function createOrder(array $data, int $userId): Order
    {
        return DB::transaction(function () use ($data, $userId) {



            foreach ($data['items'] as $item) {

                $inventory = Inventory::query()
                    ->where(
                        'product_variant_id',
                        $item['variant_id']
                    )
                    ->lockForUpdate()
                    ->firstOrFail();

                $available =
                    $inventory->quantity -
                    $inventory->reserved_quantity;

                if ($available < $item['quantity']) {
                    throw new \Exception(
                        'Out of stock'
                    );
                }

                $inventory->increment(
                    'reserved_quantity',
                    $item['quantity']
                );
            }

            $preview = $this->processCheckout($data);

            $order = Order::create([
                'user_id' => $userId,
                'total' => $preview['grand_total'],
                'status' => 'pending',
            ]);

            foreach ($preview['items'] as $item) {

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_variant_id' => $item['variant_id'],
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                    'total' => $item['total'],
                ]);
            }

            Payment::create([
                'order_id' => $order->id,
                'amount' => $preview['grand_total'],
                'status' => 'pending',
                'payment_method' => 'paymob'
            ]);

            return $order->load('items');
        });
    }

    public function confirmPayment(Order $order): void
    {
        DB::transaction(function () use ($order) {

            foreach ($order->items as $item) {

                $inventory = Inventory::query()
                    ->where(
                        'product_variant_id',
                        $item->product_variant_id
                    )
                    ->lockForUpdate()
                    ->firstOrFail();

                if ($inventory->quantity < $item->quantity) {

                    $order->update([
                        'status' => 'failed'
                    ]);

                    $order->payment()->update([
                        'status' => 'failed'
                    ]);

                    throw new \Exception(
                        'Insufficient stock'
                    );
                }

                $inventory->decrement(
                    'quantity',
                    $item->quantity
                );

                $inventory->decrement(
                    'reserved_quantity',
                    $item->quantity
                );
            }

            $order->update([
                'status' => 'paid'
            ]);

            $order->payment()->update([
                'status' => 'paid'
            ]);
        });
    }
}
