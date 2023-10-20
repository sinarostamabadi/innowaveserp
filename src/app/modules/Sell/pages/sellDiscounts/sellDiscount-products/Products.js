import React from "react";
import { ProductsTable } from "./ProductsTable";
import { ProductDeleteDialog } from "./ProductDeleteDialog";
import { ProductEditDialog } from "./product-edit-dialog/ProductEditDialog";

export function Products() {
  return (
    <div className="mt-5">
      <ProductEditDialog />
      <ProductDeleteDialog />
      <ProductsTable />
    </div>
  );
}
