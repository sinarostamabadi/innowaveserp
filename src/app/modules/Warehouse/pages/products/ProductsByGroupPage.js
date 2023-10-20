import React from "react";
import { Switch, Route } from "react-router-dom";
import { ProductsLoadingDialog } from "./products-loading-dialog/ProductsLoadingDialog";
import { ProductDeleteDialog } from "./product-delete-dialog/ProductDeleteDialog";
import { ProductsCard } from "./ProductsCard";
import { ProductsUIProvider } from "./ProductsUIContext";

import { ProductPrintLabels } from "./product-labels/ProductPrintLabels";

export function ProductsByGroupPage({
  history,
  match: {
    params: { id },
  },
}) {
  const productsUIEvents = {
    newProductButtonClick: () => {
      history.push(
        !!id ? `/warehouse/products/new/${id}` : `/warehouse/products/new`
      );
    },
    openEditProductPage: (id) => {
      history.push(`/warehouse/products/${id}/edit`);
    },
    openDeleteProductDialog: (id) => {
      history.push(`/warehouse/products/${id}/delete`);
    },
    openDeleteProductsDialog: () => {
      history.push(`/warehouse/products/deleteProducts`);
    },
    openFetchProductsDialog: () => {
      history.push(`/warehouse/products/fetch`);
    },
    openUpdateProductsStatusDialog: () => {
      history.push("/warehouse/products/updateStatus");
    },
    openPrintLabelDialog: () => {
      history.push(`/warehouse/products/${id}/printLabel`);
    },
  };

  return (
    <ProductsUIProvider productsUIEvents={productsUIEvents} groupId={id}>
      <ProductsLoadingDialog />
        <Route path="/warehouse/products/group/:id/delete">
          {({ history, match }) => (
            <ProductDeleteDialog
              show={match != null}
              id={match && match.params.id}
              onHide={() => {
                history.push(`/warehouse/products/group/${id}`);
              }}
            />
          )}
        </Route>
        <Route path="/warehouse/products/group/:id/printLabel">
          {({ history, match }) => (
            <ProductPrintLabels
              show={match != null}
              id={match && match.params.id}
              onHide={() => {
                history.push(`/warehouse/products/group/${id}`);
              }}
            />
          )}
        </Route>

      <ProductsCard />
    </ProductsUIProvider>
  );
}
