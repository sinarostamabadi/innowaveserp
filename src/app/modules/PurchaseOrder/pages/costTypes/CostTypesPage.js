import React from "react";
import { Route } from "react-router-dom";
import { CostTypesLoadingDialog } from "./costTypes-loading-dialog/CostTypesLoadingDialog";
import { CostTypeDeleteDialog } from "./costType-delete-dialog/CostTypeDeleteDialog";
import { CostTypesCard } from "./CostTypesCard";
import { CostTypesUIProvider } from "./CostTypesUIContext";

export function CostTypesPage({ history }) {
  const costTypesUIEvents = {
    newCostTypeButtonClick: () => {
      history.push("/purchaseOrder/costTypes/new");
    },
    openEditCostTypePage: (id) => {
      history.push(`/purchaseOrder/costTypes/${id}/edit`);
    },
    openDeleteCostTypeDialog: (id) => {
      history.push(`/purchaseOrder/costTypes/${id}/delete`);
    },
    openDeleteCostTypesDialog: () => {
      history.push(`/purchaseOrder/costTypes/deleteCostTypes`);
    },
    openFetchCostTypesDialog: () => {
      history.push(`/purchaseOrder/costTypes/fetch`);
    },
    openUpdateCostTypesStatusDialog: () => {
      history.push("/purchaseOrder/costTypes/updateStatus");
    },
  };

  return (
    <CostTypesUIProvider costTypesUIEvents={costTypesUIEvents}>
      <CostTypesLoadingDialog />
      <Route path="/purchaseOrder/costTypes/:id/delete">
        {({ history, match }) => (
          <CostTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/purchaseOrder/costTypes");
            }}
          />
        )}
      </Route>
      <CostTypesCard />
    </CostTypesUIProvider>
  );
}
