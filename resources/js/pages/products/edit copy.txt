"use client";

import React, { useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Head } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";

const EditProduct = ({ product }) => {
  const { data, setData,  processing, errors } = useForm({
    product_category_first_id: product.product_category_first_id || "",
    name: product.name || "",
    availability: product.availability || "",
    selling_price: product.selling_price || "",
    image_url: product.image_url || "",
    is_activated: product.is_activated || false,
  });

  useEffect(() => {
    setData({
      product_category_first_id: product.product_category_first_id || "",
      name: product.name || "",
      availability: product.availability || "",
      selling_price: product.selling_price || "",
      image_url: product.image_url || "",
      is_activated: product.is_activated || false,
    });
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();

    Inertia.put(route("products.update", product.id), {
      product_category_first_id: data.product_category_first_id,
      name: data.name,
      selling_price: data.selling_price,
      availability: data.availability,
      image_url: data.image_url,
      is_activated: data.is_activated,
    });
  };

  return (
    <AppLayout breadcrumbs={[{ title: "Edit Product", href: "/products/edit" }]}>
      <Head title="Edit Product" />
      <div className="flex flex-col gap-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Edit Product</CardTitle>
          </CardHeader>
        </Card>

        <Card className="p-6 bg-white shadow-md rounded-lg">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="flex flex-col">
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name
              </Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                placeholder="Enter product name"
                className="mt-2 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.name && <div className="text-red-500">{errors.name}</div>}
            </div>

            {/* Selling Price */}
            <div className="flex flex-col">
              <Label htmlFor="selling_price" className="block text-sm font-medium text-gray-700">
                Selling Price
              </Label>
              <Input
                id="selling_price"
                type="number"
                value={data.selling_price}
                onChange={(e) => setData("selling_price", e.target.value)}
                placeholder="Enter selling price"
                className="mt-2 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.selling_price && <div className="text-red-500">{errors.selling_price}</div>}
            </div>

            {/* Availability */}
            <div className="flex flex-col">
              <Label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                Availability
              </Label>
              <select
                id="availability"
                value={data.availability}
                onChange={(e) => setData("availability", e.target.value)}
                className="mt-2 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="in-stock">In Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
              {errors.availability && <div className="text-red-500">{errors.availability}</div>}
            </div>

            {/* Image URL */}
            <div className="flex flex-col">
              <Label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
                Image URL
              </Label>
              <Input
                id="image_url"
                value={data.image_url}
                onChange={(e) => setData("image_url", e.target.value)}
                placeholder="Enter image URL"
                className="mt-2 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.image_url && <div className="text-red-500">{errors.image_url}</div>}
            </div>

            {/* Is Activated */}
            <div className="flex flex-col">
              <Label htmlFor="is_activated" className="block text-sm font-medium text-gray-700">
                Is Activated
              </Label>
              <input
                type="checkbox"
                id="is_activated"
                checked={data.is_activated}
                onChange={(e) => setData("is_activated", e.target.checked)}
                className="mt-2 h-4 w-4"
              />
              {errors.is_activated && <div className="text-red-500">{errors.is_activated}</div>}
            </div>

            {/* Submit Button */}
            <div className="col-span-2 mt-6">
              <Button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2" disabled={processing}>
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
};

export default EditProduct;
