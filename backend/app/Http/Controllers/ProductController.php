<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\product as ProductModel;

class ProductController extends Controller
{
    public function index()
    {
          $products = ProductModel::paginate(10);
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

        $product = ProductModel::create($validated);
        return response()->json($product, 201);
    }
    
    public function show($id)
    {
        $product = ProductModel::findOrFail($id);
        return response()->json($product);
    }
    
    public function update(Request $request, $id)
    {
        $product = ProductModel::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'category' => 'required|string|max:255',
            'img' => 'nullable|string',
        ]);

        $product->update($validated);
        return response()->json($product);
    }
    
    public function destroy($id)
    {
        $product = ProductModel::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Produto deletado com sucesso.'], 200);
    }
}
