import React from "react";
import { Route } from "react-router-dom";
import { InsurancesLoadingDialog } from "./insurances-loading-dialog/InsurancesLoadingDialog";
import { InsuranceDeleteDialog } from "./insurance-delete-dialog/InsuranceDeleteDialog";
import { InsurancesCard } from "./InsurancesCard";
import { InsurancesUIProvider } from "./InsurancesUIContext";

export function InsurancesPage({ history }) {
  const insurancesUIEvents = {
    newInsuranceButtonClick: () => {
      history.push("/employment/insurances/new");
    },
    openEditInsurancePage: (id) => {
      history.push(`/employment/insurances/${id}/edit`);
    },
    openDeleteInsuranceDialog: (id) => {
      history.push(`/employment/insurances/${id}/delete`);
    },
    openDeleteInsurancesDialog: () => {
      history.push(`/employment/insurances/deleteInsurances`);
    },
    openFetchInsurancesDialog: () => {
      history.push(`/employment/insurances/fetch`);
    },
    openUpdateInsurancesStatusDialog: () => {
      history.push("/employment/insurances/updateStatus");
    },
  };
  
  return (
    <InsurancesUIProvider insurancesUIEvents={insurancesUIEvents}>
      <InsurancesLoadingDialog />
      <Route path="/employment/insurances/:id/delete">
        {({ history, match }) => (
          <InsuranceDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/insurances");
            }}
          />
        )}
      </Route>
      <InsurancesCard />
    </InsurancesUIProvider>
  );
}