<?php

use App\Model\Ticket;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('TRUNCATE tickets CASCADE');

        Ticket::insert([[
            'event_id' => 1,
            'ticket_type_id' => 1,
            'available_tickets' => 1000, 
            'value' => 100000, 
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
        ],[
            'event_id' => 1,
            'ticket_type_id' => 3,
            'available_tickets' => 500, 
            'value' => 300000, 
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
        ],[
            'event_id' => 1,
            'ticket_type_id' => 6,
            'available_tickets' => 200, 
            'value' => 500000, 
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
        ],[
            'event_id' => 2,
            'ticket_type_id' => 7,
            'available_tickets' => 300, 
            'value' => 300000, 
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
        ],[
            'event_id' => 2,
            'ticket_type_id' => 8,
            'available_tickets' => 100, 
            'value' => 500000, 
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
        ],[
            'event_id' => 3,
            'ticket_type_id' => 7,
            'available_tickets' => 300, 
            'value' => 50000, 
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
        ],[
            'event_id' => 3,
            'ticket_type_id' => 8,
            'available_tickets' => 50, 
            'value' => 100000, 
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
        ],]);
    }
}
