<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class SwaggerController extends Controller
{
    public function index()
    {
        $swaggerHtml = File::get(public_path('swagger-ui.html'));
        return response($swaggerHtml, 200)->header('Content-Type', 'text/html');
    }
}
