<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\product;

class ProductController extends Controller
{
    public function index()
    {
        $products = product::all();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'category' => 'required|string|max:255',
            'img' => 'nullable|string',
        ]);

        if ($request->has('img') && !empty($request->img)) {
            $img = $request->img;
            
            if (preg_match('/^data:image\/(\w+);base64,/', $img, $type)) {
                $imgData = substr($img, strpos($img, ',') + 1);
                $type = strtolower($type[1]);
                
                if (!in_array($type, ['jpg', 'jpeg', 'png', 'gif'])) {
                    return response()->json(['error' => 'Tipo de imagem inválido. Use JPG, PNG ou GIF.'], 400);
                }
                
                $decodedImg = base64_decode($imgData);
                if ($decodedImg === false) {
                    return response()->json(['error' => 'Imagem inválida'], 400);
                }
                
                if (strlen($decodedImg) > 1 * 1024 * 1024) {
                    $img = substr($img, 0, 1000000);
                }
                
                $validated['img'] = $img;
            } else {
                $validated['img'] = $img;
            }
        }

        $product = product::create($validated);
        return response()->json($product, 201);
    }
    
    public function show(product $product)
    {
        return response()->json($product);
    }
    
    public function edit(product $product)
    {
        //
    }
    public function update(Request $request, product $product)
    {
        //
    }
    public function destroy(product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Produto deletado com sucesso.'], 200);
    }
}
