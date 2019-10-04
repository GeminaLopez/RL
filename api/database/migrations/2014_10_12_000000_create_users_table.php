<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id_user');
            $table->string('nombre');
            $table->string('apellido')->nullable();
            $table->date('fecha_nac');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password',255);
            $table->string('avatar', 255)->nullable();
            $table->boolean('es_admin')->default(0);
            $table->boolean('brinda_servicio')->default(0);
            $table->integer('puntaje')->default(0);
            $table->decimal('ubicacion_lat', 10, 8)->nullable();
            $table->decimal('ubicacion_long', 10, 8)->nullable();
            $table->string('ip',15)->nullable();
            // relación Ciudad
            $table->unsignedInteger('id_ciudad')->default(1);
            $table->foreign('id_ciudad')->references('id_ciudad')->on('ciudades');
            // relación Genero
            $table->unsignedInteger('id_genero')->default(1);
            $table->foreign('id_genero')->references('id_genero')->on('generos');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
