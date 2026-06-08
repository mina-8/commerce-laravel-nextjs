<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'order_id',
        'transaction_id',
        'gateway',
        'amount',
        'status',
        'gateway_response',
    ];

    
}
