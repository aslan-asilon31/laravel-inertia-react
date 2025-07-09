// ProductFilterForm.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProductFilterForm = ({ filters, setFilters }) => {
  const { data, setData } = useForm({
    search: filters.search || "",
    availability: filters.availability || "",
    selling_price: filters.selling_price || "",
    image_url: filters.image_url || "",
    created_by: filters.created_by || "",
    updated_by: filters.updated_by || "",
    is_activated: filters.is_activated || "",
    created_at: filters.created_at || "",
    updated_at: filters.updated_at || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters(data); // Update filters in the parent component
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Product Name Filter */}
      <div className="flex flex-col">
        <Label htmlFor="search" className="block text-sm font-medium text-gray-700">
          Product Name
        </Label>
        <Input
          id="search"
          value={data.search}
          onChange={(e) => setData("search", e.target.value)}
          placeholder="Search by name"
          className="mt-2 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Availability Filter */}
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
          <option value="">All</option>
          <option value="in-stock">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>

      {/* Selling Price Filter */}
      <div className="flex flex-col">
        <Label htmlFor="selling_price" className="block text-sm font-medium text-gray-700">
          Selling Price
        </Label>
        <Input
          id="selling_price"
          value={data.selling_price}
          onChange={(e) => setData("selling_price", e.target.value)}
          placeholder="Search by selling price"
          className="mt-2 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Image URL Filter */}
      <div className="flex flex-col">
        <Label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
          Image URL
        </Label>
        <Input
          id="image_url"
          value={data.image_url}
          onChange={(e) => setData("image_url", e.target.value)}
          placeholder="Search by image URL"
          className="mt-2 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Submit Button */}
      <div className="col-span-2 mt-6">
        <Button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2">
          Apply Filters
        </Button>
      </div>
    </form>
  );
};

export default ProductFilterForm;
