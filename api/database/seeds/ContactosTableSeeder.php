<?php

use Illuminate\Database\Seeder;

class ContactosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         // Cargo datos
         DB::table('contactos')->insert([
            'id_contacto' => 1,
            'id_user_1'=> '1',
            'id_user_2' => '2',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        // Cargo datos
        DB::table('contactos')->insert([
            'id_contacto' => 2,
            'id_user_1'=> '1',
            'id_user_2' => '3',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
         // Cargo datos
         DB::table('contactos')->insert([
            'id_contacto' => 3,
            'id_user_1'=> '2',
            'id_user_2' => '3',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
