<?php

use App\Model\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Event::truncate();

        Event::insert([[
            'name' => 'Electronic Music Festival',
            'event_type_id' => 1,
            'start' => date("Y-m-d H:i:s", strtotime('2020-12-12 18:00:00')),
            'duration' => 4, 
            'place' => 'Estadio Atanasio Girardot', 
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ],[
            'name' => 'Node Conf',
            'event_type_id' => 2,
            'start' => date("Y-m-d H:i:s",strtotime('2021-06-10 08:00:00')),
            'duration' => 10,
            'place' => 'Ruta N',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ],[
            'name' => 'Tecnologias de las proximas decadas',
            'event_type_id' => 4,
            'start' => date("Y-m-d H:i:s", strtotime('2021-01-30 14:00:00')),
            'duration' => 2,
            'place' => 'Centro de convecciones',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]]);
    }
}
