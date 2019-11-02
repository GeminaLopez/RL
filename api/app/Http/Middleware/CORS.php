<?php

namespace App\Http\Middleware;

use Closure;

class CORS
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Este middleware simplemente va a agregar los headers para
        // CORS.
        return $next($request)
            ->header('Access-Control-Allow-Origin', 'http://localhost:8100')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Accept, X-Requested-With')
            ->header('Access-Control-Allow-Credentials', 'true');
    }
}
