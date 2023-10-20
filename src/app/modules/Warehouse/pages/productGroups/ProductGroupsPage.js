import React from "react";
import { Route } from "react-router-dom";
import { ProductGroupsLoadingDialog } from "./productGroups-loading-dialog/ProductGroupsLoadingDialog";
import { ProductGroupDeleteDialog } from "./productGroup-delete-dialog/ProductGroupDeleteDialog";
import { ProductGroupsCard } from "./ProductGroupsCard";
import { ProductGroupsUIProvider } from "./ProductGroupsUIContext";
import { ProductGroupEditDialog } from "./productGroup-edit-dialog/ProductGroupEditDialog";

export function ProductGroupsPage({ history }) {
  const productGroupsUIEvents = {
    newProductGroupButtonClick: () => {
      history.push("/warehouse/productGroups/new");
    },
    openEditProductGroupPage: (id) => {
      history.push(`/warehouse/productGroups/${id}/edit`);
    },
    openDeleteProductGroupDialog: (id) => {
      history.push(`/warehouse/productGroups/${id}/delete`);
    },
    openDeleteProductGroupsDialog: () => {
      history.push(`/warehouse/productGroups/deleteProductGroups`);
    },
    openFetchProductGroupsDialog: () => {
      history.push(`/warehouse/productGroups/fetch`);
    },
    openUpdateProductGroupsStatusDialog: () => {
      history.push("/warehouse/productGroups/updateStatus");
    },
  };
  
  return (
    <ProductGroupsUIProvider productGroupsUIEvents={productGroupsUIEvents}>
      <ProductGroupsLoadingDialog />
      <Route path="/warehouse/productGroups/:id/delete">
        {({ history, match }) => (
          <ProductGroupDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/warehouse/productGroups");
            }}
          />
        )}
      </Route>
      <ProductGroupEditDialog />
      <ProductGroupsCard history={history}/>
    </ProductGroupsUIProvider>
  );
}