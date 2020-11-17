<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $table = 'tickets';

    protected $fillable = [
        'event_id', 'ticket_type_id', 'available_tickets', 'value'
    ];

    public function events(){
        return $this->hasOne(Event::class, 'id', 'event_id');
    }

    public function ticketType(){
        return $this->hasOne(TicketType::class, 'id', 'ticket_type_id');
    }

    public function invoices(){
        return $this->hasMany(Invoice::class, 'ticket_id', 'id');
    }
}
