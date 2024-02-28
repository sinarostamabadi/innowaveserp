import React from "react";
import { Route } from "react-router-dom";
import { ContractEndTypesLoadingDialog } from "./contractEndTypes-loading-dialog/ContractEndTypesLoadingDialog";
import { ContractEndTypeDeleteDialog } from "./contractEndType-delete-dialog/ContractEndTypeDeleteDialog";
import { ContractEndTypesCard } from "./ContractEndTypesCard";
import { ContractEndTypesUIProvider } from "./ContractEndTypesUIContext";

export function ContractEndTypesPage({ history }) {
  const contractEndTypesUIEvents = {
    newContractEndTypeButtonClick: () => {
      history.push("/employment/contractEndTypes/new");
    },
    openEditContractEndTypePage: (id) => {
      history.push(`/employment/contractEndTypes/${id}/edit`);
    },
    openDeleteContractEndTypeDialog: (id) => {
      history.push(`/employment/contractEndTypes/${id}/delete`);
    },
    openDeleteContractEndTypesDialog: () => {
      history.push(`/employment/contractEndTypes/deleteContractEndTypes`);
    },
    openFetchContractEndTypesDialog: () => {
      history.push(`/employment/contractEndTypes/fetch`);
    },
    openUpdateContractEndTypesStatusDialog: () => {
      history.push("/employment/contractEndTypes/updateStatus");
    },
  };

  return (
    <ContractEndTypesUIProvider
      contractEndTypesUIEvents={contractEndTypesUIEvents}
    >
      <ContractEndTypesLoadingDialog />
      <Route path="/employment/contractEndTypes/:id/delete">
        {({ history, match }) => (
          <ContractEndTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/contractEndTypes");
            }}
          />
        )}
      </Route>
      <ContractEndTypesCard />
    </ContractEndTypesUIProvider>
  );
}
