"use client";

import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronRightIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react"; // for check mark
import ProductContentFeatureIndex from "@/pages/product-content-features/index";


const ProductContentEdit = ({ productContent, productContentDisplays,productContentFeatures }) => {
  
  const { data, setData, put, processing, errors } = useForm({
    product_id: productContent.product_id,
    title: productContent.title,
    slug: productContent.slug,
    url: productContent.url,
    image_url: productContent.image_url || "",
    is_activated: productContent.is_activated,
  });

  const { products } = usePage().props; // Get available products
  const [open, setOpen] = useState(false); // Handle popover state
  const [value, setValue] = useState(productContent.product_id); // Store selected product ID

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("product-contents.update", productContent.id), data);
  };

  
  return (
    <AppLayout>
      <Head title="Edit Product Content" />
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Edit Product Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="contents">
              <TabsList>
                <TabsTrigger value="contents">Content</TabsTrigger>
                <TabsTrigger value="displays">Display</TabsTrigger>
                <TabsTrigger value="features">Feature</TabsTrigger>
                <TabsTrigger value="marketplaces">Marketplace</TabsTrigger>
                <TabsTrigger value="metas">Meta</TabsTrigger>
              </TabsList>

              {/* Content Tab */}
              <TabsContent value="contents">
                <Card>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6 p-4">
                      {/* Product Content Dropdown */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="product_id">Product</Label>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between"
                              >
                                {value
                                  ? products.find((product) => product.id === value)?.name
                                  : "Select Product"}
                                <ChevronRightIcon className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search product..." className="h-9" />
                                <CommandList>
                                  <CommandEmpty>No product found.</CommandEmpty>
                                  <CommandGroup>
                                    {products.map((product) => (
                                      <CommandItem
                                        key={product.id}
                                        value={product.id}
                                        onSelect={(currentValue) => {
                                          setValue(currentValue);
                                          setOpen(false);
                                          setData("product_id", currentValue);
                                        }}
                                      >
                                        {product.name}
                                        <Check
                                          className={`ml-auto ${value === product.id ? "opacity-100" : "opacity-0"}`}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          {errors.product_id && <div className="text-red-500">{errors.product_id}</div>}
                        </div>

                        {/* Title */}
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            placeholder="Enter the display title"
                          />
                          {errors.title && <div className="text-red-500">{errors.title}</div>}
                        </div>

                        {/* Slug */}
                        <div>
                          <Label htmlFor="slug">Slug</Label>
                          <Input
                            id="slug"
                            value={data.slug}
                            onChange={(e) => setData("slug", e.target.value)}
                            placeholder="Enter the display slug"
                          />
                          {errors.slug && <div className="text-red-500">{errors.slug}</div>}
                        </div>

                        {/* URL */}
                        <div>
                          <Label htmlFor="url">URL</Label>
                          <Input
                            id="url"
                            value={data.url}
                            onChange={(e) => setData("url", e.target.value)}
                            placeholder="Enter the display URL"
                          />
                          {errors.url && <div className="text-red-500">{errors.url}</div>}
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
                          {errors.image_url && <div className="text-red-500">{errors.image_url}</div>}
                        </div>

                        {/* Is Activated */}
                        <div>
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
                      </div>

                      <Button type="submit" disabled={processing}>
                        Update Product Content
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Displays Tab */}
              <TabsContent value="displays">
                <Card>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>No</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Image URL</TableHead>
                          <TableHead>Created By</TableHead>
                          <TableHead>Updated By</TableHead>
                          <TableHead>Created At</TableHead>
                          <TableHead>Updated At</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {productContentDisplays.map((productContentDisplay, index) => (
                          <TableRow key={productContentDisplay.id}>
                            <TableCell>{++index}</TableCell>
                            <TableCell>{productContentDisplay.title}</TableCell>
                            <TableCell>{productContentDisplay.image_url}</TableCell>
                            <TableCell>{productContentDisplay.created_by}</TableCell>
                            <TableCell>{productContentDisplay.updated_by}</TableCell>
                            <TableCell>{productContentDisplay.created_at}</TableCell>
                            <TableCell>{productContentDisplay.updated_at}</TableCell>
                            <TableCell>
                              {productContentDisplay.is_activated ? "Active" : "Inactive"}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline">
                                    <ChevronRightIcon />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="start">
                                  <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                      <Link href={route('product-contents.edit', productContentDisplay.id)}>
                                        <Button variant="outline">Edit</Button>
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Button variant="outline" onClick={() => handleDelete(productContentDisplay.id)}>
                                        Delete
                                      </Button>
                                    </DropdownMenuItem>
                                  </DropdownMenuGroup>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Feature, Marketplace, and Meta Tabs */}
              <TabsContent value="features">
                     <ProductContentFeatureIndex product_content_features={productContentFeatures} filters={{}} />
              </TabsContent>
              <TabsContent value="marketplaces">
                <Card>
                  <CardContent>Marketplaces</CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="metas">
                <Card>
                  <CardContent>Meta</CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ProductContentEdit;
