import React from "react";
import { Route } from "react-router-dom";
import { BrandsLoadingDialog } from "./brands-loading-dialog/BrandsLoadingDialog";
import { BrandDeleteDialog } from "./brand-delete-dialog/BrandDeleteDialog";
import { BrandsCard } from "./BrandsCard";
import { BrandsUIProvider } from "./BrandsUIContext";

export function BrandsPage({ history }) {
  const brandsUIEvents = {
    newBrandButtonClick: () => {
      history.push("/warehouse/brands/new");
    },
    openEditBrandPage: (id) => {
      history.push(`/warehouse/brands/${id}/edit`);
    },
    openDeleteBrandDialog: (id) => {
      history.push(`/warehouse/brands/${id}/delete`);
    },
    openDeleteBrandsDialog: () => {
      history.push(`/warehouse/brands/deleteBrands`);
    },
    openFetchBrandsDialog: () => {
      history.push(`/warehouse/brands/fetch`);
    },
    openUpdateBrandsStatusDialog: () => {
      history.push("/warehouse/brands/updateStatus");
    },
  };
  
  return (
    <BrandsUIProvider brandsUIEvents={brandsUIEvents}>
      <BrandsLoadingDialog />
      <Route path="/warehouse/brands/:id/delete">
        {({ history, match }) => (
          <BrandDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/warehouse/brands");
            }}
          />
        )}
      </Route>
      <BrandsCard />
    </BrandsUIProvider>
  );
}