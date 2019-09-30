<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Cargo datos
        DB::table('users')->insert([
            'id_user' => 1,
            'nombre' => 'Gemina',
            'apellido' => 'Lopez',
            'fecha_nac' => '1985-06-18',
            'email' => 'gem@gmail.com',
            'password' => Hash::make('123456'),
            'avatar' => '',
            'es_Admin'=> 1,
            'brinda_Servicio' => 1,
            'puntaje' => '4',
            'ubicacion_lat' => '-34.62022',
            'ubicacion_long' => '-58.397200',
            'ip'=>'192.168.0.1',
            'id_ciudad' => '4',
            'id_genero' => '1',            
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);
        // Cargo datos
        DB::table('users')->insert([
            'id_user' => 2,
            'nombre' => 'Santiago',
            'apellido' => 'Gallino',
            'fecha_nac' => '1984-07-12',
            'email' => 'santi@gmail.com',
            'password' => Hash::make('123456'),
            'avatar' => '',
            'es_Admin'=> 1,
            'brinda_Servicio' => 0,
            'puntaje' => '0',
            'ubicacion_lat' => '-34.618238',
            'ubicacion_long' => '-58.394240',
            'ip'=>'192.168.0.1',
            'id_ciudad' => '4',
            'id_genero' => '2',            
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);
        // Cargo datos
        DB::table('users')->insert([
            'id_user' => 3,
            'nombre' => 'Lizy',
            'apellido' => 'Tagliani',
            'fecha_nac' => '1977-04-13',
            'email' => 'lizy@gmail.com',
            'password' => Hash::make('123456'),
            'avatar' => '',
            'es_Admin'=> 1,
            'brinda_Servicio' => 1,
            'puntaje' => '4',
            'ubicacion_lat' => '-34.5826067',
            'ubicacion_long' => '-58.4198605',
            'ip'=>'192.168.0.1',
            'id_ciudad' => '4',
            'id_genero' => '3',            
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);
    }
}
