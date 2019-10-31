<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    // Indico que quiero usar SoftDeletes.
    use SoftDeletes;

   /** @var string La tabla. */
   protected $table = "posts";
   /** @var string La PK. */
   protected $primaryKey = 'id_post';

   /** @var array La lista de campos que se pueden cargar masivamente. */
   protected $fillable = ['titulo', 'texto', 'id_user'];

   /** @var array Las reglas de validación en la creación. */
   public static $rules = [
        'titulo' => 'required|min:3',
        'texto' => 'required|min:3',
        'id_user' => 'required|integer|exists:users'
    ];

    /** @var array Los mensajes de error de las $rules en la creación del post */
    public static $errorMessages = [
        'titulo.required' => 'El titulo del post debe tener un valor.',
        'titulo.min' => 'El titulo del post debe tener al menos :min caracteres.',
        'texto.required' => 'El texto del post debe tener un valor.',
        'texto.min' => 'El texto del post debe tener al menos :min caracteres.',
        'id_user.required' => 'El post debe tener un usuario asignado.',
        'id_user.integer' => 'El usuario debe ser un número.',
        'id_user.exists' => 'El usuario seleccionado no existe.'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        // relación inversa del 1 a muchos
        return $this->hasMany(User::class, 'id_user', 'id_user');
    }

}
