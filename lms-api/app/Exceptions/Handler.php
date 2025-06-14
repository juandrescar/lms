<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    public function register(): void
    {
        // Manejador general para cualquier excepción
        $this->renderable(function (\Throwable $e, $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => $e->getMessage(),
                    'exception' => class_basename($e),
                    'code' => $e->getCode(),
                ], method_exists($e, 'getStatusCode') ? $e->getStatusCode() : 500);
            }
        });

        // Validaciones
        $this->renderable(function (\Illuminate\Validation\ValidationException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Datos inválidos.',
                    'errors' => $e->errors(),
                ], 422);
            }
        });

        // Model not found
        $this->renderable(function (\Illuminate\Database\Eloquent\ModelNotFoundException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Recurso no encontrado.',
                ], 404);
            }
        });
    }
}
