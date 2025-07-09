<?php

namespace App\Http\Controllers;

use App\Models\ProductContent;
use App\Models\ProductContentFeature;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProductContentController extends Controller
{
    public function __construct() {}

    public function index(Request $request)
    {
        $query = ProductContent::query();

        if ($search = $request->input('search')) {
            $query->where('product_id', 'like', "%{$search}%");
        }

        if ($title = $request->input('title')) {
            $query->where('title', $title);
        }

        if ($slug = $request->input('slug')) {
            $query->where('slug', $slug);
        }

        if ($url = $request->input('url')) {
            $query->where('url', $url);
        }

        if ($image_url = $request->input('image_url')) {
            $query->where('image_url', $image_url);
        }

        $product_contents = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('product-contents/index', [
            'product_contents' => $product_contents,
            'filters' => $request->only([
                'search',
                'product_id',
                'title',
                'slug',
                'url',
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
        return Inertia::render('ProductContents/Create');
    }

    public function store(Request $request)
    {
        $validated['id'] = (string) \Str::uuid();
        $validated['created_by'] = auth()->user() ? auth()->user()->id : null;
        $validated['updated_by'] = auth()->user() ? auth()->user()->id : null;

        $validated = $request->validate([
            'product_id' => 'required|uuid|exists:products,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'url' => 'required|url|unique:product_contents,url',
            'image_url' => 'nullable|url',
            'is_activated' => 'boolean',
        ]);

        // Add created_by and updated_by if the user is authenticated
        $validated['created_by'] = auth()->user() ? auth()->user()->id : null;
        $validated['updated_by'] = auth()->user() ? auth()->user()->id : null;

        // Create the new product content
        ProductContent::create($validated);

        return redirect()->route('product-contents.index')->with('success', 'Product content created successfully!');
    }

    public function edit($id)
    {
        $products = \App\Models\Product::all();
        $productContent = \App\Models\ProductContent::findOrFail($id);
        $productContents = \App\Models\ProductContent::all();
        $productContentDisplays = \App\Models\ProductContentDisplay::where('product_content_id', $productContent->id)->get();
        $productContentFeatures = ProductContentFeature::where('product_content_id', $productContent->id)->get();
        return Inertia::render('product-contents/edit', [
            'products' => $products,
            'productContent' => $productContent,
            'productContents' => $productContents,
            'productContentDisplays' => $productContentDisplays,
            'productContentFeatures' => $productContentFeatures,
        ]);
    }


    public function update(Request $request, $id)
    {
        $productContent = ProductContent::findOrFail($id);
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'image_url' => 'nullable|url',
            'is_activated' => 'nullable|boolean',
        ]);

        $validated['updated_by'] = \Illuminate\Support\Facades\Auth::user()->name;

        $productContent->update($validated);

        return redirect()->route('product-contents.index')->with('success', 'Product content updated successfully!');
    }

    public function destroy(ProductContent $productContent)
    {
        // Delete the product content
        $productContent->delete();

        return redirect()->route('product-contents.index')->with('success', 'Product content deleted successfully!');
    }
}
