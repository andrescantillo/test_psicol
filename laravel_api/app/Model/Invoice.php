<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $table = 'invoices';

    protected $fillable = [
        'ticket_id', 'payment_method_id', 'customer_id', 'quantity','total'
    ];
}
