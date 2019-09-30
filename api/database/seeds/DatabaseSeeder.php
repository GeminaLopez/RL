<?php

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
        $this->call(CiudadesTableSeeder::class);
        $this->call(GenerosTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(ContactosTableSeeder::class);
        $this->call(PostsTableSeeder::class);
        $this->call(ComentariosTableSeeder::class);
        $this->call(MensajesTableSeeder::class);
        $this->call(ServiciosTableSeeder::class);
        $this->call(LocalesAmigosTableSeeder::class);
    }
}
