<?php

use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Cargo datos
        DB::table('posts')->insert([
            'id_post' => 1,
            'titulo' => 'Campo de látex',
            'texto' => 'Hola a todxs! me gustaría traer al foro sobre como arman el campo de látex (si es que lo hacen) ya que necesito aprender',
            'id_user' => '1',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
