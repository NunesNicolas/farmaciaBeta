<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\SwaggerController;

Route::get('/', function () {
    return ['Laravel' => \app()->version()];
});

Route::get('/swagger/openapi.json', function () {
    $filePath = base_path('swagger/openapi.json');
    if (File::exists($filePath)) {
        return Response::file($filePath, [
            'Content-Type' => 'application/json'
        ]);
    }
    return Response::json(['error' => 'OpenAPI specification not found'], 404);
});

// Route for Swagger UI documentation
Route::get('/api-docs', [SwaggerController::class, 'index']);


