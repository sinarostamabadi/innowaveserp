import React from "react";
import { Route } from "react-router-dom";
import { InsuranceCompaniesLoadingDialog } from "./insuranceCompanies-loading-dialog/InsuranceCompaniesLoadingDialog";
import { InsuranceCompanyDeleteDialog } from "./insuranceCompany-delete-dialog/InsuranceCompanyDeleteDialog";
import { InsuranceCompaniesCard } from "./InsuranceCompaniesCard";
import { InsuranceCompaniesUIProvider } from "./InsuranceCompaniesUIContext";

export function InsuranceCompaniesPage({ history }) {
  const insuranceCompaniesUIEvents = {
    newInsuranceCompanyButtonClick: () => {
      history.push("/employment/insuranceCompanies/new");
    },
    openEditInsuranceCompanyPage: (id) => {
      history.push(`/employment/insuranceCompanies/${id}/edit`);
    },
    openDeleteInsuranceCompanyDialog: (id) => {
      history.push(`/employment/insuranceCompanies/${id}/delete`);
    },
    openDeleteInsuranceCompaniesDialog: () => {
      history.push(`/employment/insuranceCompanies/deleteInsuranceCompanies`);
    },
    openFetchInsuranceCompaniesDialog: () => {
      history.push(`/employment/insuranceCompanies/fetch`);
    },
    openUpdateInsuranceCompaniesStatusDialog: () => {
      history.push("/employment/insuranceCompanies/updateStatus");
    },
  };

  return (
    <InsuranceCompaniesUIProvider
      insuranceCompaniesUIEvents={insuranceCompaniesUIEvents}
    >
      <InsuranceCompaniesLoadingDialog />
      <Route path="/employment/insuranceCompanies/:id/delete">
        {({ history, match }) => (
          <InsuranceCompanyDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/insuranceCompanies");
            }}
          />
        )}
      </Route>
      <InsuranceCompaniesCard />
    </InsuranceCompaniesUIProvider>
  );
}
