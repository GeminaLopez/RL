<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ciudad extends Model
{
    /** @var string La tabla. */
    protected $table = "ciudades";
    /** @var string La PK. */
    protected $primaryKey = 'id_ciudad';

    /**
     * Define la relación con User.
     * Crea la propiedad "users"
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function users()
    {
        return $this->hasMany(User::class, 'id_ciudad', 'id_ciudad');
    }
}
