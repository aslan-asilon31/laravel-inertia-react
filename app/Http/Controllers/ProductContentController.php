<?php

namespace App\Http\Controllers;

use App\Models\ProductContent;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProductContentController extends Controller
{
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
        // Validate the incoming request data
        $validated = $request->validate([
            'product_id' => 'required|uuid|exists:products,id', // Ensure valid product ID
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'url' => 'required|url|unique:product_contents,url', // Ensure URL is unique
            'image_url' => 'nullable|url', // Optional image URL
            'is_activated' => 'boolean', // Whether the content is activated
        ]);

        // Add created_by and updated_by if the user is authenticated
        $validated['created_by'] = auth()->user() ? auth()->user()->id : null;
        $validated['updated_by'] = auth()->user() ? auth()->user()->id : null;

        // Create the new product content
        ProductContent::create($validated);

        return redirect()->route('product_contents.index')->with('success', 'Product content created successfully!');
    }

    public function edit(ProductContent $productContent)
    {
        return Inertia::render('ProductContents/Edit', [
            'productContent' => $productContent,
        ]);
    }

    public function update(Request $request, ProductContent $productContent)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'url' => 'required|url|unique:product_contents,url,' . $productContent->id, // Unique except for current product content
            'image_url' => 'nullable|url',
            'is_activated' => 'boolean', // Whether the content is activated
        ]);

        // Update the product content
        $productContent->update($validated);

        return redirect()->route('product_contents.index')->with('success', 'Product content updated successfully!');
    }

    public function destroy(ProductContent $productContent)
    {
        // Delete the product content
        $productContent->delete();

        return redirect()->route('product_contents.index')->with('success', 'Product content deleted successfully!');
    }
}
