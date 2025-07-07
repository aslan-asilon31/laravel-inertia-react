<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; // Set this to false if you need authorization checks.
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'product_category_first_id' => 'required|uuid', // Ensure it's a valid UUID
            'name' => 'required|string|max:255',
            'selling_price' => 'required|numeric|min:0', // Ensure price is a valid number and non-negative
            'availability' => 'required|in:in-stock,out-of-stock', // Must be either 'in-stock' or 'out-of-stock'
            'image_url' => 'required|url', // Ensure the image_url is a valid URL
            'is_activated' => 'required|boolean', // Ensure the is_activated is a boolean value
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'product_category_first_id.required' => 'Product category is required.',
            'name.required' => 'Product name is required.',
            'selling_price.required' => 'Selling price is required.',
            'availability.required' => 'Availability status is required.',
            'image_url.required' => 'Image URL is required.',
            'is_activated.required' => 'Activation status is required.',
        ];
    }
}
