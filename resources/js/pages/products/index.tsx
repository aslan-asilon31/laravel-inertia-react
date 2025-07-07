"use client";

import React, { useState, useRef } from "react";
import { useForm,Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { Inertia } from '@inertiajs/inertia';
import Search from "@/components/search";
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
import { ChevronRightIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Head } from "@inertiajs/react";
import Container from "@/components/container";
import Pagination from "@/components/pagination";
import Swal from "sweetalert2";
import { type BreadcrumbItem } from '@/types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const ProductIndex = ({ products, filters }) => {
  const { data, setData, post, processing, errors } = useForm({
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



  const breadcrumbs: BreadcrumbItem[] = [
      {
          title: `Product`,
          href: '/product',
      },
  ];


  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const timeoutRef = useRef(null);

const updateFilter = () => {
  Inertia.get(route("products.index"), { ...data }, {
    preserveState: true,  
    replace: true,       
  });
};

  const submit = (e) => {
    e.preventDefault();
    Inertia.get(route("products.index"), data);
  };

  const goToPage = (page) => {
    post(route("products.index"), { ...data, page }, {
      preserveState: true,
      replace: true,
    });
  };

  const toggleDropdown = (productId) => {
    setOpenDropdown(openDropdown === productId ? null : productId);
  };

  const toggleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  const handleClose = () => {
    setData({
      search: "",
      availability: "",
      selling_price: "",
      image_url: "",
      created_by: "",
      updated_by: "",
      is_activated: "",
      created_at: "",
      updated_at: "",
    });
    toggleSheet(); 
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
        Inertia.delete(route("products.destroy", productId), {
          onSuccess: () => {
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
          },
          onError: () => {
            Swal.fire("Error", "Something went wrong, please try again.", "error");
          },
        });
      }
    });
  };



  const getStatusClass = (isActive, createdAt) => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in 'YYYY-MM-DD' format
    const createdDate = new Date(createdAt).toISOString().split("T")[0]; // Format the createdAt date

    // If it's active and the created date is today, return green color class
    if (isActive && createdDate === today) {
      return "text-green-500"; // Green color
    }

    return ""; // No additional color
  };


  const formatDateTime = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Use 24-hour format
    };

    return new Date(date).toLocaleString("en-GB", options).replace(",", "");
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <Card>
            <CardHeader>
                <CardTitle> Product Page</CardTitle>
            </CardHeader>
        </Card>

        <Card>
            <Container>
              <div className="m-2 flex items-center justify-between gap-4">
                <Button onClick={toggleSheet} className="mb-4">
                  Advanced Search
                </Button>
                <Button onClick={() => window.location.href = route('products.create')}>Create Product</Button>
            
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Nama Produk</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Ketersediaan</TableHead>
                    <TableHead>Image URL</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Updated By</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Updated At</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.data.map((product, index) => (
                    <TableRow key={product.id}>
                      <TableCell>{++index + (products.current_page-1) * products.per_page}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>Rp {product.selling_price}</TableCell>
                      <TableCell>{product.availability}</TableCell>
                      <TableCell>{product.image_url}</TableCell>
                      <TableCell>{product.created_by}</TableCell>
                      <TableCell>{product.updated_by}</TableCell>
                      <TableCell>{formatDateTime(product.created_at)}</TableCell>
                      <TableCell>{formatDateTime(product.updated_at)}</TableCell>
                      <TableCell className={getStatusClass(product.is_activated, product.created_at)}>{product.is_activated ? "Active" : "Inactive"}</TableCell>
                      <TableCell className="relative">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline"><ChevronRightIcon /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuGroup>
                              <DropdownMenuItem>
                                  <Link href={route('products.edit', product.id)} passHref>
                                    <Button variant="outline">Edit</Button>
                                  </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                  <Link href={route('products.show', product.id)} passHref>
                                    <Button variant="outline">Show</Button>
                                  </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                  <Button
                                    variant="outline"
                                    onClick={() => handleDelete(product.id)} 
                                  >
                                    Delete
                                  </Button>
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Container>
        </Card>

        <div className='flex items-center justify-center'>
            <div className="flex items-center justify-center">
              {products.last_page !== 1 && <Pagination links={products.links} />}
            </div>

            <div className="flex justify-center mt-4">
              {products.links.prev && (
                <Button onClick={() => goToPage(products.links.prev.page)} className="px-4 py-2 border rounded-md">
                  Previous
                </Button>
              )}
              {products.links.next && (
                <Button onClick={() => goToPage(products.links.next.page)} className="px-4 py-2 border rounded-md ml-2">
                  Next
                </Button>
              )}
            </div>
        </div>

        <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
          <SheetContent className="overflow-y-auto max-h-[190vh]">
            <SheetHeader>
              <SheetTitle>Advanced Search</SheetTitle>
              <SheetDescription>
                Filter products by various criteria.
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={submit}>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                {/* Product Name Filter */}
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

                {/* Availability Filter */}
                <div className="grid gap-3">
                  <Label htmlFor="availability">Availability</Label>
                  <select
                    id="availability"
                    value={data.availability}
                    onChange={(e) => setData("availability", e.target.value)}
                    className="border p-2 rounded-md"
                  >
                    <option value="">All</option>
                    <option value="in-stock">In Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                  {errors.availability && <div className="text-red-500">{errors.availability}</div>}
                </div>

                {/* Selling Price Filter */}
                <div className="grid gap-3">
                  <Label htmlFor="selling_price">Selling Price</Label>
                  <Input
                    id="selling_price"
                    value={data.selling_price}
                    onChange={(e) => setData("selling_price", e.target.value)}
                    placeholder="Search by Selling Price"
                  />
                  {errors.selling_price && <div className="text-red-500">{errors.selling_price}</div>}
                </div>

                {/* Image URL Filter */}
                <div className="grid gap-3">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    value={data.image_url}
                    onChange={(e) => setData("image_url", e.target.value)}
                    placeholder="Search by image URL"
                  />
                  {errors.image_url && <div className="text-red-500">{errors.image_url}</div>}
                </div>

                {/* Created By Filter */}
                <div className="grid gap-3">
                  <Label htmlFor="created_by">Created By</Label>
                  <Input
                    id="created_by"
                    value={data.created_by}
                    onChange={(e) => setData("created_by", e.target.value)}
                    placeholder="Search by created by"
                  />
                </div>

                {/* Updated By Filter */}
                <div className="grid gap-3">
                  <Label htmlFor="updated_by">Updated By</Label>
                  <Input
                    id="updated_by"
                    value={data.updated_by}
                    onChange={(e) => setData("updated_by", e.target.value)}
                    placeholder="Search by updated by"
                  />
                </div>

                {/* Is Activated Filter */}
                <div className="grid gap-3">
                  <Label htmlFor="is_activated">Is Activated</Label>
                  <select
                    id="is_activated"
                    value={data.is_activated}
                    onChange={(e) => setData("is_activated", e.target.value)}
                    className="border p-2 rounded-md"
                  >
                    <option value="">All</option>
                    <option value="1">Activated</option>
                    <option value="0">Not Activated</option>
                  </select>
                </div>

                {/* Created At Filter */}
                <div className="grid gap-3">
                  <Label htmlFor="created_at">Created At</Label>
                  <Input
                    id="created_at"
                    value={data.created_at}
                    onChange={(e) => setData("created_at", e.target.value)}
                    placeholder="Search by created date"
                  />
                </div>

                {/* Updated At Filter */}
                <div className="grid gap-3">
                  <Label htmlFor="updated_at">Updated At</Label>
                  <Input
                    id="updated_at"
                    value={data.updated_at}
                    onChange={(e) => setData("updated_at", e.target.value)}
                    placeholder="Search by updated date"
                  />
                </div>
              </div>

              <SheetFooter>
                <button type="submit" disabled={processing}>Search</button>
                <Button onClick={handleClose} variant="outline">
                  Close
                </Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </AppLayout>
  );
};

export default ProductIndex;
