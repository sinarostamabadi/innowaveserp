import React from "react";
import { Route } from "react-router-dom";
import { CostsLoadingDialog } from "./costs-loading-dialog/CostsLoadingDialog";
import { CostDeleteDialog } from "./cost-delete-dialog/CostDeleteDialog";
import { CostsCard } from "./CostsCard";
import { CostsUIProvider } from "./CostsUIContext";

export function CostsPage({ history }) {
  const costsUIEvents = {
    newCostButtonClick: () => {
      history.push("/general/costs/new");
    },
    openEditCostPage: (id) => {
      history.push(`/general/costs/${id}/edit`);
    },
    openDeleteCostDialog: (id) => {
      history.push(`/general/costs/${id}/delete`);
    },
    openDeleteCostsDialog: () => {
      history.push(`/general/costs/deleteCosts`);
    },
    openFetchCostsDialog: () => {
      history.push(`/general/costs/fetch`);
    },
    openUpdateCostsStatusDialog: () => {
      history.push("/general/costs/updateStatus");
    },
  };

  return (
    <CostsUIProvider costsUIEvents={costsUIEvents}>
      <CostsLoadingDialog />
      <Route path="/general/costs/:id/delete">
        {({ history, match }) => (
          <CostDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/costs");
            }}
          />
        )}
      </Route>
      <CostsCard />
    </CostsUIProvider>
  );
}
