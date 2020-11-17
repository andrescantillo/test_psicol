<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'events';

    protected $fillable = [
        'name', 'event_type_id', 'start', 'duration','place', 'created_at', 'updated_at'
    ];

    public function eventType(){
        return $this->hasOne(EventType::class, 'id', 'event_type_id');
    }

    public function tickets(){
        return $this->hasMany(Ticket::class, 'event_id', 'id');
    }
}
