<?php

use App\Http\Middleware\Cors;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
        $middleware->append(Cors::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {

        // General exception handler

        $exceptions->render(function (\Throwable $exception, $request) {
            // dd($exception); // Log the exception for debugging purposes
            $data = [
                'result' => 'error',
                'message' => $exception->getMessage() ?? 'Error interno del servidor',
            ];
            $code = 500;

            switch (class_basename($exception)) {
                case 'AuthenticationException':
                    $code = 401;
                    $data['message'] = 'Unauthenticated';
                    break;
                case 'RouteNotFoundException':
                case 'NotFoundHttpException':
                case 'ModelNotFoundException':
                    $code = 404;
                    $data['message'] = 'Elemento no encontrado';
                    break;
                case 'AccessDeniedHttpException':
                    $code = 403;
                    $data['message'] = 'Prohibido – Usted no tiene permiso para acceder a este servidor';
                    break;
                case 'ValidationException':
                    $code = $exception->status ?? 422;
                    $data['message'] = 'Datos inválidos.';
                    $data['errors'] = method_exists($exception, 'errors') ? $exception->errors() : [];
                    break;
                case 'HttpException':
                    $code = method_exists($exception, 'getStatusCode') ? $exception->getStatusCode() : 500;
                    break;
            }

            return response()->json($data, $code);
        });
    })->create();
