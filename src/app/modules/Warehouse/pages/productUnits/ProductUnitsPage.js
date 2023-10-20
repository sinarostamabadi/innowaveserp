import React from "react";
import { Route } from "react-router-dom";
import { ProductUnitsLoadingDialog } from "./productUnits-loading-dialog/ProductUnitsLoadingDialog";
import { ProductUnitDeleteDialog } from "./productUnit-delete-dialog/ProductUnitDeleteDialog";
import { ProductUnitsCard } from "./ProductUnitsCard";
import { ProductUnitsUIProvider } from "./ProductUnitsUIContext";

export function ProductUnitsPage({ history }) {
  const productUnitsUIEvents = {
    newProductUnitButtonClick: () => {
      history.push("/warehouse/productUnits/new");
    },
    openEditProductUnitPage: (id) => {
      history.push(`/warehouse/productUnits/${id}/edit`);
    },
    openDeleteProductUnitDialog: (id) => {
      history.push(`/warehouse/productUnits/${id}/delete`);
    },
    openDeleteProductUnitsDialog: () => {
      history.push(`/warehouse/productUnits/deleteProductUnits`);
    },
    openFetchProductUnitsDialog: () => {
      history.push(`/warehouse/productUnits/fetch`);
    },
    openUpdateProductUnitsStatusDialog: () => {
      history.push("/warehouse/productUnits/updateStatus");
    },
  };
  
  return (
    <ProductUnitsUIProvider productUnitsUIEvents={productUnitsUIEvents}>
      <ProductUnitsLoadingDialog />
      <Route path="/warehouse/productUnits/:id/delete">
        {({ history, match }) => (
          <ProductUnitDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/warehouse/productUnits");
            }}
          />
        )}
      </Route>
      <ProductUnitsCard />
    </ProductUnitsUIProvider>
  );
}