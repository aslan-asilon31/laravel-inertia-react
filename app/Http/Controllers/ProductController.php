<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\ProductRequest;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        if ($availability = $request->input('availability')) {
            $query->where('availability', $availability);
        }

        if ($sellingPrice = $request->input('selling_price')) {
            $query->where('selling_price', 'like', "%{$sellingPrice}%");
        }


        $products = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('products/index', [
            'products' => $products,
            'filters' => $request->only([
                'search',
                'availability',
                'selling_price',
                'image_url',
                'created_by',
                'updated_by',
                'created_at',
                'updated_at',
                'is_activated',
            ]),
        ]);
    }


    public function create()
    {
        $productCategories = \App\Models\ProductCategoryFirst::all();

        return Inertia::render('products/create', [
            'productCategories' => $productCategories,
        ]);
    }

    public function store(ProductRequest $request)
    {

        $validated = $request->validated();

        $validated['id'] = (string) \Str::uuid();
        $validated['created_by'] = auth()->user() ? auth()->user()->id : null;
        $validated['updated_by'] = auth()->user() ? auth()->user()->id : null;

        Product::create($validated);

        return redirect()->route('products.index')->with('success', 'Product created successfully!');
    }

    public function show(Product $product)
    {
        return Inertia::render('products/show', [
            'product' => $product,
        ]);
    }

    public function edit(Product $product)
    {
        return Inertia::render('products/edit', [
            'product' => $product,
        ]);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $validated = $request->validated();

        $product->update($validated);

        return redirect()->route('products.index')->with('success', 'Product updated successfully!');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully!');
    }
}
