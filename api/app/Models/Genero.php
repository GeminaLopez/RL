<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genero extends Model
{
    /** @var string La tabla. */
    protected $table = "generos";
    /** @var string La PK. */
    protected $primaryKey = 'id_genero';

    /**
     * Define la relación con User.
     * Crea la propiedad "users"
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function users()
    {
        return $this->hasMany(User::class, 'id_genero', 'id_genero');
    }
}
