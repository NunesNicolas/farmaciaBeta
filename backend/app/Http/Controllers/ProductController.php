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

        // Processar imagem base64 de forma simples
        if ($request->has('img') && !empty($request->img)) {
            $img = $request->img;
            
            // Verificar se é base64 válido
            if (preg_match('/^data:image\/(\w+);base64,/', $img, $type)) {
                // Remover prefixo data:image
                $imgData = substr($img, strpos($img, ',') + 1);
                $type = strtolower($type[1]);
                
                // Verificar tipo de imagem
                if (!in_array($type, ['jpg', 'jpeg', 'png', 'gif'])) {
                    return response()->json(['error' => 'Tipo de imagem inválido. Use JPG, PNG ou GIF.'], 400);
                }
                
                // Decodificar base64
                $decodedImg = base64_decode($imgData);
                if ($decodedImg === false) {
                    return response()->json(['error' => 'Imagem inválida'], 400);
                }
                
                // Verificar tamanho (máximo 1MB para base64)
                if (strlen($decodedImg) > 1 * 1024 * 1024) {
                    // Simplesmente truncar a string base64 para caber no banco
                    $img = substr($img, 0, 1000000); // Limite de ~1MB
                }
                
                $validated['img'] = $img;
            } else {
                // Se não for base64, armazenar como está
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
