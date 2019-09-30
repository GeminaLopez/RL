<?php

use Illuminate\Database\Seeder;

class ComentariosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Cargo datos
        DB::table('comentarios')->insert([
            'id_comentario' => 1,
            'id_user' => '3',
            'id_post' => '1',
            'comentario' => 'Armemos una charla en el parque Centenario ;-)',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
