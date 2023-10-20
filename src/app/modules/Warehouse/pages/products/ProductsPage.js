import React from "react";
import { Route } from "react-router-dom";
import { ProductsLoadingDialog } from "./products-loading-dialog/ProductsLoadingDialog";
import { ProductDeleteDialog } from "./product-delete-dialog/ProductDeleteDialog";
import { ProductsCard } from "./ProductsCard";
import { ProductsUIProvider } from "./ProductsUIContext";

import { ProductPrintLabels } from "./product-labels/ProductPrintLabels";
import { ProductPrintGroupLabels } from "./product-group-labels/ProductPrintGroupLabels";

export function ProductsPage({
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
    openPrintLabelDialog: (id) => {
      history.push(`/warehouse/products/${id}/printLabel`);
    },
    openPrintGroupLabelDialog: (id) => {
      history.push(`/warehouse/products/printGroupLabel`);
    },
  };

  return (
    <ProductsUIProvider productsUIEvents={productsUIEvents}>
      <ProductsLoadingDialog />
      <Route path="/warehouse/products/:id/delete">
        {({ history, match }) => (
          <ProductDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/warehouse/products");
            }}
          />
        )}
      </Route>
      <Route path="/warehouse/products/:id/printLabel">
        {({ history, match }) => (
          <ProductPrintLabels
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/warehouse/products");
            }}
          />
        )}
      </Route>
      <Route path="/warehouse/products/printGroupLabel">
        {({ history, match }) => (
          <ProductPrintGroupLabels
            show={match != null}
            onHide={() => {
              history.push("/warehouse/products");
            }}
          />
        )}
      </Route>
      <ProductsCard />
    </ProductsUIProvider>
  );
}
