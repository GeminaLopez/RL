<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comentario extends Model
{
    // Indico que quiero usar SoftDeletes.
    use SoftDeletes;

    /** @var string La tabla. */
    protected $table = "comentarios";
    /** @var string La PK. */
    protected $primaryKey = 'id_comentario';

    /** @var array La lista de campos que se pueden cargar masivamente. */
    protected $fillable = ['comentario', 'id_post', 'id_user'];

    /** @var array Las reglas de validación en la creación. */
    public static $rules = [
        'comentario' => 'required|min:3',
        'id_user' => 'required|integer|exists:users',
        'id_post' => 'required|integer|exists:posts'
    ];

     /** @var array Los mensajes de error de las $rules en la creación del comentario */
     public static $errorMessages = [
        'comentario.required' => 'El comentario debe tener un valor.',
        'comentario.min' => 'El comentario debe tener al menos :min caracteres.',
        'id_user.required' => 'El comentario debe tener un usuario asignado.',
        'id_user.integer' => 'El usuario debe ser un número.',
        'id_user.exists' => 'El usuario seleccionado no existe.',
        'id_post.required' => 'El comentario debe tener un post asignado.',
        'id_post.integer' => 'El post debe ser un número.',
        'id_post.exists' => 'El post seleccionado no existe.'
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
