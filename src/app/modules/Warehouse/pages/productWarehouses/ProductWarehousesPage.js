import React from "react";
import { Route } from "react-router-dom";
import { ProductWarehousesLoadingDialog } from "./productWarehouses-loading-dialog/ProductWarehousesLoadingDialog";
import { ProductWarehouseDeleteDialog } from "./productWarehouse-delete-dialog/ProductWarehouseDeleteDialog";
import { ProductWarehousesCard } from "./ProductWarehousesCard";
import { ProductWarehousesUIProvider } from "./ProductWarehousesUIContext";

export function ProductWarehousesPage({ history }) {
  const productWarehousesUIEvents = {
    newProductWarehouseButtonClick: () => {
      history.push("/warehouse/productWarehouses/new");
    },
    openEditProductWarehousePage: (id) => {
      history.push(`/warehouse/productWarehouses/${id}/edit`);
    },
    openDeleteProductWarehouseDialog: (id) => {
      history.push(`/warehouse/productWarehouses/${id}/delete`);
    },
    openDeleteProductWarehousesDialog: () => {
      history.push(`/warehouse/productWarehouses/deleteProductWarehouses`);
    },
    openFetchProductWarehousesDialog: () => {
      history.push(`/warehouse/productWarehouses/fetch`);
    },
    openUpdateProductWarehousesStatusDialog: () => {
      history.push("/warehouse/productWarehouses/updateStatus");
    },
  };
  
  return (
    <ProductWarehousesUIProvider productWarehousesUIEvents={productWarehousesUIEvents}>
      <ProductWarehousesLoadingDialog />
      <Route path="/warehouse/productWarehouses/:id/delete">
        {({ history, match }) => (
          <ProductWarehouseDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/warehouse/productWarehouses");
            }}
          />
        )}
      </Route>
      <ProductWarehousesCard />
    </ProductWarehousesUIProvider>
  );
}