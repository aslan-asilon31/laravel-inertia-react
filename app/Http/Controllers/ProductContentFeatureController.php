<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductContentFeature;
use Inertia\Inertia;

class ProductContentFeatureController extends Controller
{
    public function index(Request $request)
    {
        $query = ProductContentFeature::query();

        if ($search = $request->input('search')) {
            $query->where('product_content_id', 'like', "%{$search}%");
        }

        if ($name = $request->input('name')) {
            $query->where('name', $name);
        }

        if ($image_url = $request->input('image_url')) {
            $query->where('image_url', $image_url);
        }

        $product_content_features = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('product-content-features/index', [
            'product_content_features' => $product_content_features,
            'filters' => $request->only([
                'search',
                'product_content_id',
                'name',
                'description',
                'image_url',
                'created_by',
                'updated_by',
                'created_at',
                'updated_at',
                'ordinal',
                'is_activated',
            ]),
        ]);
    }
}
