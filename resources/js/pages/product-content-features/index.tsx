"use client";

import React, { useState, useRef } from "react";
import { useForm, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { Inertia } from '@inertiajs/inertia';
import { ChevronRightIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetFooter,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Head } from "@inertiajs/react";
import Container from "@/components/container";
import Swal from "sweetalert2";
import { type BreadcrumbItem } from '@/types';

const ProductContentFeatureIndex = ({ product_content_features }) => {

  const { data, setData, post, processing, errors } = useForm({
    search: product_content_features.search || "",
    product_content_id: product_content_features.product_content_id || "",
    name: product_content_features.name || "",
    description: product_content_features.description || "",
    image_url: product_content_features.image_url || "",
    created_by: product_content_features.created_by || "",
    updated_by: product_content_features.updated_by || "",
    is_activated: product_content_features.is_activated || "",
    created_at: product_content_features.created_at || "",
    updated_at: product_content_features.updated_at || "",
  });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: `Product Content Display`,
      href: '/product-content-features',
    },
  ];

  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const updateFilter = () => {
    Inertia.get(route("product-content-features.index"), { ...data }, {
      preserveState: true,  
      replace: true,       
    });
  };

  const submit = (e) => {
    e.preventDefault();
    Inertia.get(route("product-content-displays.index"), data);
  };

  const handleDelete = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.delete(route("product-content-features.destroy", productId), {
          onSuccess: () => {
            Swal.fire("Deleted!", "Your product content display has been deleted.", "success");
          },
          onError: () => {
            Swal.fire("Error", "Something went wrong, please try again.", "error");
          },
        });
      }
    });
  };

  const getStatusClass = (isActive, createdAt) => {
    const today = new Date().toISOString().split("T")[0]; 
    const createdDate = new Date(createdAt).toISOString().split("T")[0]; 
    return isActive && createdDate === today ? "text-green-500" : "";
  };

  const handleClose = () => {
  // Reset form data
  setData({
    search: "",
    product_content_id: "",
    name: "",
    image_url: "",
    created_by: "",
    updated_by: "",
    is_activated: "",
    created_at: "",
    updated_at: "",
  });

  // Menutup modal sheet
  setIsSheetOpen(false); 
};


  const formatDateTime = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, 
    };
    return new Date(date).toLocaleString("en-GB", options).replace(",", "");
  };

  return (
    <div>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <Card>
          <CardHeader>
            <CardTitle>Product Content Feature Page</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <Container>
            <div className="m-2 flex items-center justify-between gap-4">
              <Button onClick={() => setIsSheetOpen(!isSheetOpen)} className="mb-4">Advanced Search</Button>
              <Button onClick={() => window.location.href = route('product-content-displays.create')}>Create Product Content Feature</Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
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
                {Array.isArray(product_content_features) && product_content_features?.length > 0 ? (
                  product_content_features.map((feature, index) => (
                    <TableRow key={feature.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{feature.name}</TableCell>
                      <TableCell>{feature.description || 'No Description'}</TableCell>
                      <TableCell>{feature.image_url || 'No Image'}</TableCell>
                      <TableCell>{feature.created_by || 'Unknown'}</TableCell>
                      <TableCell>{feature.updated_by || 'Unknown'}</TableCell>
                      <TableCell>{formatDateTime(feature.created_at)}</TableCell>
                      <TableCell>{formatDateTime(feature.updated_at)}</TableCell>
                      <TableCell className={getStatusClass(feature.is_activated, feature.created_at)}>
                        {feature.is_activated ? 'Active' : 'Inactive'}
                      </TableCell>
                      <TableCell className="relative">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline"><ChevronRightIcon /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuGroup>
                              <DropdownMenuItem>
                                <Link href={route('product-content/product-content-features/edit', feature.id)} passHref>
                                  <Button variant="outline">Edit</Button>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Button variant="outline" onClick={() => handleDelete(feature.id)}>
                                  Delete
                                </Button>
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10}>No features available</td>
                  </tr>
                )}
              </TableBody>
            </Table>
          </Container>
        </Card>

        <Sheet open={isSheetOpen} onOpenChange={() => setIsSheetOpen(!isSheetOpen)}>
          <SheetContent className="overflow-y-auto max-h-[190vh]">
            <SheetHeader>
              <SheetTitle>Advanced Search</SheetTitle>
              <SheetDescription>Filter product content features by various criteria.</SheetDescription>
            </SheetHeader>

            <form onSubmit={submit}>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <div className="grid gap-3">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input
                    id="product-name"
                    value={data.search}
                    onChange={(e) => setData("search", e.target.value)}
                    placeholder="Search by name"
                  />
                  {errors.search && <div className="text-red-500">{errors.search}</div>}
                </div>

                {/* Additional filters can go here */}

              </div>

              <SheetFooter>
                <Button type="submit" disabled={processing}>Search</Button>
                <Button onClick={handleClose} variant="outline">Close</Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ProductContentFeatureIndex;
