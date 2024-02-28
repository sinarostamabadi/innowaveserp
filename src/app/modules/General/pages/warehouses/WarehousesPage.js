import React from "react";
import { Route } from "react-router-dom";
import { WarehousesLoadingDialog } from "./warehouses-loading-dialog/WarehousesLoadingDialog";
import { WarehouseDeleteDialog } from "./warehouse-delete-dialog/WarehouseDeleteDialog";
import { WarehousesCard } from "./WarehousesCard";
import { WarehousesUIProvider } from "./WarehousesUIContext";

export function WarehousesPage({ history }) {
  const warehousesUIEvents = {
    newWarehouseButtonClick: () => {
      history.push("/general/warehouses/new");
    },
    openEditWarehousePage: (id) => {
      history.push(`/general/warehouses/${id}/edit`);
    },
    openDeleteWarehouseDialog: (id) => {
      history.push(`/general/warehouses/${id}/delete`);
    },
    openDeleteWarehousesDialog: () => {
      history.push(`/general/warehouses/deleteWarehouses`);
    },
    openFetchWarehousesDialog: () => {
      history.push(`/general/warehouses/fetch`);
    },
    openUpdateWarehousesStatusDialog: () => {
      history.push("/general/warehouses/updateStatus");
    },
  };

  return (
    <WarehousesUIProvider warehousesUIEvents={warehousesUIEvents}>
      <WarehousesLoadingDialog />
      <Route path="/general/warehouses/:id/delete">
        {({ history, match }) => (
          <WarehouseDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/warehouses");
            }}
          />
        )}
      </Route>
      <WarehousesCard />
    </WarehousesUIProvider>
  );
}
