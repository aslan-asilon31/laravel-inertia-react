import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProductCrudForm = ({ product = {}, productCategories, onSubmit, processing, errors }) => {

  const { data, setData } = useForm({
    product_category_first_id: product.product_category_first_id || "",
    name: product.name || "",
    availability: product.availability || "",
    selling_price: product.selling_price || 0,
    image_url: product.image_url || "",
    is_activated: product.is_activated || false,
  });

useEffect(() => {
  if (product && product.id !== data.id) {
    setData({
      product_category_first_id: product.product_category_first_id || "",
      name: product.name || "",
      availability: product.availability || "",
      selling_price: product.selling_price || "",
      image_url: product.image_url || "",
      is_activated: product.is_activated || false,
    });
  }
}, [product]); 


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data); 
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col">
        <Label htmlFor="product_category_first_id" className="block text-sm font-medium text-gray-700">
          Product Category
        </Label>
        <select
          id="product_category_first_id"
          value={data.product_category_first_id}
          onChange={(e) => setData("product_category_first_id", e.target.value)}
          className="mt-2 block w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Select Category</option>
          {productCategories && productCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors?.product_category_first_id && (
          <div className="mt-2 text-red-500 text-sm">{errors.product_category_first_id}</div>
        )}
      </div>

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
        {errors?.name && <div className="mt-2 text-red-500 text-sm">{errors.name}</div>}
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
        {errors?.selling_price && <div className="mt-2 text-red-500 text-sm">{errors.selling_price}</div>}
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
          <option value="">Select Availability</option>
          <option value="in-stock">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
        {errors?.availability && <div className="mt-2 text-red-500 text-sm">{errors.availability}</div>}
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
        {errors?.image_url && <div className="mt-2 text-red-500 text-sm">{errors.image_url}</div>}
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
        {errors?.is_activated && <div className="mt-2 text-red-500 text-sm">{errors.is_activated}</div>}
      </div>

      <div className="col-span-2 mt-6">
        <Button type="submit" disabled={processing} className="w-full bg-blue-500 text-white rounded-md py-2">
          {product.id ? "Save Changes" : "Create Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductCrudForm;
