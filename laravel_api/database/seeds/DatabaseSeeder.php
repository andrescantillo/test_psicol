<?php

use App\Model\Event;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call([
            EventTypeSeeder::class,
            EventSeeder::class,
            TicketTypeSeeder::class,
            TicketSeeder::class,
            PaymentMethodSeeder::class
        ]);
    }
}
