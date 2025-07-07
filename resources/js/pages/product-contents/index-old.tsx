"use client";

import React, { useState, useRef } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Button } from "@/components/ui/button";
import DropdownMenu from "@/components/ui/dropdown-menu";
import Search from "@/components/search";
import AppLayout from "@/layouts/app-layout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Head } from "@inertiajs/react";
import Container from "@/components/container";
import Pagination from '@/components/pagination';
import { Input } from "@/components/ui/input";

const ProductIndex = ({ products, filters }) => {
  const [search, setSearch] = useState(filters.search || "");
  const [availability, setAvailability] = useState(filters.availability || "");
const [openDropdown, setOpenDropdown] = useState(null);
  const timeoutRef = useRef(null);

  const updateFilter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); 
    }

    timeoutRef.current = setTimeout(() => {
      Inertia.get(route("products.index"), { search, availability }, {
        preserveState: true,  
        replace: true,       
      });
    }, 500);
  };

  const goToPage = (page) => {
    Inertia.get(route("products.index"), { search, availability, page }, {
      preserveState: true,
      replace: true,
    });
  };

    const toggleDropdown = (productId) => {
    if (openDropdown === productId) {
      setOpenDropdown(null); // Close if already open
    } else {
      setOpenDropdown(productId); // Open the dropdown for the clicked product
    }
  };

  return (
    <AppLayout breadcrumbs={[{ title: "Products", href: "/products" }]}>
      <Head title="Products" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        {/* Card for the page title */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Produk</CardTitle>
          </CardHeader>
        </Card>

        {/* Card for filter and search */}
        <Card>
          <Container>
            <div className="mb-4 flex items-center justify-between gap-4">
              <Button type="add" url={route("products.create")} />
              <div className="w-full md:w-4/6">
                <Search
                  url={route("products.index")}
                  placeholder="Cari produk..."
                  filter={filters}
                />
              </div>
            </div>



            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama Produk</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Ketersediaan</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.data.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>Rp {product.selling_price}</TableCell>
                    <TableCell>{product.availability}</TableCell>
                    <TableCell className="relative">
                      {/* Button to trigger dropdown toggle */}
                      <Button
                        onClick={() => toggleDropdown(product.id)}
                        className="text-sm bg-blue-500 text-white"
                      >
                        Aksi
                      </Button>

                      {/* Dropdown menu */}
                      <div
                        className={`absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
                          openDropdown === product.id ? "" : "hidden"
                        }`}
                      >
                        <div className="py-1 text-sm text-gray-700">
                          {/* Edit Button */}
                          <button
                            onClick={() => {
                              Inertia.visit(route("products.edit", product.id)); // Navigate to the edit page
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            Edit
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "This product will be deleted permanently.",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonText: "Yes, delete it!",
                                cancelButtonText: "Cancel",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  Inertia.delete(route("products.destroy", product.id), {
                                    onSuccess: () => {
                                      Swal.fire({
                                        title: "Deleted!",
                                        text: "Product deleted successfully.",
                                        icon: "success",
                                        showConfirmButton: false,
                                        timer: 1500,
                                      });
                                    },
                                    onError: () => {
                                      Swal.fire({
                                        title: "Error!",
                                        text: "Failed to delete the product.",
                                        icon: "error",
                                      });
                                    },
                                  });
                                }
                              });
                            }}
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          <div className="flex items-center justify-center">
              {products.last_page !== 1 && (
                  <Pagination links={products.links} />
              )}
          </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
              {products.links.prev && (
                <Button onClick={() => goToPage(products.links.prev.page)} className="px-4 py-2 border rounded-md">
                  Previous
                </Button>
              )}
              {products.links.next && (
                <Button onClick={() => goToPage(products.links.next.page)} className="px-4 py-2 border rounded-md">
                  Next
                </Button>
              )}
            </div>
          </Container>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ProductIndex;
