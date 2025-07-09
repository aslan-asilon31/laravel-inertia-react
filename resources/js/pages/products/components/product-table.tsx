import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import  useProductStore  from "@/pages/products/stores/useProductStore";

const ProductTable = () => {
  const { records } = useProductStore(); // Access records from the store

  // Check if records is an array before mapping
  if (!Array.isArray(records)) {
    return <div>No products available</div>;
  }

  return (
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
        {records.map((product, index) => (
          <TableRow key={product.id}>
            <TableCell>{++index}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>Rp {product.selling_price}</TableCell>
            <TableCell>{product.availability}</TableCell>
            <TableCell>{product.image_url}</TableCell>
            <TableCell>{product.created_by}</TableCell>
            <TableCell>{product.updated_by}</TableCell>
            <TableCell>{new Date(product.created_at).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(product.updated_at).toLocaleDateString()}</TableCell>
            <TableCell>{product.is_activated ? "Active" : "Inactive"}</TableCell>
            <TableCell>
              {/* Add action buttons */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
