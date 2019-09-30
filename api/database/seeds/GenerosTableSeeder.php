<?php

use Illuminate\Database\Seeder;

class GenerosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Cargo datos
        DB::table('generos')->insert([
            'id_genero' => 1,
            'genero' => 'Mujer',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('generos')->insert([
            'id_genero' => 2,
            'genero' => 'Hombre',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('generos')->insert([
            'id_genero' => 3,
            'genero' => 'No binario',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('generos')->insert([
            'id_genero' => 4,
            'genero' => 'Tranvesti',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('generos')->insert([
            'id_genero' => 5,
            'genero' => 'Transexual',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('generos')->insert([
            'id_genero' => 6,
            'genero' => 'Transgénero',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
