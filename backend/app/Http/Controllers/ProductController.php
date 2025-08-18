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

    public function create(Request $request)
    {
        $product = product::create($request->all());
        return response()->json($product);
    }

    public function store(Request $request)
    {

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
