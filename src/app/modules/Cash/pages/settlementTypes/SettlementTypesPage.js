import React from "react";
import { Route } from "react-router-dom";
import { SettlementTypesLoadingDialog } from "./settlementTypes-loading-dialog/SettlementTypesLoadingDialog";
import { SettlementTypeDeleteDialog } from "./settlementType-delete-dialog/SettlementTypeDeleteDialog";
import { SettlementTypesCard } from "./SettlementTypesCard";
import { SettlementTypesUIProvider } from "./SettlementTypesUIContext";

export function SettlementTypesPage({ history }) {
  const settlementTypesUIEvents = {
    newSettlementTypeButtonClick: () => {
      history.push("/cash/settlementTypes/new");
    },
    openEditSettlementTypePage: (id) => {
      history.push(`/cash/settlementTypes/${id}/edit`);
    },
    openDeleteSettlementTypeDialog: (id) => {
      history.push(`/cash/settlementTypes/${id}/delete`);
    },
    openDeleteSettlementTypesDialog: () => {
      history.push(`/cash/settlementTypes/deleteSettlementTypes`);
    },
    openFetchSettlementTypesDialog: () => {
      history.push(`/cash/settlementTypes/fetch`);
    },
    openUpdateSettlementTypesStatusDialog: () => {
      history.push("/cash/settlementTypes/updateStatus");
    },
  };

  return (
    <SettlementTypesUIProvider
      settlementTypesUIEvents={settlementTypesUIEvents}
    >
      <SettlementTypesLoadingDialog />
      <Route path="/cash/settlementTypes/:id/delete">
        {({ history, match }) => (
          <SettlementTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/settlementTypes");
            }}
          />
        )}
      </Route>
      <SettlementTypesCard />
    </SettlementTypesUIProvider>
  );
}
