import React from "react";
import { Route } from "react-router-dom";
import { PackageTypesLoadingDialog } from "./packageTypes-loading-dialog/PackageTypesLoadingDialog";
import { PackageTypeDeleteDialog } from "./packageType-delete-dialog/PackageTypeDeleteDialog";
import { PackageTypesCard } from "./PackageTypesCard";
import { PackageTypesUIProvider } from "./PackageTypesUIContext";

export function PackageTypesPage({ history }) {
  const packageTypesUIEvents = {
    newPackageTypeButtonClick: () => {
      history.push("/warehouse/packageTypes/new");
    },
    openEditPackageTypePage: (id) => {
      history.push(`/warehouse/packageTypes/${id}/edit`);
    },
    openDeletePackageTypeDialog: (id) => {
      history.push(`/warehouse/packageTypes/${id}/delete`);
    },
    openDeletePackageTypesDialog: () => {
      history.push(`/warehouse/packageTypes/deletePackageTypes`);
    },
    openFetchPackageTypesDialog: () => {
      history.push(`/warehouse/packageTypes/fetch`);
    },
    openUpdatePackageTypesStatusDialog: () => {
      history.push("/warehouse/packageTypes/updateStatus");
    },
  };
  
  return (
    <PackageTypesUIProvider packageTypesUIEvents={packageTypesUIEvents}>
      <PackageTypesLoadingDialog />
      <Route path="/warehouse/packageTypes/:id/delete">
        {({ history, match }) => (
          <PackageTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/warehouse/packageTypes");
            }}
          />
        )}
      </Route>
      <PackageTypesCard />
    </PackageTypesUIProvider>
  );
}