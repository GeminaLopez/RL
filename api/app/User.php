<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /** @var string La tabla. */
    protected $table = "users";
    /** @var string La PK. */
    protected $primaryKey = 'id_user';

    protected $dates = ['fecha_nac',];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    /*protected $fillable = [
        'nombre', 'email', 'password',
    ];*/

    /** @var array La lista de campos que se pueden cargar masivamente. */
    protected $fillable = ['nombre','apellido','fecha_nac','email', 'password', 'avatar','es_admin','brinda_servicio','puntaje','ubicacion_lat','ubicacion_long','ip','id_ciudad','id_genero'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public static $rulesLogin = [
        'email' => 'required|email',
        'password' => 'required|min:6'
    ];

    /** @var array Las reglas de validación en la creación. */
    public static $rules = [
        'nombre' => 'required|min:3',
        'apellido' => 'required|min:3',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:6',
        'fecha_nac' => 'required',
        'id_ciudad' => 'required|integer|exists:ciudades',
        'id_genero' => 'required|integer|exists:generos'
    ];

    /** @var array Las reglas de validación en la edición. */
    public static $rulesEdicion = [
        'nombre' => 'required|min:3',
        'apellido' => 'required|min:3',
        'email' => 'required|email|unique:users',
        'fecha_nac' => 'required',
        'id_ciudad' => 'required|integer|exists:ciudades',
        'id_genero' => 'required|integer|exists:generos'
    ];

    /** @var array La regla de validación Password. */
    public static $rulePassword = [
        'password' => 'required|min:6'
    ];

    /** @var array Los mensajes de error de las $rulesEdicion en la edición del usuario */
    public static $errorMessagesLogin = [
        'email.required' => 'El email del usuario debe tener un valor.',
        'email.email' => 'El email del usuario debe tener formato email',
        'password.required' => 'La password del usuario debe tener un valor.',
        'password.min' => 'La password del usuario debe tener al menos :min caracteres.'
    ];

    /** @var array Los mensajes de error de las $rulePassword */
    public static $errorMessagesPassword = [
        'password.required' => 'La password del usuario debe tener un valor.',
        'password.min' => 'La password del usuario debe tener al menos :min caracteres.'
    ];

    /** @var array Los mensajes de error de las $rules en la creación del usuario */
    public static $errorMessages = [
        'nombre.required' => 'El nombre del usuario debe tener un valor.',
        'nombre.min' => 'El nombre del usuario debe tener al menos :min caracteres.',
        'apellido.required' => 'El apellido del usuario debe tener un valor.',
        'apellido.min' => 'El apellido del usuario debe tener al menos :min caracteres.',
        'email.required' => 'El email del usuario debe tener un valor.',
        'email.email' => 'El email del usuario debe tener formato email',
        'password.required' => 'La password del usuario debe tener un valor.',
        'password.min' => 'La password del usuario debe tener al menos :min caracteres.',
        'fecha_nac.required' => 'La fecha de nacimiento debe tener un valor.',
        'id_ciudad.required' => 'El usuario debe tener una ciudad.',
        'id_ciudad.integer' => 'La ciudad debe ser un número.',
        'id_ciudad.exists' => 'La ciudad seleccionada no existe.',
        'id_genero.required' => 'El usuario debe tener un género.',
        'id_genero.integer' => 'El género debe ser un número.',
        'id_genero.exists' => 'El género seleccionada no existe.'
    ];

    /** @var array Los mensajes de error de las $rulesEdicion en la edición del usuario */
    public static $errorMessagesEdicion = [
        'nombre.required' => 'El nombre del usuario debe tener un valor.',
        'nombre.min' => 'El nombre del usuario debe tener al menos :min caracteres.',
        'apellido.required' => 'El apellido del usuario debe tener un valor.',
        'apellido.min' => 'El apellido del usuario debe tener al menos :min caracteres.',
        'email.required' => 'El email del usuario debe tener un valor.',
        'email.email' => 'El email del usuario debe tener formato email',
        'fecha_nac.required' => 'La fecha de nacimiento debe tener un valor.',
        'id_ciudad.required' => 'El usuario debe tener una ciudad.',
        'id_ciudad.integer' => 'La ciudad debe ser un número.',
        'id_ciudad.exists' => 'La ciudad seleccionada no existe.',
        'id_genero.required' => 'El usuario debe tener un género.',
        'id_genero.integer' => 'El género debe ser un número.',
        'id_genero.exists' => 'El género seleccionada no existe.'
    ];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function comentarios()
    {
        // relación inversa del 1 a muchos
        return $this->hasMany(Comentario::class, 'id_user', 'id_user');
    }
}
