import React, { useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import AppLayout from "@/layouts/app-layout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Head } from "@inertiajs/react";
import ProductCrudForm from "@/pages/products/components/product-crud-form";
import Swal from "sweetalert2"; 
import useProductStore from "@/pages/products/stores/useProductStore";

// Update to receive productCategories from props
const CreateProduct = ({ productCategories }) => {
  const { setProductCategories } = useProductStore();

  useEffect(() => {
    setProductCategories(productCategories); // Set product categories in store
  }, [productCategories, setProductCategories]);

  const handleSubmit = async (data) => {
    try {
      await Inertia.post(route("products.store"), data);

      Swal.fire({
        title: "Success!",
        text: "Product created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong, please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <AppLayout>
      <Head title="Create Product" />
      <div className="flex flex-col gap-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Create a New Product</CardTitle>
          </CardHeader>
        </Card>

        <Card className="p-6 bg-white shadow-md rounded-lg">
          {/* Passing productCategories to ProductCrudForm */}
          <ProductCrudForm productCategories={productCategories} onSubmit={handleSubmit} />
        </Card>
      </div>
    </AppLayout>
  );
};

export default CreateProduct;
