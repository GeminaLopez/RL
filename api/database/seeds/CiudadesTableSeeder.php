<?php

use Illuminate\Database\Seeder;

class CiudadesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Cargo datos
        DB::table('ciudades')->insert([
            'id_ciudad' => 1,
            'ciudad' => 'Morón',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 2,
            'ciudad' => 'Ituzaingó',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 3,
            'ciudad' => 'San Justo',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 4,
            'ciudad' => 'Ciudad Autónoma de Buenos Aires',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 5,
            'ciudad' => 'La Plata',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 6,
            'ciudad' => 'Luján',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 7,
            'ciudad' => 'San Martín',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 8,
            'ciudad' => 'Bahía Blanca',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 9,
            'ciudad' => 'Tigre',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 10,
            'ciudad' => 'Ezeiza',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 11,
            'ciudad' => 'Caseros',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 12,
            'ciudad' => 'Merlo',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 13,
            'ciudad' => 'Lomas de Zamora',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 14,
            'ciudad' => 'San Pedro',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 15,
            'ciudad' => 'Moreno',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 16,
            'ciudad' => 'Merlo',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 17,
            'ciudad' => 'San Antonio de Padua',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 18,
            'ciudad' => 'Ituzaingó',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 19,
            'ciudad' => 'San Miguel del Monte',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 20,
            'ciudad' => 'Azul',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 21,
            'ciudad' => 'Junín',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 22,
            'ciudad' => 'Olavarría',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 23,
            'ciudad' => 'Campana',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 24,
            'ciudad' => 'Necochea',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 25,
            'ciudad' => 'Pergamino',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 26,
            'ciudad' => 'Tandil',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 27,
            'ciudad' => 'Banfield',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 28,
            'ciudad' => 'Temperley',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 29,
            'ciudad' => 'Berazategui',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 30,
            'ciudad' => 'Cañuelas',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 31,
            'ciudad' => 'Zárate',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 32,
            'ciudad' => 'Wilde',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('ciudades')->insert([
            'id_ciudad' => 33,
            'ciudad' => 'San Isidro',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
