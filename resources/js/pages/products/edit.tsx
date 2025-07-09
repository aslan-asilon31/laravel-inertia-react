import React, { useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import AppLayout from "@/layouts/app-layout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Head } from "@inertiajs/react";
import ProductCrudForm from "@/pages/products/components/product-crud-form";
import useProductStore from "@/pages/products/stores/useProductStore"; // Zustand store

const EditProduct = ({ product, productCategories }) => {
  const { setProductCategories } = useProductStore(); 

  useEffect(() => {
    setProductCategories(productCategories); // Set product categories in store
  }, [productCategories, setProductCategories]);

  const handleSubmit = (data) => {
    Inertia.put(route("products.update", product.id), data);
  };

  return (
    <AppLayout breadcrumbs={[{ title: "Edit Product", href: "/products/edit" }]}>
      <Head title="Edit Product" />
      <div className="flex flex-col gap-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Edit Product</CardTitle>
          </CardHeader>
        </Card>

        <Card className="p-6 bg-white shadow-md rounded-lg">
          {/* Passing product and productCategories to ProductCrudForm */}
          <ProductCrudForm product={product} productCategories={productCategories} onSubmit={handleSubmit} />
        </Card>
      </div>
    </AppLayout>
  );
};

export default EditProduct;
