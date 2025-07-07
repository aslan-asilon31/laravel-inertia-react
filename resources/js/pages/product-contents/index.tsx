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
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Head } from "@inertiajs/react";
import Container from "@/components/container";
import Pagination from "@/components/pagination";
import Swal from "sweetalert2";
import { type BreadcrumbItem } from '@/types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Search from "@/components/search";

const ProductContentIndex = ({ product_contents, filters }) => {
  const { data, setData, post, processing, errors } = useForm({
    search: filters.search || "",
    product_id: filters.product_id || "",
    title: filters.title || "",
    created_by: filters.created_by || "",
    updated_by: filters.updated_by || "",
    is_activated: filters.is_activated || "",
    created_at: filters.created_at || "",
    updated_at: filters.updated_at || "",
  });

  const breadcrumbs: BreadcrumbItem[] = [
      {
          title: `Product Content Display`,
          href: '/product-content-displays',
      },
  ];

  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const timeoutRef = useRef(null);

  const updateFilter = () => {
    Inertia.get(route("product-content-displays.index"), { ...data }, {
      preserveState: true,  
      replace: true,       
    });
  };

  const submit = (e) => {
    e.preventDefault();
    Inertia.get(route("product-content-displays.index"), data);
  };

  const goToPage = (page) => {
    post(route("product-content-displays.index"), { ...data, page }, {
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
      product_id: "",
      title: "",
      created_by: "",
      updated_by: "",
      is_activated: "",
      created_at: "",
      updated_at: "",
    });
    toggleSheet(); 
  };

  const handleDelete = (productContentDisplayId) => {
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
        Inertia.delete(route("product-content-displays.destroy", productContentDisplayId), {
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
    const today = new Date().toISOString().split("T")[0]; // Get today's date in 'YYYY-MM-DD' format
    const createdDate = new Date(createdAt).toISOString().split("T")[0]; // Format the createdAt date

    if (isActive && createdDate === today) {
      return "text-green-500"; // Green color
    }
    return "";
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
      <Head title="Product Content Display" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <Card>
            <CardHeader>
                <CardTitle>Product Content Display Page</CardTitle>
            </CardHeader>
        </Card>

        <Card>
            <Container>
              <div className="m-2 flex items-center justify-between gap-4">
                <Button onClick={toggleSheet} className="mb-4">
                  Advanced Search
                </Button>
                <Button onClick={() => window.location.href = route('product-content-displays.create')}>
                  Create Product Content Display
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Name</TableHead>
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
                  {product_contents.data.map((productContentDisplay, index) => (
                    <TableRow key={productContentDisplay.id}>
                      <TableCell>{++index + (product_contents.current_page-1) * product_contents.per_page}</TableCell>
                      <TableCell>{productContentDisplay.name}</TableCell>
                      <TableCell>{productContentDisplay.title}</TableCell>
                      <TableCell>{productContentDisplay.created_by}</TableCell>
                      <TableCell>{productContentDisplay.updated_by}</TableCell>
                      <TableCell>{formatDateTime(productContentDisplay.created_at)}</TableCell>
                      <TableCell>{formatDateTime(productContentDisplay.updated_at)}</TableCell>
                      <TableCell className={getStatusClass(productContentDisplay.is_activated, productContentDisplay.created_at)}>
                        {productContentDisplay.is_activated ? "Active" : "Inactive"}
                      </TableCell>
                      <TableCell className="relative">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline"><ChevronRightIcon /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuGroup>
                              <DropdownMenuItem>
                                  <Link href={route('product-content-displays.edit', productContentDisplay.id)} passHref>
                                    <Button variant="outline">Edit</Button>
                                  </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                  <Button
                                    variant="outline"
                                    onClick={() => handleDelete(productContentDisplay.id)} 
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
              {product_contents.last_page !== 1 && <Pagination links={product_contents.links} />}
            </div>

            <div className="flex justify-center mt-4">
              {product_contents.links.prev && (
                <Button onClick={() => goToPage(product_contents.links.prev.page)} className="px-4 py-2 border rounded-md">
                  Previous
                </Button>
              )}
              {product_contents.links.next && (
                <Button onClick={() => goToPage(product_contents.links.next.page)} className="px-4 py-2 border rounded-md ml-2">
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
                Filter product content displays by various criteria.
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={submit}>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                {/* Filters for the Product Content Display Fields */}
                <div className="grid gap-3">
                  <Label htmlFor="product-name">Product Content Display Name</Label>
                  <Input
                    id="product-name"
                    value={data.search}
                    onChange={(e) => setData("search", e.target.value)}
                    placeholder="Search by name"
                  />
                  {errors.search && <div className="text-red-500">{errors.search}</div>}
                </div>

                {/* Filters for product_id, Created By, Updated By */}
                {/* Additional fields here, same as the code above... */}
              </div>

              <SheetFooter>
                <button type="submit" disabled={processing}>Search</button>
                <Button onClick={handleClose} variant="outline">Close</Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </AppLayout>
  );
};

export default ProductContentIndex;
