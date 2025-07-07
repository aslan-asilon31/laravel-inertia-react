<?php

namespace App\Http\Controllers;

use App\Models\ProductContentDisplay;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\ProductRequest;

class ProductContentDisplayController extends Controller
{
    public function index(Request $request)
    {
        // Query initialization
        $query = ProductContentDisplay::query();

        // Filtering based on provided request parameters
        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        if ($availability = $request->input('availability')) {
            $query->where('availability', $availability);
        }

        if ($sellingPrice = $request->input('selling_price')) {
            $query->where('selling_price', 'like', "%{$sellingPrice}%");
        }

        if ($created_by = $request->input('created_by')) {
            $query->where('created_by', 'like', "%{$created_by}%");
        }

        if ($updated_by = $request->input('updated_by')) {
            $query->where('updated_by', 'like', "%{$updated_by}%");
        }

        $products = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('product-content-displays/index', [
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

        return Inertia::render('product-content-displays/create', [
            'productCategories' => $productCategories,
        ]);
    }

    public function store(ProductRequest $request)
    {
        // Validate the incoming request using ProductRequest
        $validated = $request->validated();

        // Add additional data fields for product creation
        $validated['id'] = (string) \Str::uuid(); // UUID for product content display
        $validated['created_by'] = auth()->user() ? auth()->user()->id : null;
        $validated['updated_by'] = auth()->user() ? auth()->user()->id : null;

        // Create the product content display
        ProductContentDisplay::create($validated);

        return redirect()->route('products.index')->with('success', 'Product content display created successfully!');
    }

    public function show(ProductContentDisplay $productContentDisplay)
    {
        return Inertia::render('product-content-displays/show', [
            'productContentDisplay' => $productContentDisplay,
        ]);
    }

    public function edit(ProductContentDisplay $productContentDisplay)
    {
        return Inertia::render('product-content-displays/edit', [
            'productContentDisplay' => $productContentDisplay,
        ]);
    }

    public function update(ProductRequest $request, ProductContentDisplay $productContentDisplay)
    {
        // Validate the incoming request using ProductRequest
        $validated = $request->validated();

        // Update the product content display
        $productContentDisplay->update($validated);

        return redirect()->route('products.index')->with('success', 'Product content display updated successfully!');
    }

    public function destroy(ProductContentDisplay $productContentDisplay)
    {
        $productContentDisplay->delete();

        return redirect()->route('products.index')->with('success', 'Product content display deleted successfully!');
    }
}
