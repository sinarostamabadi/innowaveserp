import React from "react";
import { Route } from "react-router-dom";
import { InsuranceTypesLoadingDialog } from "./insuranceTypes-loading-dialog/InsuranceTypesLoadingDialog";
import { InsuranceTypeDeleteDialog } from "./insuranceType-delete-dialog/InsuranceTypeDeleteDialog";
import { InsuranceTypesCard } from "./InsuranceTypesCard";
import { InsuranceTypesUIProvider } from "./InsuranceTypesUIContext";

export function InsuranceTypesPage({ history }) {
  const insuranceTypesUIEvents = {
    newInsuranceTypeButtonClick: () => {
      history.push("/employment/insuranceTypes/new");
    },
    openEditInsuranceTypePage: (id) => {
      history.push(`/employment/insuranceTypes/${id}/edit`);
    },
    openDeleteInsuranceTypeDialog: (id) => {
      history.push(`/employment/insuranceTypes/${id}/delete`);
    },
    openDeleteInsuranceTypesDialog: () => {
      history.push(`/employment/insuranceTypes/deleteInsuranceTypes`);
    },
    openFetchInsuranceTypesDialog: () => {
      history.push(`/employment/insuranceTypes/fetch`);
    },
    openUpdateInsuranceTypesStatusDialog: () => {
      history.push("/employment/insuranceTypes/updateStatus");
    },
  };
  
  return (
    <InsuranceTypesUIProvider insuranceTypesUIEvents={insuranceTypesUIEvents}>
      <InsuranceTypesLoadingDialog />
      <Route path="/employment/insuranceTypes/:id/delete">
        {({ history, match }) => (
          <InsuranceTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/insuranceTypes");
            }}
          />
        )}
      </Route>
      <InsuranceTypesCard />
    </InsuranceTypesUIProvider>
  );
}