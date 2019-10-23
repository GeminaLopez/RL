<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

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
            'fecha_nac' => Carbon::create(1985,06,18,0,0,0)->toDateString(),
            'email' => 'gem@gmail.com',
            'password' => Hash::make('123456'),
            'avatar' => '',
            'es_admin'=> 1,
            'brinda_servicio' => 1,
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
            'fecha_nac' => Carbon::create(1984,07,12,0,0,0)->toDateString(),
            'email' => 'santi@gmail.com',
            'password' => Hash::make('123456'),
            'avatar' => '',
            'es_admin'=> 1,
            'brinda_servicio' => 0,
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
            'fecha_nac' => Carbon::create(1977,04,13,0,0,0)->toDateString(),
            'email' => 'lizy@gmail.com',
            'password' => Hash::make('123456'),
            'avatar' => '',
            'es_admin'=> 1,
            'brinda_servicio' => 1,
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
