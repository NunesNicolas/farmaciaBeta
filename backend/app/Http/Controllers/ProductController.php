<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\product as ProductModel;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = ProductModel::query();

        if ($request->has('category')) {
            $query->where('category', $request->input('category'));
        }

        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->input('min_price'));
        }

        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->input('max_price'));
        }

        $perPage = $request->input('perPage', 10);
        $products = $query->paginate($perPage);
        
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
