import React from "react";
import { Route } from "react-router-dom";
import { ContractTypesLoadingDialog } from "./contractTypes-loading-dialog/ContractTypesLoadingDialog";
import { ContractTypeDeleteDialog } from "./contractType-delete-dialog/ContractTypeDeleteDialog";
import { ContractTypesCard } from "./ContractTypesCard";
import { ContractTypesUIProvider } from "./ContractTypesUIContext";

export function ContractTypesPage({ history }) {
  const contractTypesUIEvents = {
    newContractTypeButtonClick: () => {
      history.push("/employment/contractTypes/new");
    },
    openEditContractTypePage: (id) => {
      history.push(`/employment/contractTypes/${id}/edit`);
    },
    openDeleteContractTypeDialog: (id) => {
      history.push(`/employment/contractTypes/${id}/delete`);
    },
    openDeleteContractTypesDialog: () => {
      history.push(`/employment/contractTypes/deleteContractTypes`);
    },
    openFetchContractTypesDialog: () => {
      history.push(`/employment/contractTypes/fetch`);
    },
    openUpdateContractTypesStatusDialog: () => {
      history.push("/employment/contractTypes/updateStatus");
    },
  };

  return (
    <ContractTypesUIProvider contractTypesUIEvents={contractTypesUIEvents}>
      <ContractTypesLoadingDialog />
      <Route path="/employment/contractTypes/:id/delete">
        {({ history, match }) => (
          <ContractTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/contractTypes");
            }}
          />
        )}
      </Route>
      <ContractTypesCard />
    </ContractTypesUIProvider>
  );
}
