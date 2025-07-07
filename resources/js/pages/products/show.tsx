"use client";

import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Head } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ShowProduct = ({ product }) => {
  const [name, setName] = useState(product.name); 
  const [sellingPrice, setSellingPrice] = useState(product.selling_price);
  const [availability, setAvailability] = useState(product.availability);
  const [imageUrl, setImageUrl] = useState(product.image_url); 
  const [isActivated, setIsActivated] = useState(product.is_activated);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send PUT request using Inertia
    Inertia.put(route("products.update", product.id), {
      name,
      selling_price: sellingPrice,
      availability,
      image_url: imageUrl,
      is_activated: isActivated,
    });
  };

  return (
    <AppLayout breadcrumbs={[{ title: "Show Product", href: "/products/show" }]}>
      <Head title="Show Product" />
      <div className="flex flex-col gap-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Show Product</CardTitle>
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
                value={name}
                readOnly
                className="mt-2 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Selling Price */}
            <div className="flex flex-col">
              <Label htmlFor="selling_price" className="block text-sm font-medium text-gray-700">
                Selling Price
              </Label>
              <Input
                id="selling_price"
                type="number"
                value={sellingPrice}
                readOnly
                className="mt-2 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Availability */}
            <div className="flex flex-col">
              <Label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                Availability
              </Label>
              <select
                id="availability"
                value={availability}
                disabled
                className="mt-2 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="in-stock">In Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>

            {/* Image URL */}
            <div className="flex flex-col">
              <Label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
                Image URL
              </Label>
              <Input
                id="image_url"
                value={imageUrl}
                readOnly
                className="mt-2 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="is_activated" className="block text-sm font-medium text-gray-700">
                Is Activated
              </Label>
              <input
                type="checkbox"
                id="is_activated"
                checked={isActivated}
                disabled
                className="mt-2 h-4 w-4"
              />
            </div>

            <div className="col-span-2 mt-6">
              <Button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2" disabled>
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ShowProduct;
