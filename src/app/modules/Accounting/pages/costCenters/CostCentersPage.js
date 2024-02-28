import React from "react";
import { Route } from "react-router-dom";
import { CostCentersLoadingDialog } from "./costCenters-loading-dialog/CostCentersLoadingDialog";
import { CostCenterDeleteDialog } from "./costCenter-delete-dialog/CostCenterDeleteDialog";
import { CostCentersCard } from "./CostCentersCard";
import { CostCentersUIProvider } from "./CostCentersUIContext";

export function CostCentersPage({ history }) {
  const costCentersUIEvents = {
    newCostCenterButtonClick: () => {
      history.push("/accounting/costCenters/new");
    },
    openEditCostCenterPage: (id) => {
      history.push(`/accounting/costCenters/${id}/edit`);
    },
    openDeleteCostCenterDialog: (id) => {
      history.push(`/accounting/costCenters/${id}/delete`);
    },
    openDeleteCostCentersDialog: () => {
      history.push(`/accounting/costCenters/deleteCostCenters`);
    },
    openFetchCostCentersDialog: () => {
      history.push(`/accounting/costCenters/fetch`);
    },
    openUpdateCostCentersStatusDialog: () => {
      history.push("/accounting/costCenters/updateStatus");
    },
  };

  return (
    <CostCentersUIProvider costCentersUIEvents={costCentersUIEvents}>
      <CostCentersLoadingDialog />
      <Route path="/accounting/costCenters/:id/delete">
        {({ history, match }) => (
          <CostCenterDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/costCenters");
            }}
          />
        )}
      </Route>
      <CostCentersCard />
    </CostCentersUIProvider>
  );
}
