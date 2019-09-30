<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLocalesAmigosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('locales_amigos', function (Blueprint $table) {
            $table->increments('id_local_amigo');
            $table->string('nombre', 45);
            $table->string('sitioWeb', 60);
            $table->decimal('descuento', 2, 0);
            $table->string('descripcion', 255);
            $table->integer('puntaje');
            $table->string('telefono', 30);
            // relación Ciudad
            $table->unsignedInteger('id_ciudad');
            $table->foreign('id_ciudad')->references('id_ciudad')->on('ciudades');
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
        Schema::dropIfExists('locales_amigos');
    }
}
