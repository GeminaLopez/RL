<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMensajesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mensajes', function (Blueprint $table) {
            $table->increments('id_mensaje');
            $table->string('mensaje', 255);
            // relación Persona 1
            $table->unsignedInteger('id_user_1');
            $table->foreign('id_user_1')->references('id_user')->on('users');
            // relación Persona 2
            $table->unsignedInteger('id_user_2');
            $table->foreign('id_user_2')->references('id_user')->on('users');
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
        Schema::dropIfExists('mensajes');
    }
}
