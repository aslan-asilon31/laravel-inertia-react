import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import ProductTable from "@/pages/products/components/product-table";
import useProductStore from "@/pages/products/stores/useProductStore"; // Zustand store
import { type BreadcrumbItem } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Inertia } from "@inertiajs/inertia";
"use client";

import { useForm,Link } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const ProductIndex = () => {
  const { products, productCategories } = usePage().props; // Get products and categories from page props
  const { records, setRecords, setPagination, setProductCategories } = useProductStore();

  // Set the records, pagination, and product categories when the component is mounted
  useEffect(() => {
    if (products) {
      setRecords(products.data);
      setPagination(products);
    }
    if (productCategories) {
      setProductCategories(productCategories);
    }
  }, [products, productCategories, setRecords, setPagination, setProductCategories]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const toggleSheet = () => setIsSheetOpen((prevState) => !prevState);

  const submit = (e) => {
    e.preventDefault();
    // Here you would submit the form with your filters
    Inertia.get(route("products.index"), { ...records });
  };

  return (
    <AppLayout>
      <Head title="Products" />
      <div className="flex flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <Card>
          <CardHeader>
            <CardTitle>Product Page</CardTitle>
          </CardHeader>
        </Card>

        <div className="mb-4 flex items-center justify-between gap-4">
          <Button variant="outline" onClick={() => window.location.href = route("products.create")}>
            Create Product
          </Button>
          <Button onClick={toggleSheet} className="mb-4">
            Advanced Search
          </Button>
        </div>

        <Card>
          <CardContent>
            {/* Ensure the records data is available before passing to the table */}
            {records && records.length > 0 ? <ProductTable /> : <div>No products available</div>}
          </CardContent>
        </Card>

        <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
          <SheetContent className="overflow-y-auto max-h-[190vh]">
            <SheetHeader>
              <SheetTitle>Advanced Search</SheetTitle>
              <SheetDescription>Filter products by various criteria.</SheetDescription>
            </SheetHeader>
            <form onSubmit={submit}>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <div className="grid gap-3">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input
                    id="product-name"
                    value={records.search || ""}
                    onChange={(e) => setRecords({ ...records, search: e.target.value })}
                    placeholder="Search by name"
                  />
                </div>

                {/* Add more filters here (e.g., availability, price, etc.) */}

                <SheetFooter>
                  <Button type="submit" disabled={false}>Search</Button>
                  <Button onClick={toggleSheet} variant="outline">Close</Button>
                </SheetFooter>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </AppLayout>
  );
};

export default ProductIndex;
