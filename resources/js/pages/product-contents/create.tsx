"use client";

import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { toast } from "sonner";

const ProductContentCreate = () => {
  const { data, setData, post, processing, errors } = useForm({
    product_content_id: "",
    name: "",
    image_url: "",
    is_activated: true,
  });

  const { productContents } = usePage().props; 

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Kirim data produk
      await post(route("product-content-displays.store"), data);
      
      // Menampilkan toast setelah berhasil
      toast.success("Product created successfully", {
        description: "The product has been added to the list.",
      });

      // Navigasi ke halaman Index setelah berhasil
      Inertia.visit(route("product-content-displays.index"));

    } catch (error) {
      // Menampilkan toast jika terjadi error
      toast.error("Product creation failed", {
        description: "Something went wrong, please try again.",
      });
    }

    // post(route("product-content-displays.store"), data);
  };

  return (
    <AppLayout>
      <Head title="Create Product Content Display" />
      <Card>
        <CardHeader>
          <CardTitle>Create Product Content Display</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-6 p-4">
          {/* Product Content ID */}
          <div>
            <Label htmlFor="product_content_id">Product Content</Label>
            <Select
              id="product_content_id"
              value={data.product_content_id}
              onChange={(e) => setData("product_content_id", e.target.value)}
            >
              <option value="">Select Product Content</option>
              {productContents.map((content) => (
                <option key={content.id} value={content.id}>
                  {content.title}
                </option>
              ))}
            </Select>
            {errors.product_content_id && (
              <div className="text-red-500">{errors.product_content_id}</div>
            )}
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              placeholder="Enter the display name"
            />
            {errors.name && <div className="text-red-500">{errors.name}</div>}
          </div>

          {/* Image URL */}
          <div>
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              value={data.image_url}
              onChange={(e) => setData("image_url", e.target.value)}
              placeholder="Enter the image URL"
            />
            {errors.image_url && (
              <div className="text-red-500">{errors.image_url}</div>
            )}
          </div>

          {/* Is Activated */}
          <div>
            <Label htmlFor="is_activated">Is Activated</Label>
            <Select
              id="is_activated"
              value={data.is_activated}
              onChange={(e) => setData("is_activated", e.target.value)}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Select>
            {errors.is_activated && (
              <div className="text-red-500">{errors.is_activated}</div>
            )}
          </div>

          <Button type="submit" disabled={processing}>
            Create Product Content Display
          </Button>
        </form>
      </Card>
    </AppLayout>
  );
};

export default ProductContentCreate;
